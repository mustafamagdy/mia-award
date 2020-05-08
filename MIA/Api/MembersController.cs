using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MIA.Api.Base;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using MIA.Models.Entities;
using Microsoft.AspNetCore.Http;
using MIA.ORMContext;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using MIA.ORMContext.Uow;
using System.Linq;
using AutoMapper.QueryableExtensions;
using MIA.Payments;
using PaymentStatus = MIA.Payments.PaymentStatus;
using MIA.Exceptions;
using System;
using System.Net;
using Microsoft.Extensions.Options;
using MIA.Infrastructure;
using MIA.Infrastructure.Options;
using Microsoft.EntityFrameworkCore;

namespace MIA.Api {
#if (Versioning)
    [ApiVersion("1.0")]
#endif
  [Route("api/members")]
  [Authorize()]
  [HasPermission(Permissions.NomineeAccess)]
  public class MembersController : BaseApiController<MembersController> {
    private readonly IUserResolver _userResolver;

    public MembersController(IMapper mapper,
      [FromServices] ILogger<MembersController> logger,
      [FromServices] IUserResolver userResolver
      ) : base(logger, mapper) {
      this._userResolver = userResolver;
    }


    [HttpGet("awards")]
    [Authorize]
    public async Task<IActionResult> Awards([FromServices] IAppUnitOfWork db) {
      var nominee = await _userResolver.CurrentUserAsync();
      var artworks = db.ArtWorks
        .Include(a => a.Award)
        .Where(a => a.NomineeId == nominee.Id)
        .Select(a => new AwardWithStatusDto {
          Id = a.AwardId,
          TrophyUrl = a.Award.TrophyImageUrl,
          Winner = a.WinnerAwardFirstPlace != null || a.WinnerAwardSecondPlace != null,
          ArtworkId = a.Id,
          ProjectName = a.ProjectName,
          Description = a.Description,
          PosterUrl = a.Poster.FileUrl
        })
        .ToArray();
      var contestants = db.Contestants
        .Include(a => a.Award)
        .Where(a => a.NomineeId == nominee.Id)
        .Select(a => new AwardWithStatusDto {
          Id = a.AwardId,
          TrophyUrl = a.Award.TrophyImageUrl,
          Winner = a.WinnerAwardFirstPlace != null || a.WinnerAwardSecondPlace != null,
          ArtworkId = a.Id,
          ProjectName = a.ProjectName,
          Description = a.Description,
          PosterUrl = ""
        })
        .ToArray();

      return Ok(artworks.Union(contestants).ToArray());
    }

    [HttpGet("artworks")]
    public async Task<IActionResult> Artworks([FromServices] IAppUnitOfWork db) {
      var nominee = await _userResolver.CurrentUserAsync();
      var artworks = db.ArtWorks
          .Include(a => a.Award)
        .Where(a => a.NomineeId == nominee.Id)
        .ProjectTo<ArtworkWithStatusDto>(_mapper.ConfigurationProvider)
        .ToArray();

      return Ok(artworks);
    }


    [HttpGet("myawards")]
    public async Task<IActionResult> MyAwards([FromServices] IAppUnitOfWork db) {
      var nominee = await _userResolver.CurrentUserAsync();

      var awards = await db.ArtworkAwards
          .Include(a => a.FirstPlace)
          .Include(a => a.SecondPlace)
          .Where(a => a.SecondPlace.NomineeId == nominee.Id || a.FirstPlace.NomineeId == nominee.Id)
          .ProjectTo<AwardDto>(_mapper.ConfigurationProvider)
          .ToArrayAsync();


      return Ok(awards);
    }


    [HttpGet("payments")]
    public async Task<IActionResult> Payments([FromServices] IAppUnitOfWork db) {
      var nominee = await _userResolver.CurrentUserAsync();
      var artworks = db.ArtWorkPayments
        .Where(a => a.ArtWork.NomineeId == nominee.Id)
        .ProjectTo<PaymentWithStatusDto>(_mapper.ConfigurationProvider)
        .ToArray();

      return Ok(artworks);
    }


    [HttpPost("add-artwork")]
    public async Task<IActionResult> SubmitArtwork(
      [FromBody] SubmitArtworkWithDetails dto,
      [FromServices] IPaymentGateway paymentGateway,
      [FromServices] IAppUnitOfWork db,
      [FromServices] IOptions<UploadLimits> limitOptions,
      [FromServices] IS3FileManager fileManager) {

      var nominee = await _userResolver.CurrentUserAsync();
      var award = await db.ArtworkAwards.FindAsync(dto.AwardId);
      var artwork = _mapper.Map<ArtWork>(dto);
      artwork.NomineeId = nominee.Id;
      //all artworks cannot upload files until payment approved
      artwork.AllowFileUpload = false;

      await db.ArtWorks.AddAsync(artwork);

      artwork.Payment = await SaveUserPaymentAsync(fileManager, db, award, artwork.Id, dto);
      artwork.Poster = await SaveArtworkPoster(fileManager, artwork.Id, dto);
      artwork.Cover = await SaveArtworkCoverImage(fileManager, artwork.Id, dto);

      return Ok(_mapper.Map<ArtworkViewWithFilesDto>(artwork));
    }

    private async Task<S3File> SaveArtworkPoster(IS3FileManager fileManager, string artworkId, SubmitArtworkWithDetails dto) {
      if (!string.IsNullOrEmpty(dto.PosterFileName) && dto.Poster != null && dto.Poster.Length > 0) {
        var posterFileKey = fileManager.GenerateFileKeyForResource(
          ResourceType.ArtWork,
          artworkId, $"{artworkId}_poster." + dto.PosterFileName);
        return S3File.FromKeyAndUrl(posterFileKey, await fileManager.UploadFileAsync(dto.Poster, posterFileKey));
      }
      return null;
    }

    private async Task<S3File> SaveArtworkCoverImage(IS3FileManager fileManager, string artworkId, SubmitArtworkWithDetails dto) {
      if (!string.IsNullOrEmpty(dto.CoverImageFileName) && dto.CoverImage != null && dto.CoverImage.Length > 0) {
        var coverFileKey = fileManager.GenerateFileKeyForResource(
          ResourceType.ArtWork,
          artworkId, $"{artworkId}_cover." + dto.CoverImageFileName);
        return S3File.FromKeyAndUrl(coverFileKey, await fileManager.UploadFileAsync(dto.CoverImage, coverFileKey));
      }
      return null;
    }

    private async Task<ArtWorkPayment> SaveUserPaymentAsync(IS3FileManager fileManager, IAppUnitOfWork db, ArtworkAward award, string artworkId, SubmitArtworkWithDetails dto) {
      var payment = new ArtWorkPayment();
      payment.ArtWorkId = artworkId;
      payment.Amount = award.ArtworkFee;

      payment.IsOffline = true;
      payment.PaymentStatus = Models.Entities.PaymentStatus.Waiting;
      payment.PaymentDate = DateTimeOffset.Now.ToUnixTimeSeconds();

      await db.ArtWorkPayments.AddAsync(payment);

      var receiptFileKey = fileManager.GenerateFileKeyForResource(ResourceType.Docs, payment.Id, $"{payment.Id}_receipt." + dto.Payment.ReceiptFileName);
      payment.Receipt = S3File.FromKeyAndUrl(receiptFileKey, await fileManager.UploadFileAsync(dto.Payment.Receipt, receiptFileKey));
      return payment;
    }


    [HttpPut("artwork/{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateArtwork(
      [FromRoute] string id,
      [FromBody] SubmitArtworkWithDetails dto,
      [FromServices] IAppUnitOfWork db) {

      var nominee = await _userResolver.CurrentUserAsync();
      var artwork = await db.ArtWorks.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id);

      if (artwork.NomineeId != nominee.Id) {
        throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't belong to you");
      }

      var updatedArtwork = _mapper.Map<SubmitArtworkWithDetails, ArtWork>(dto, artwork);
      updatedArtwork.Id = id;
      db.ArtWorks.Update(updatedArtwork);
      return Ok(_mapper.Map<ArtworkViewWithFilesDto>(updatedArtwork));
    }


    [HttpPut("artwork/{id}/trailer")]
    [RequestSizeLimit(1024 * 1024 * 30)]
    public async Task<IActionResult> UpdateTrailer([FromRoute] string id,
        [FromServices] IAppUnitOfWork db,
        [FromServices] IS3FileManager fileManager,
        FileChunkDto dto) {
      try {
        var nominee = await _userResolver.CurrentUserAsync();
        var artwork = await db.ArtWorks.FindAsync(id);
        if (artwork == null) {
          throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't exist");
        }
        if (artwork.NomineeId != nominee.Id) {
          throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't belong to you");
        }

        var imageExtensions = new[] { ".jpg", ".png" };

        var tempDir = fileManager.GetTempDirectoryForResource(ResourceType.ArtWork, id);
        var result = await fileManager.UploadChunk(tempDir, dto);
        if (!string.IsNullOrEmpty(result.FinalUrl)) {
          var isPoster = imageExtensions.Any(a => dto.FileName.Contains(a));
          var fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, artwork.Id, isPoster ? $"{artwork.Id}_trailer_poster." : $"{artwork.Id}_trailer." + dto.FileName);

          var fileUrl = await fileManager.MoveObjectAsync(result.FileKey, fileKey);
          //if file is image the it will be a poster 

          if (isPoster) {
            artwork.Poster = S3File.FromKeyAndUrl(fileKey, fileUrl);
          } else {
            // else it will the trailer video
            artwork.Trailer = S3File.FromKeyAndUrl(fileKey, fileUrl);
          }
          //move file to final directory of the artwork files

          db.ArtWorks.Update(artwork);
          return Ok(fileUrl);
        } else {
          return Ok(result);
        }
      } catch (Exception ex) {
        _logger.LogError(ex, "Failed to upload file");
        throw new ApiException(ApiErrorType.FailedToUploadChunkedFile, $"{ex.Message}");
      }
    }

    [HttpPut("artwork/{id}/cover")]
    [RequestSizeLimit(1024 * 1024 * 30)]
    public async Task<IActionResult> UpdateCoverImage(
        [FromServices] IS3FileManager fileManager,
        [FromServices] IAppUnitOfWork db,
        [FromRoute] string id,
        FileChunkDto dto
        ) {
      var nominee = await _userResolver.CurrentUserAsync();
      var artwork = await db.ArtWorks.FindAsync(id);
      if (artwork == null) {
        throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't exist");
      }
      if (artwork.NomineeId != nominee.Id) {
        throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't belong to you");
      }
      var coverFileKey = fileManager.GenerateFileKeyForResource(
        ResourceType.ArtWork,
        artwork.Id, $"{artwork.Id}_cover." + dto.FileName);
      var fileUrl = await fileManager.UploadFileAsync(dto.Chunk, coverFileKey);
      artwork.Cover = S3File.FromKeyAndUrl(coverFileKey, fileUrl);
      db.ArtWorks.Update(artwork);
      return Ok(fileUrl);
    }


    [HttpGet("artwork/{id}")]
    public async Task<IActionResult> GetArtowkrById([FromRoute] string id, [FromServices] IAppUnitOfWork db) {
      var nominee = await _userResolver.CurrentUserAsync();
      var artwork = await db.ArtWorks
        .Include(a => a.Payment)
        .Include(a => a.MediaFiles)
        .FirstOrDefaultAsync(a => a.Id == id);
      if (artwork.NomineeId != nominee.Id)
        throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't belong to you");

      return Ok(_mapper.Map<ArtworkViewWithFilesDto>(artwork));
    }

    [HttpPost("artwork/{id}/files")]
    [RequestSizeLimit(1024 * 1024 * 30)]
    public async Task<IActionResult> UploadArtworkFiles(
      [FromRoute] string id,
      [FromServices] IAppUnitOfWork db,
      [FromServices] IS3FileManager fileManager,
      FileChunkDto dto) {
      try {
        var nominee = await _userResolver.CurrentUserAsync();
        var artwork = await db.ArtWorks.FindAsync(id);
        if (artwork == null) {
          throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't exist");
        }

        if (artwork.NomineeId != nominee.Id) {
          throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't belong to you");
        }

        if (artwork.UploadComplete) {
          throw new ApiException(ApiErrorType.BadRequest, "Files upload complete, waiting for artwork review");
        }

        var tempDir = fileManager.GetTempDirectoryForResource(ResourceType.ArtWork, id);
        var result = await fileManager.UploadChunk(tempDir, dto);
        if (!string.IsNullOrEmpty(result.FinalUrl)) {
          //move file to final directory of the artwork files
          var fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, id, dto.FileName);
          var fileUrl = await fileManager.MoveObjectAsync(result.FileKey, fileKey);

          var mediaFile = new MediaFile {
            ArtWorkId = artwork.Id,
            UploadDate = DateTime.Now.ToUnixTimeSeconds(),
            FileKey = fileKey,
            FileUrl = fileUrl
          };

          await db.MediaFiles.AddAsync(mediaFile);
          return Ok(fileKey);
        } else {
          return Ok(result);
        }
      } catch (Exception ex) {
        _logger.LogError(ex, "Failed to upload file");
        throw new ApiException(ApiErrorType.FailedToUploadChunkedFile, $"{ex.Message}");
      }
    }

    [HttpGet("artwork/{id}/files")]
    public async Task<IActionResult> ArtworkFiles(
      [FromRoute] string id,
      [FromServices] IAppUnitOfWork db) {

      var nominee = await _userResolver.CurrentUserAsync();
      var artwork = await db.ArtWorks
                            .Include(a => a.MediaFiles)
                            .FirstOrDefaultAsync(a => a.Id == id);

      if (artwork.NomineeId != nominee.Id) {
        throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't belong to you");
      }

      return Ok(_mapper.Map<ArtworkViewWithFilesDto>(artwork));
    }

    [HttpPut("artwork/{id}/publish")]
    public async Task<IActionResult> PublishArtwork(
        [FromBody]PublishArtwork publishArtworkDto,
        [FromRoute]string id,
        [FromServices] IAppUnitOfWork db) {

      var nominee = await _userResolver.CurrentUserAsync();
      var artwork = await db.ArtWorks
          .FirstOrDefaultAsync(a => a.Id == id);

      if (artwork.NomineeId != nominee.Id) {
        throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't belong to you");
      }

      artwork.UploadComplete = publishArtworkDto.Publish;
      db.ArtWorks.Update(artwork);

      return Ok();
    }

  }
}