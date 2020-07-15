using AutoMapper;
using MIA.Administration.Api.Base;
using MIA.Administration.Dto.ArtWorkPayment;
using MIA.Administration.Dto.Country;
using MIA.Administration.Dto.User;
using MIA.Constants;
using MIA.Exceptions;
using MIA.Infrastructure;
using MIA.Infrastructure.Options;
using MIA.Models.Entities;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Transfer;
using AutoMapper.QueryableExtensions;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using MIA.ORMContext;
using MIA.TemplateParser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Z.EntityFramework.Plus;

namespace MIA.Administration.Api {

  [EnableCors(CorsPolicyName.DevOnly)]
  [Route("api/artWorks")]
  [Authorize]
  public class ArtWorksController : BaseCrudController<Artwork, ArtWorkDto, NewArtWorkDto, UpdateArtWorkDto> {
    private readonly IHostingEnvironment env;
    private readonly IOptions<UploadLimits> limitOptions;
    private readonly IS3FileManager fileManager;

    public ArtWorksController(
          IMapper mapper,
          ILogger<ArtWorksController> logger,
          IStringLocalizer<ArtWorksController> localize,
          IHostingEnvironment env,
          IOptions<UploadLimits> limitOptions,
          IS3FileManager fileManager

        ) : base(mapper, logger, localize) {
      this.env = env;
      this.limitOptions = limitOptions;
      this.fileManager = fileManager;
    }

    [HasPermission(Permissions.ArtworkEdit)]
    public override async Task<IActionResult> SaveNewAsync([FromBody] NewArtWorkDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.SaveNewAsync(dto, db);
      var resultDto = ((ArtWorkDto)(result as OkObjectResult)?.Value);
      var ArtWorksItem = await db.Artworks.FindAsync(resultDto.Id);
      if (!dto.IsArtwork) {
        await db.CommitTransactionAsync();
        return IfFound(_mapper.Map<ArtWorkDto>(ArtWorksItem));
      }

      string posterKey, posterUrl, coverKey, coverUrl, trailerPosterKey, trailerPosterUrl;
      if (dto.PosterByte != null && dto.PosterByte.Length > 0 ||
        dto.CoverByte != null && dto.CoverByte.Length > 0 ||
        dto.TrailerPosterByte != null && dto.TrailerPosterByte.Length > 0) {
        using (var memorySteam = new MemoryStream(dto.PosterByte)) {
          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            throw new ApiException(ApiErrorType.BadRequest, validationError.MapTo<ErrorResult>());
          }

          //    ArtWorksItem.Payment = new ArtWorkPayment();
          posterKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, ArtWorksItem.Id, dto.PosterFileName);
          posterUrl = await fileManager.UploadFileAsync(memorySteam, posterKey);
        }
        using (var memorySteam = new MemoryStream(dto.CoverByte)) {
          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            throw new ApiException(ApiErrorType.BadRequest, validationError.MapTo<ErrorResult>());
          }

          coverKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, ArtWorksItem.Id, dto.CoverFileName);
          coverUrl = await fileManager.UploadFileAsync(memorySteam, coverKey);
        }

        ArtWorksItem.Poster = S3File.FromKeyAndUrl(posterKey, posterUrl);
        ArtWorksItem.Cover = S3File.FromKeyAndUrl(coverKey, coverUrl);
        ArtWorksItem.UploadComplete = true;
        await db.CommitTransactionAsync();

      }

      return IfFound(_mapper.Map<ArtWorkDto>(ArtWorksItem));
    }

    [HasPermission(Permissions.ArtworkEdit)]
    public override async Task<IActionResult> UpdateAsync([FromBody] UpdateArtWorkDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.UpdateAsync(dto, db);
      var resultDto = ((ArtWorkDto)(result as OkObjectResult)?.Value);
      var ArtWorksItem = await db.Artworks.FindAsync(resultDto.Id);

      if (!dto.IsArtwork) {
        await db.CommitTransactionAsync();
        return IfFound(_mapper.Map<ArtWorkDto>(ArtWorksItem));
      }

      if (dto.PosterByte != null && dto.PosterByte.Length > 0 && dto.Video != null && dto.Video.Length > 0) {

        using (var memorySteam = new MemoryStream(dto.PosterByte)) {
          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            throw new ApiException(ApiErrorType.BadRequest, validationError.MapTo<ErrorResult>());
          }
          //if (dto.Receipt != null && dto.Receipt.Length > 0)
          //{

          //  using (var memorySteamReciept = new MemoryStream(dto.PosterByte))
          //  {

          //    string fileReceiptKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, ArtWorksItem.Id, dto.ReceiptFileName);
          //    var ReceiptUrl = await fileManager.UploadFileAsync(memorySteamReciept, fileReceiptKey);

          //    // ArtWorksItem.Payment.Receipt = S3File.FromKeyAndUrl(fileReceiptKey, ReceiptUrl);
          //  }
          //} else {
          //  // ArtWorksItem.Payment.Receipt = S3File.FromKeyAndUrl("", "");
          //}

          string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, ArtWorksItem.Id, dto.PosterFileName);
          var posterUrl = await fileManager.UploadFileAsync(memorySteam, fileKey);

          ArtWorksItem.Poster = S3File.FromKeyAndUrl(fileKey, posterUrl);

          string fileVideoKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, ArtWorksItem.Id, dto.PosterFileName);
          var videoUrl = await fileManager.UploadFileAsync(memorySteam, fileVideoKey);

          ArtWorksItem.Trailer = S3File.FromKeyAndUrl(fileVideoKey, videoUrl);
        }
        await db.CommitTransactionAsync();

      }

      return IfFound(_mapper.Map<ArtWorkDto>(ArtWorksItem));
    }

    [HasPermission(Permissions.ReadArtwork, Permissions.ArtworkListBasicData)]
    public override async Task<IActionResult> GetAsync(string id, [FromServices] IAppUnitOfWork db) {
      var result = await base.GetAsync(id, db);
      var resultDto = ((ArtWorkDto)(result as OkObjectResult)?.Value);
      var artWorkItem = await db.Artworks.Include(i => i.Award).Include(i => i.Nominee).FirstOrDefaultAsync(a => a.Id == resultDto.Id);
      return IfFound(_mapper.Map<ArtWorkDto>(artWorkItem));
    }


    [HttpGet("getMediaFile")]
    [HasPermission(Permissions.ReadArtwork)]
    public async Task<IActionResult> GetMediaFileAsync([FromQuery(Name = "id")] string id, [FromServices] IAppUnitOfWork db) {
      var artWorkItem = await db.MediaFiles.FirstOrDefaultAsync(a => a.Id == id);
      return IfFound(_mapper.Map<MediaFile>(artWorkItem));
    }

    [HttpDelete("deleteMediaItem")]
    [HasPermission(Permissions.ArtworkEdit)]
    public async Task<IActionResult> DeleteMediaFileAsync([FromQuery(Name = "id")] string id, [FromServices] IAppUnitOfWork db) {
      var entity = db.Set<MediaFile>().FirstOrDefault(a => a.Id == id);
      if (entity == null)
        throw new ApiException(ApiErrorType.NotFound, "record not found");

      db.Set<MediaFile>().Remove(entity);
      return Ok();
    }

    [HttpPost("createMediaFile")]
    [HasPermission(Permissions.ArtworkEdit)]
    public async Task<IActionResult> CreateMediaFile([FromBody] MediaFileDto dto, [FromServices] IAppUnitOfWork db) {
      dto.File = S3File.FromKeyAndUrl(dto.FileKey, dto.FileUrl);
      var result = await db.Set<MediaFile>().AddAsync(_mapper.Map<MediaFile>(dto));
      var mediaItem = await db.MediaFiles.FindAsync(result.Entity.Id);
      return IfFound(_mapper.Map<MediaFile>(mediaItem));
    }

    [HttpPut("UpdateTrailerUrl")]
    [HasPermission(Permissions.ArtworkEdit)]
    public async Task<IActionResult> UpdateTrailerUrlAsync([FromBody] UpdateArtWorkDto dto, [FromServices] IAppUnitOfWork db) {
      var trailerItem = await db.Artworks.FirstOrDefaultAsync(a => a.Id == dto.Id);
      trailerItem.Trailer = S3File.FromKeyAndUrl(dto.FileKey, dto.FileUrl);

      var entry = db.Set<Artwork>().Attach(trailerItem);
      entry.State = EntityState.Modified;
      await db.CommitTransactionAsync();
      return IfFound(_mapper.Map<ArtWorkDto>(trailerItem));
    }

    [HttpPost("createPayment")]
    [HasPermission(Permissions.ArtworkEdit)]
    public async Task<IActionResult> SavePaymentAsync([FromBody] NewArtWorkPaymentDto dto, [FromServices] IAppUnitOfWork db) {
      //var newartwork = new ArtWorkPayment();
      //newartwork.ArtworkId = dto.ArtworkId;
      //newartwork.Amount = dto.Amount;
      //newartwork.PaymentDate = dto.PaymentDate;
      //newartwork.TransactionNumber = dto.TransactionNumber; ;

      //var result = await db.Set<ArtWorkPayment>().AddAsync(newartwork);

      //await db.CommitTransactionAsync();

      var result = await db.ArtworkPayments.AddAsync(_mapper.Map<ArtworkPayment>(dto));
      await db.CommitTransactionAsync();
      var paymentItem = await db.ArtworkPayments.FindAsync(result.Entity.Id);

      if (dto.ReceiptByte != null && dto.ReceiptByte.Length > 0) {
        using (var memorySteam = new MemoryStream(dto.ReceiptByte)) {
          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            throw new ApiException(ApiErrorType.BadRequest, validationError.MapTo<ErrorResult>());
          }

          string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWorkPayment, paymentItem.Id, dto.ReceiptFileName);
          var receiptUrl = await fileManager.UploadFileAsync(memorySteam, fileKey);

          paymentItem.Receipt = S3File.FromKeyAndUrl(fileKey, receiptUrl);
          var entry = db.Set<ArtworkPayment>().Attach(paymentItem);
          entry.State = EntityState.Modified;
          await db.CommitTransactionAsync();
        }
      } else {
        paymentItem.Receipt = S3File.FromKeyAndUrl("", "");
      }

      return IfFound(_mapper.Map<ArtWorkPaymentDto>(paymentItem));
    }

    [HttpPut("updatePayment")]
    [HasPermission(Permissions.ArtworkEdit)]
    public async Task<IActionResult> UpdatePaymentAsync([FromBody] UpdateArtWorkPaymentDto dto, [FromServices] IAppUnitOfWork db) {

      var paymentItem = await db.ArtworkPayments.FirstOrDefaultAsync(a => a.Id == dto.Id);
      if (paymentItem == null)
        throw new ApiException(ApiErrorType.NotFound, "record not found");
      paymentItem = (ArtworkPayment)_mapper.Map(dto, paymentItem, typeof(UpdateArtWorkPaymentDto), typeof(ArtworkPayment));

      if (dto.Receipt != null && dto.Receipt.Length > 0) {
        using (var memorySteam = new MemoryStream(dto.Receipt)) {
          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            throw new ApiException(ApiErrorType.BadRequest, validationError.MapTo<ErrorResult>());
          }

          string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWorkPayment, paymentItem.Id, dto.ReceiptFileName);
          var posterUrl = await fileManager.UploadFileAsync(memorySteam, fileKey);

          paymentItem.Receipt = S3File.FromKeyAndUrl(fileKey, posterUrl);
          var entry = db.Set<ArtworkPayment>().Attach(paymentItem);
          entry.State = EntityState.Modified;
          await db.CommitTransactionAsync();
        }
      } else {
        paymentItem.Receipt = S3File.FromKeyAndUrl("", "");
      }



      return IfFound(_mapper.Map<ArtWorkPaymentDto>(paymentItem));
    }

    [HttpGet("getPayment")]
    [HasPermission(Permissions.ReadArtwork)]
    public async Task<IActionResult> GetPaymentAsync([FromQuery(Name = "id")] string id, [FromServices] IAppUnitOfWork db) {
      var artWorkItem = await db.ArtworkPayments.FirstOrDefaultAsync(a => a.ArtworkId == id);
      if (artWorkItem == null) {
        return IfFound(_mapper.Map<ArtWorkPaymentDto>(new ArtworkPayment()));
      }
      return IfFound(_mapper.Map<ArtWorkPaymentDto>(artWorkItem));
    }

    [HttpGet("nominees")]
    [HasPermission(Permissions.ReadArtwork)]
    public async Task<IActionResult> ListOfNominees([FromServices] IAppUnitOfWork db) {
      var nominee = db.Nominees;
      if (nominee == null) {
        throw new ApiException(ApiErrorType.NotFound, "nominee not found");
      }

      return IfFound(nominee.MapTo<NomineeDto>());
    }

    [HttpGet("countries")]
    [HasPermission(Permissions.ReadArtwork)]
    public IActionResult ListOfCountries() {
      var listCountries = new List<CountryDto>();
      var filename = "iso_countries_all.json";
      if (System.IO.File.Exists("./" + filename)) {
        using (StreamReader r = new StreamReader(filename)) {
          string json = r.ReadToEnd();
          listCountries = JsonConvert.DeserializeObject<List<CountryDto>>(json);

        }
      }
      return IfFound(listCountries.MapTo<CountryDto>());

    }

    [HttpPut("UpdateTrailerVideoUrl")]
    [HasPermission(Permissions.ArtworkEdit)]
    public async Task<IActionResult> UpdateTrailerVideoUrlAsync([FromBody] PhotoAlbumFileDto dto, [FromServices] IAppUnitOfWork db) {
      var artWork = await db.Artworks.FirstOrDefaultAsync(a => a.Id == dto.Id);
      artWork.Trailer = S3File.FromKeyAndUrl(dto.FileKey, dto.FileUrl);

      var entry = db.Set<Artwork>().Attach(artWork);
      entry.State = EntityState.Modified;
      await db.CommitTransactionAsync();
      return IfFound(_mapper.Map<ArtWorkDto>(artWork));
    }

    [HttpPost("artwork/{id}/files")]
    [HasPermission(Permissions.ArtworkEdit)]
    public async Task<IActionResult> UploadArtworkFiles(
      [FromRoute] string id,
      [FromServices] IAppUnitOfWork db,
      [FromServices] IS3FileManager fileManager,
      FileChunkDto dto) {
      try {
        var tempDir = fileManager.GetTempDirectoryForResource(ResourceType.ArtWork, id);
        var result = await fileManager.UploadChunk(tempDir, dto);
        if (!string.IsNullOrEmpty(result.FinalUrl)) {
          //move file to final directory of the artwork files
          var fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, id, dto.FileName);
          var fileUrl = await fileManager.MoveObjectAsync(result.FileKey, fileKey);

          var mediaFile = new Artwork {
            Trailer = S3File.FromKeyAndUrl(fileKey, fileUrl)
          };

          //TODO: uncomment 
          return Ok(mediaFile);
        } else {
          return Ok(result);
        }
      } catch (Exception ex) {
        _logger.LogError(ex, "Failed to upload file");
        throw new ApiException(ApiErrorType.FailedToUploadChunkedFile, $"{ex.Message}");
      }
    }

    [HttpGet("getArtWorkFiles")]
    [HasPermission(Permissions.ReadArtwork)]
    public async Task<IActionResult> GetArtWorkFilesAsync([FromQuery(Name = "judgeId")] string id, [FromServices] IAppUnitOfWork db) {
      var artWorkItem = db.MediaFiles.Where(a => a.ArtWorkId == id).ToList();
      var returnMediaList = _mapper.Map<List<MediaFileDto>>(artWorkItem);
      return IfFound(returnMediaList);
    }


    [HttpGet("{artworkId}/withFiles")]
    [HasPermission(Permissions.ReadArtworkWithAllFiles)]
    public async Task<IActionResult> GetArtworkWithFiles(
      [FromRoute(Name = "artworkId")] string id,
      [FromServices] IAppUnitOfWork db) {
      var item = await db.Artworks
        .Include(a => a.MediaFiles)
        .FirstOrDefaultAsync(a => a.Id == id);

      var returnMediaList = _mapper.Map<ArtworkWithFilesDto>(item);
      return IfFound(returnMediaList);
    }

    [HttpPost("artwork-statistics")]
    [HasPermission(Permissions.ViewAllArtworkStatistics)]
    public async Task<IActionResult> ArtworkStatistics(
      [FromBody] ArtworkStatisticsFilter dto,
      [FromServices] IUserResolver userResolver,
      [FromServices] IAppUnitOfWork db) {
      var userId = (await userResolver.CurrentUserAsync())?.Id;

      var isManager = await db.Awards.AnyAsync(a => a.ManagerId == userId);



      var allArtworks = db.Artworks
                          .Include(a => a.Award)
                          .Include(a => a.FinalScores)
                          .Where(a => a.UploadComplete);

      if (!string.IsNullOrEmpty(dto.AwardId)) {
        allArtworks = allArtworks.Where(a => a.AwardId == dto.AwardId);
      }

      if (isManager) {
        allArtworks = allArtworks.Where(a => a.Award.ManagerId == userId);
      }

      var query = await allArtworks.AsNoTracking().ToListAsync();

      var result = query.Select(a => new {
        Artwork = _mapper.Map<ArtworkMinimumDto>(a),
        Level1 = new {
          Avg = a.FinalScores.Where(x => x.Level == JudgeLevel.Level1).Select(x => x.Percentage).DefaultIfEmpty(0).Average(),
          Min = a.FinalScores.Where(x => x.Level == JudgeLevel.Level1).Select(x => x.Percentage).DefaultIfEmpty(0).Min(),
          Max = a.FinalScores.Where(x => x.Level == JudgeLevel.Level1).Select(x => x.Percentage).DefaultIfEmpty(0).Max(),
        },
        Level2 = new {
          Avg = a.FinalScores.Where(x => x.Level == JudgeLevel.Level2).Select(x => x.Percentage).DefaultIfEmpty(0).Average(),
          Min = a.FinalScores.Where(x => x.Level == JudgeLevel.Level2).Select(x => x.Percentage).DefaultIfEmpty(0).Min(),
          Max = a.FinalScores.Where(x => x.Level == JudgeLevel.Level2).Select(x => x.Percentage).DefaultIfEmpty(0).Max(),
        }
      }).ToList();

      return IfFound(result);
    }

    [HttpGet("artworks-for-dropdown")]
    [HasPermission(Permissions.ReadArtwork)]
    public async Task<IActionResult> ArtworksForDropdown(
      [FromServices] IAppUnitOfWork db) {
      var artworks = await db.Artworks.Where(a => a.UploadComplete).ProjectTo<ArtworkMinimumDto>(_mapper.ConfigurationProvider).ToArrayAsync();
      return IfFound(artworks);
    }

    [HttpGet("artwork-score-detail/{artworkId}/{level?}")]
    [HasPermission(Permissions.ViewArtworkScore)]
    public async Task<IActionResult> ArtworkScoreDetails(
          [FromRoute(Name = "artworkId")] string artworkId,
          [FromRoute(Name = "level")] int? level,
          [FromServices] IUserResolver userResolver,
          [FromServices] IOptions<AdminOptions> adminOptions,
          [FromServices] IAppUnitOfWork db) {
      var userId = (await userResolver.CurrentUserAsync())?.Id;
      var isJudge = await db.Judges.AnyAsync(a => a.Id == userId);
      var isManager = await db.Awards.AnyAsync(a => a.ManagerId == userId);

      Artwork artwork = null;
      if (isManager) {
        var isArtworkBelongsToHim = await
          db.Awards.AnyAsync(a => a.ManagerId == userId && a.Artworks.Any(x => x.Id == artworkId));

        if (!isArtworkBelongsToHim) {
          throw new ApiException(ApiErrorType.Forbidden, "Artwork doesn't belong to you");
        }
      } else if (isJudge) {
        var isArtworkBelongsToHim = await
          db.JudgeAwards
            .Include(a => a.Award)
            .ThenInclude(a => a.Artworks)
            .AnyAsync(a => a.JudgeId == userId && a.Award.Artworks.Any(x => x.Id == artworkId));

        if (!isArtworkBelongsToHim) {
          throw new ApiException(ApiErrorType.Forbidden, "Artwork doesn't belong to you");
        }
      }

      artwork = await db.Artworks
                            .Include(a => a.Votes)
                            .ThenInclude(a => a.Criteria)
                            .AsNoTracking()
                            .FirstOrDefaultAsync(a => a.Id == artworkId);
      if (level != null) {
        artwork.Votes = artwork.Votes.Where(a => a.Criteria.Level == (JudgeLevel)level).ToHashSet();
      }

      var votes = new List<JudgeVote>();
      var resultVotes = new CriteriaVoteWithValue[] { };

      if (isManager) {
        votes = artwork.Votes.ToList();
        resultVotes = votes
          .GroupBy(a => a.Criteria)
          .Select(a => new CriteriaVoteWithValue {
            Weight = a.Key.Weight,
            CriteriaName = a.Key.Name,
            LevelNumber = (int)a.Key.Level,
            VotedValue = a.Select(x => (decimal)x.VotingValue).DefaultIfEmpty(0).Average(),
            WeightedValue = a.Key.Weight * (a.Select(x => (decimal)x.VotingValue / 10.0m).DefaultIfEmpty(0).Average()),
            Percentage = (a.Key.Weight * (a.Select(x => (decimal)x.VotingValue).DefaultIfEmpty(0).Average() / 10.0m) / a.Key.Weight) * 100.0M
          })
          .ToArray();

      } else if (isJudge) {
        votes = artwork.Votes.Where(a => a.JudgeId == userId).ToList();
        resultVotes = votes
                      .Select(a => new CriteriaVoteWithValue {
                        Weight = a.Criteria.Weight,
                        CriteriaName = a.Criteria.Name,
                        LevelNumber = (int)a.Criteria.Level,
                        VotedValue = a.VotingValue,
                        WeightedValue = a.Criteria.Weight * (a.VotingValue / 10.0m),
                        Percentage = (a.Criteria.Weight * (a.VotingValue / 10.0m) / a.Criteria.Weight) * 100.0M
                      })
                      .ToArray();
      }

      var _artwork = _mapper.Map<ArtworkVotingDetails>(artwork);
      _artwork.Votes = resultVotes;
      return IfFound(_artwork);
    }


    [HttpPost("{id}/allow-file-upload")]
    [HasPermission(Permissions.ArtworkApprove)]
    public async Task<IActionResult> AllowFileUpload(
      [FromRoute] string id,
      [FromServices] IEmailSender emailSender,
      [FromServices] ITemplateParser templateParser,
      [FromServices] IAppUnitOfWork db) {
      try {
        var artwork = await db.Artworks
          .Include(a => a.Nominee)
          .FirstOrDefaultAsync(a => a.Id == id);
        if (artwork == null) {
          throw new ApiException(ApiErrorType.NotFound, "record not found");
        } else {
          //send email only if it was false 
          var sendEmail = artwork.AllowFileUpload == false;

          artwork.AllowFileUpload = true;

          if (sendEmail) {
            try {
              string htmlMessage = await templateParser.LoadAndParse("notify_user_start_upload", locale: "en",
                new UserWithArtworkDetails {
                  FullName = artwork.Nominee.FullName,
                  ProjectName = artwork.ProjectName.InEnglish()
                });

              //send confirmation email
              await emailSender.SendEmailAsync(artwork.Nominee.Email, _localizer.Get("en", "notify_user_start_upload"), htmlMessage);
            } catch (Exception exEmail) {
              _logger.LogError(exEmail, "Failed to notify user to start uploading");
            }

          }
          return Ok();
        }
      } catch (Exception ex) {
        _logger.LogError(ex, "Failed to upload file");
        throw new ApiException(ApiErrorType.FailedToUploadChunkedFile, $"{ex.Message}");
      }
    }


    [HttpGet("{judgeId}/withFiles-and-score/{level}")]
    [HasPermission(Permissions.ViewArtworkScore)]
    public async Task<IActionResult> GetArtworkWithFilesAndScore(
      [FromRoute(Name = "judgeId")] string id,
      [FromRoute(Name = "level")] int level,
      [FromServices] IAppUnitOfWork db,
      [FromServices] IUserResolver userResolver
    ) {
      var userId = (await userResolver.CurrentUserAsync())?.Id;
      if (string.IsNullOrEmpty(userId)) {
        throw new ApiException(ApiErrorType.Unauthorized, "you are not a judge");
      }

      var item = await db.Artworks
        .Include(a => a.FinalScores)
        .Include(a => a.MediaFiles)
        .AsNoTracking()
        .FirstOrDefaultAsync(a => a.Id == id);

      item.FinalScores = item.FinalScores.Where(x => x.JudgeId == userId && x.Level == (JudgeLevel)level).ToHashSet();
      var result = _mapper.Map<ArtworkWithFilesAndScoresDto>(item);
      return IfFound(result);
    }

  }

  public class UserWithArtworkDetails {
    public string FullName { get; set; }
    public string ProjectName { get; set; }
  }

}