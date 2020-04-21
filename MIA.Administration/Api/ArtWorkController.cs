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

namespace MIA.Administration.Api {

  //[Authorize]
  [EnableCors(CorsPolicyName.AllowAll)]
  [Route("api/artWorks")]
  public class ArtWorksController : BaseCrudController<ArtWork, ArtWorkDto, NewArtWorkDto, UpdateArtWorkDto> {
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

    public override async Task<IActionResult> SaveNewAsync([FromBody] NewArtWorkDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.SaveNewAsync(dto, db);
      var resultDto = ((ArtWorkDto)(result as OkObjectResult)?.Value);
      var ArtWorksItem = await db.ArtWorks.FindAsync(resultDto.Id);
      string posterKey, posterUrl, coverKey, coverUrl, trailerPosterKey, trailerPosterUrl;
      if (dto.Poster != null && dto.Poster.Length > 0 || dto.Cover != null && dto.Cover.Length > 0 || dto.TrailerPoster != null && dto.TrailerPoster.Length > 0) {
        using (var memorySteam = new MemoryStream(dto.Poster)) {
          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
          }

          //    ArtWorksItem.Payment = new ArtWorkPayment();
          posterKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, ArtWorksItem.Id, dto.PosterFileName);
          posterUrl = await fileManager.UploadFileAsync(memorySteam, posterKey);
        }
        using (var memorySteam = new MemoryStream(dto.Cover)) {
          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
          }

          coverKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, ArtWorksItem.Id, dto.CoverFileName);
          coverUrl = await fileManager.UploadFileAsync(memorySteam, coverKey);
        }

        ArtWorksItem.Poster = S3File.FromKeyAndUrl(posterKey, posterUrl);
        ArtWorksItem.Cover = S3File.FromKeyAndUrl(coverKey, coverUrl);

        await db.CommitTransactionAsync();
      }

      return IfFound(_mapper.Map<ArtWorkDto>(ArtWorksItem));
    }

    public override async Task<IActionResult> UpdateAsync([FromBody] UpdateArtWorkDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.UpdateAsync(dto, db);
      var resultDto = ((ArtWorkDto)(result as OkObjectResult)?.Value);
      var ArtWorksItem = await db.ArtWorks.FindAsync(resultDto.Id);
      if (dto.Poster != null && dto.Poster.Length > 0 && dto.Video != null && dto.Video.Length > 0) {

        using (var memorySteam = new MemoryStream(dto.Poster)) {
          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
          }
          if (dto.Receipt != null && dto.Receipt.Length > 0) {

            using (var memorySteamReciept = new MemoryStream(dto.Poster)) {

              string fileReceiptKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, ArtWorksItem.Id, dto.ReceiptFileName);
              var ReceiptUrl = await fileManager.UploadFileAsync(memorySteamReciept, fileReceiptKey);

              ArtWorksItem.Payment.ReceiptUrl = ReceiptUrl;
              ArtWorksItem.Payment.ReceiptId = fileReceiptKey;
            }
          }
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

    public override async Task<IActionResult> GetAsync(string id, [FromServices] IAppUnitOfWork db) {
      var result = await base.GetAsync(id, db);
      var resultDto = ((ArtWorkDto)(result as OkObjectResult)?.Value);
      var artWorkItem = await db.ArtWorks.Include(i => i.Award).Include(i => i.Nominee).FirstOrDefaultAsync(a => a.Id == resultDto.Id);
      return IfFound(_mapper.Map<ArtWorkDto>(artWorkItem));
    }

    [HttpGet("getArtWorkFiles")]
    public async Task<IActionResult> GetArtWorkFilesAsync([FromQuery(Name = "id")] string id, [FromServices] IAppUnitOfWork db) {
      // var artWork = await db.ArtWorks.FirstOrDefaultAsync(a => a.Id == id);
      var artWorkItem = db.MediaFiles.Where(a => a.ArtWorkId == id).ToList();
      //if (!artWorkItem.Any())
      //{
      //  var returnMediaList = new List<MediaFileDto>();
      //  returnMediaList.Add(new MediaFileDto());
      //  returnMediaList[0].VoteOn = _mapper.Map<ArtWorkDto>(artWork);
      //  return IfFound(returnMediaList);
      //}
      //else
      //{
      var returnMediaList = _mapper.Map<List<MediaFileDto>>(artWorkItem);
      //returnMediaList[0].VoteOn = _mapper.Map<ArtWorkDto>(artWork);
      return IfFound(returnMediaList);

      // }

    }
    [HttpGet("getMediaFile")]
    public async Task<IActionResult> GetMediaFileAsync([FromQuery(Name = "id")] string id, [FromServices] IAppUnitOfWork db) {
      var artWorkItem = await db.MediaFiles.FirstOrDefaultAsync(a => a.Id == id);
      return IfFound(_mapper.Map<MediaFile>(artWorkItem));
    }
    [HttpDelete("deleteMediaItem")]
    public async Task<IActionResult> DeleteMediaFileAsync([FromQuery(Name = "id")] string id, [FromServices] IAppUnitOfWork db) {
      var entity = db.Set<MediaFile>().FirstOrDefault(a => a.Id == id);
      if (entity == null)
        return NotFound404("record not found");

      db.Set<MediaFile>().Remove(entity);
      return Ok();
    }
    [HttpPost("createMediaFile")]
    public async Task<IActionResult> CreateMediaFile([FromBody] MediaFileDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await db.Set<MediaFile>().AddAsync(_mapper.Map<MediaFile>(dto));
      var mediaItem = await db.MediaFiles.FindAsync(result.Entity.Id);
      return IfFound(_mapper.Map<MediaFile>(mediaItem));
    }
    [HttpPut("UpdateMediaItemVideoUrl")]
    public async Task<IActionResult> UpdateMediaItemVideoUrlAsync([FromBody] MediaFileDto dto, [FromServices] IAppUnitOfWork db) {
      var mediaItem = await db.MediaFiles.FirstOrDefaultAsync(a => a.Id == dto.Id);
      mediaItem.FileUrl = dto.FileUrl;
      mediaItem.FileKey = dto.FileKey;

      var entry = db.Set<MediaFile>().Attach(mediaItem);
      entry.State = EntityState.Modified;
      await db.CommitTransactionAsync();
      return IfFound(_mapper.Map<MediaFileDto>(mediaItem));
    }

    [HttpPost("createPayment")]
    public async Task<IActionResult> SavePaymentAsync([FromBody] NewArtWorkPaymentDto dto, [FromServices] IAppUnitOfWork db) {
      //var newartwork = new ArtWorkPayment();
      //newartwork.ArtworkId = dto.ArtworkId;
      //newartwork.Amount = dto.Amount;
      //newartwork.PaymentDate = dto.PaymentDate;
      //newartwork.TransactionNumber = dto.TransactionNumber; ;

      //var result = await db.Set<ArtWorkPayment>().AddAsync(newartwork);

      //await db.CommitTransactionAsync();

      var result = await db.ArtWorkPayments.AddAsync(_mapper.Map<ArtWorkPayment>(dto));
      await db.CommitTransactionAsync();
      var paymentItem = await db.ArtWorkPayments.FindAsync(result.Entity.Id);

      if (dto.Receipt != null && dto.Receipt.Length > 0) {
        using (var memorySteam = new MemoryStream(dto.Receipt)) {
          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
          }

          string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWrokPayment, paymentItem.Id, dto.ReceiptFileName);
          var posterUrl = await fileManager.UploadFileAsync(memorySteam, fileKey);

          paymentItem.ReceiptUrl = posterUrl;
          paymentItem.ReceiptId = fileKey;
          var entry = db.Set<ArtWorkPayment>().Attach(paymentItem);
          entry.State = EntityState.Modified;
          await db.CommitTransactionAsync();
        }
      }

      return IfFound(_mapper.Map<ArtWorkPaymentDto>(paymentItem));
    }

    [HttpPut("updatePayment")]
    public async Task<IActionResult> UpdatePaymentAsync([FromBody] UpdateArtWorkPaymentDto dto, [FromServices] IAppUnitOfWork db) {

      var paymentItem = await db.ArtWorkPayments.FirstOrDefaultAsync(a => a.Id == dto.Id);
      if (paymentItem == null)
        return NotFound404("record not found");
      paymentItem = (ArtWorkPayment)_mapper.Map(dto, paymentItem, typeof(UpdateArtWorkPaymentDto), typeof(ArtWorkPayment));

      if (dto.Receipt != null && dto.Receipt.Length > 0) {
        using (var memorySteam = new MemoryStream(dto.Receipt)) {
          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
          }

          string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWrokPayment, paymentItem.Id, dto.ReceiptFileName);
          var posterUrl = await fileManager.UploadFileAsync(memorySteam, fileKey);

          paymentItem.ReceiptUrl = posterUrl;
          paymentItem.ReceiptId = fileKey;
          var entry = db.Set<ArtWorkPayment>().Attach(paymentItem);
          entry.State = EntityState.Modified;
          await db.CommitTransactionAsync();
        }
      }



      return IfFound(_mapper.Map<ArtWorkPaymentDto>(paymentItem));
    }

    [HttpGet("getPayment")]
    public async Task<IActionResult> GetPaymentAsync([FromQuery(Name = "id")] string id, [FromServices] IAppUnitOfWork db) {
      var artWorkItem = await db.ArtWorkPayments.FirstOrDefaultAsync(a => a.ArtWorkId == id);
      if (artWorkItem == null) {
        return IfFound(_mapper.Map<ArtWorkPaymentDto>(new ArtWorkPayment()));
      }
      return IfFound(_mapper.Map<ArtWorkPaymentDto>(artWorkItem));
    }
    [HttpGet("nominees")]
    public async Task<IActionResult> ListOfNominees([FromServices] IAppUnitOfWork db) {
      var nominee = db.Nominees;
      if (nominee == null) {
        return NotFound404("nominee not found");
      }

      return IfFound(nominee.MapTo<NomineeDto>());
    }
    [HttpGet("countries")]
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

    [HttpPost("getJudgeArtWorks")]
    public async Task<IActionResult> GetJudgeArtWorksAsync([FromQuery(Name = "id")] string id, [FromServices] IAppUnitOfWork db) {
      var listOfArtWork = new List<ArtWorkDto>();
      var judgeAward = await db.JudgeArtworkAwards.Where(a => a.JudgeId == id).ToListAsync();
      foreach (var award in judgeAward) {
        var artWork = await db.ArtWorks.FirstOrDefaultAsync(a => a.AwardId == award.AwardId && a.UploadComplete);
        if (artWork != null)
          listOfArtWork.Add(_mapper.Map<ArtWorkDto>(artWork));
      }
      return IfFound(listOfArtWork);

    }



    [HttpPut("UpdateTrailerVideoUrl")]
    public async Task<IActionResult> UpdateTrailerVideoUrlAsync([FromBody] PhotoAlbumFileDto dto, [FromServices] IAppUnitOfWork db) {
      var artWork = await db.ArtWorks.FirstOrDefaultAsync(a => a.Id == dto.Id);
      artWork.Trailer = S3File.FromKeyAndUrl(dto.FileKey, dto.FileUrl);

      var entry = db.Set<ArtWork>().Attach(artWork);
      entry.State = EntityState.Modified;
      await db.CommitTransactionAsync();
      return IfFound(_mapper.Map<ArtWorkDto>(artWork));
    }

    [HttpPost("artwork/{id}/files")]
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

          var mediaFile = new ArtWork {
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
  }

}