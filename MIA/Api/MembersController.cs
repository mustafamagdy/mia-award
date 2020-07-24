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
using System.Collections.Generic;
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
      var artworks = db.Artworks
        .Include(a => a.Award)
        .Where(a => a.NomineeId == nominee.Id)
        .Select(a => new AwardWithStatusDto {
          Id = a.AwardId,
          TrophyUrl = a.Award.Trophy.FileUrl,
          Winner = a.FirstPlace != null || a.SecondPlace != null,
          ArtworkId = a.Id,
          ProjectName = a.ProjectName,
          Description = a.Description,
          PosterUrl = a.Poster.FileUrl,
        })
        .ToArray();

      return Ok(artworks);
    }

    [HttpGet("artworks")]
    public async Task<IActionResult> Artworks([FromServices] IAppUnitOfWork db) {
      var nominee = await _userResolver.CurrentUserAsync();
      var artworks = db.Artworks
          .Include(a => a.Award)
        .Where(a => a.NomineeId == nominee.Id)
        .ProjectTo<ArtworkWithStatusDto>(_mapper.ConfigurationProvider)
        .ToArray();

      return Ok(artworks);
    }


    [HttpGet("myawards")]
    public async Task<IActionResult> MyAwards([FromServices] IAppUnitOfWork db) {
      var nominee = await _userResolver.CurrentUserAsync();

      var awards = await db.Awards
          .Include(a => a.FirstPlace)
          .Include(a => a.SecondPlace)
          .Where(a => (a.SecondPlace != null && a.SecondPlace.NomineeId == nominee.Id) 
                      || (a.FirstPlace != null && a.FirstPlace.NomineeId == nominee.Id))
          .ToArrayAsync();

      var result = new List<AwardWithWinnerArtworkDto>();
      foreach (var award in awards) {
        var item = _mapper.Map<AwardWithWinnerArtworkDto>(award);

        if (award.FirstPlace !=null && award.FirstPlace.NomineeId == nominee.Id) {
          item.FirstPlace = _mapper.Map<ArtworkWithStatusDto>(award.FirstPlace);
        }

        if (award.SecondPlace != null &&  award.SecondPlace.NomineeId == nominee.Id) {
          item.SecondPlace = _mapper.Map<ArtworkWithStatusDto>(award.SecondPlace);
        }

        result.Add(item);
      }

      return Ok(result);
    }


    [HttpGet("payments")]
    public async Task<IActionResult> Payments([FromServices] IAppUnitOfWork db) {
      var nominee = await _userResolver.CurrentUserAsync();
      var artworks = db.ArtworkPayments
        .Where(a => a.Artwork.NomineeId == nominee.Id)
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

      var systemOption = (await db.SystemOptions.FirstOrDefaultAsync());
      if (systemOption != null && systemOption.AllJudgeFinished) {
        throw new ApiException(ApiErrorType.JudgeFinished, "judge completed");
      }

      var nominee = await _userResolver.CurrentUserAsync();
      var award = await db.Awards.FindAsync(dto.AwardId);
      if (award == null) {
        throw new ApiException(ApiErrorType.BadRequest, "Award is required");
      }


      var artwork = _mapper.Map<Artwork>(dto);
      artwork.NomineeId = nominee.Id;
      //all artworks cannot upload files until payment approved
      artwork.AllowFileUpload = false;

      await db.Artworks.AddAsync(artwork);

      if (award.AwardType == AwardType.Person) {
        artwork.Resume = (await SaveResume(fileManager, artwork.Id, dto)) ?? S3File.FromKeyAndUrl("", "");
        if (!string.IsNullOrEmpty(dto.YourRoleId) && (await db.ArtworkSubjects.FirstOrDefaultAsync(a => a.Id == dto.YourRoleId) != null)) {
          artwork.YourRoleId = dto.YourRoleId;
        }

        artwork.Poster = S3File.FromKeyAndUrl("", "");
        artwork.Cover = S3File.FromKeyAndUrl("", "");

      } else {
        artwork.Resume = S3File.FromKeyAndUrl("", "");

        artwork.Poster = (await SaveArtworkPoster(fileManager, artwork.Id, dto)) ?? S3File.FromKeyAndUrl("", "");
        artwork.Cover = (await SaveArtworkCoverImage(fileManager, artwork.Id, dto)) ?? S3File.FromKeyAndUrl("", "");
      }

      // artwork.Payment = await SaveUserPaymentAsync(fileManager, db, award, artwork.Id, dto);
      artwork.File1 = (await SaveArtworkAttachmentFile(fileManager, artwork.Id, dto.File1, dto.File1FileName, "File1")) ?? S3File.FromKeyAndUrl("", "");
      artwork.File2 = (await SaveArtworkAttachmentFile(fileManager, artwork.Id, dto.File2, dto.File2FileName, "File2")) ?? S3File.FromKeyAndUrl("", "");
      artwork.File3 = (await SaveArtworkAttachmentFile(fileManager, artwork.Id, dto.File3, dto.File3FileName, "File3")) ?? S3File.FromKeyAndUrl("", "");

      return Ok(_mapper.Map<ArtworkViewWithFilesDto>(artwork));
    }

    private async Task<S3File> SaveArtworkPoster(IS3FileManager fileManager, string artworkId, SubmitArtworkWithDetails dto) {
      if (!string.IsNullOrEmpty(dto.PosterFileName) && dto.Poster != null && dto.Poster.Length > 0) {
        var posterFileKey = fileManager.GenerateFileKeyForResource(
          ResourceType.ArtWork,
          artworkId, $"{artworkId}_poster" + dto.PosterFileName.GetFileExt());
        return S3File.FromKeyAndUrl(posterFileKey, await fileManager.UploadFileAsync(dto.Poster, posterFileKey));
      }
      return null;
    }

    private async Task<S3File> SaveResume(IS3FileManager fileManager,
     string artworkId, SubmitArtworkWithDetails dto) {
      if (!string.IsNullOrEmpty(dto.ResumeFileName) && dto.Resume != null && dto.Resume.Length > 0) {
        var resumeFileKey = fileManager.GenerateFileKeyForResource(
          ResourceType.ArtWork,
          artworkId, $"{artworkId}_resume" + dto.ResumeFileName.GetFileExt());
        return S3File.FromKeyAndUrl(resumeFileKey, await fileManager.UploadFileAsync(dto.Resume, resumeFileKey));
      }
      return null;
    }

    private async Task<S3File> SaveArtworkAttachmentFile(IS3FileManager fileManager, string artworkId,
     byte[] file, string fileName, string fileBusinessName) {
      if (!string.IsNullOrEmpty(fileName) && file != null && file.Length > 0) {
        var fileKey = fileManager.GenerateFileKeyForResource(
          ResourceType.ArtWork,
          artworkId, $"{artworkId}_{fileBusinessName}" + fileName.GetFileExt());
        return S3File.FromKeyAndUrl(fileKey, await fileManager.UploadFileAsync(file, fileKey));
      }
      return null;
    }

    private async Task<S3File> SaveArtworkCoverImage(IS3FileManager fileManager, string artworkId, SubmitArtworkWithDetails dto) {
      if (!string.IsNullOrEmpty(dto.CoverImageFileName) && dto.CoverImage != null && dto.CoverImage.Length > 0) {
        var coverFileKey = fileManager.GenerateFileKeyForResource(
          ResourceType.ArtWork,
          artworkId, $"{artworkId}_cover" + dto.CoverImageFileName.GetFileExt());
        return S3File.FromKeyAndUrl(coverFileKey, await fileManager.UploadFileAsync(dto.CoverImage, coverFileKey));
      }
      return null;
    }

    private async Task<ArtworkPayment> SaveUserPaymentAsync(IS3FileManager fileManager,
    IAppUnitOfWork db, Award award,
    string artworkId, SubmitArtworkWithDetails dto) {
      // var payment = new ArtworkPayment();
      // payment.ArtworkId = artworkId;
      // payment.Amount = award.ArtworkFee;

      // payment.IsOffline = true;
      // payment.PaymentStatus = Models.Entities.PaymentStatus.Waiting;
      // payment.PaymentDate = DateTimeOffset.Now.ToUnixTimeSeconds();

      // await db.ArtworkPayments.AddAsync(payment);

      // var receiptFileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWrokPayment, artworkId, $"{payment.Id}_receipt" + dto.Payment.ReceiptFileName.GetFileExt());
      // payment.Receipt = S3File.FromKeyAndUrl(receiptFileKey, await fileManager.UploadFileAsync(dto.Payment.Receipt, receiptFileKey));
      // payment.Receipt = payment.Receipt ?? S3File.FromKeyAndUrl("", "");
      // return payment;
      return null;
    }


    [HttpPut("artwork/{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateArtwork(
      [FromRoute] string id,
      [FromBody] UpdateArtworkWithDetails dto,
      [FromServices] IAppUnitOfWork db) {

      var nominee = await _userResolver.CurrentUserAsync();
      var artwork = await db.Artworks
        .Include(a => a.Award)
        // .Include(a => a.Payment)
        .Include(a => a.MediaFiles)
        .AsNoTracking()
        .FirstOrDefaultAsync(a => a.Id == id);

      if (artwork.NomineeId != nominee.Id) {
        throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't belong to you");
      }

      if (artwork.UploadComplete) {
        throw new ApiException(ApiErrorType.BadRequest, "Artwork has been submitted to judge");
      }

      var updatedArtwork = _mapper.Map<UpdateArtworkWithDetails, Artwork>(dto, artwork);
      updatedArtwork.Id = id;
      db.Artworks.Update(updatedArtwork);
      return Ok(_mapper.Map<ArtworkViewWithFilesDto>(updatedArtwork));
    }

    [HttpDelete("file/{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteFile(
          [FromRoute] string id,
          [FromServices] IAppUnitOfWork db,
          [FromServices] IS3FileManager fileManager
          ) {

      var nominee = await _userResolver.CurrentUserAsync();
      var file = db.MediaFiles
                    .Include(a => a.ArtWork)
                    .FirstOrDefault(a => a.Id == id);

      if (file == null) {
        throw new ApiException(ApiErrorType.NotFound, "file is not found");
      }

      if (file.ArtWork.NomineeId != nominee.Id) {
        throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't belong to you");
      }

      if (file.ArtWork.UploadComplete) {
        throw new ApiException(ApiErrorType.BadRequest, "Files upload complete, waiting for artwork review");
      }

      if (!file.ArtWork.AllowFileUpload) {
        throw new ApiException(ApiErrorType.BadRequest, "File upload are not allowed");
      }

      db.MediaFiles.Remove(file);
      await fileManager.DeleteFileAsync(file.File.FileKey);

      return Ok(file.Id);
    }


    [HttpPut("artwork/{id}/trailer")]
    [RequestSizeLimit(1024 * 1024 * 30)]
    public async Task<IActionResult> UpdateTrailer([FromRoute] string id,
        [FromServices] IAppUnitOfWork db,
        [FromServices] IS3FileManager fileManager,
        FileChunkDto dto) {
      try {
        var nominee = await _userResolver.CurrentUserAsync();
        var artwork = await db.Artworks.FindAsync(id);
        if (artwork == null) {
          throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't exist");
        }

        if (artwork.NomineeId != nominee.Id) {
          throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't belong to you");
        }

        if (artwork.UploadComplete) {
          throw new ApiException(ApiErrorType.BadRequest, "Artwork has been submitted to judge");
        }

        var imageExtensions = new[] { ".jpg", ".png" };

        var tempDir = fileManager.GetTempDirectoryForResource(ResourceType.ArtWork, id);
        var result = await fileManager.UploadChunk(tempDir, dto);
        if (!string.IsNullOrEmpty(result.FinalUrl)) {
          var isPoster = imageExtensions.Any(a => dto.FileName.Contains(a));
          var fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, artwork.Id, isPoster ? $"{artwork.Id}_trailer_poster" : $"{artwork.Id}_trailer" + dto.FileName.GetFileExt());

          var fileUrl = await fileManager.MoveObjectAsync(result.FileKey, fileKey);
          //if file is image the it will be a poster 

          if (isPoster) {
            artwork.Poster = S3File.FromKeyAndUrl(fileKey, fileUrl);
          } else {
            // else it will the trailer video
            artwork.Trailer = S3File.FromKeyAndUrl(fileKey, fileUrl);
          }
          //move file to final directory of the artwork files

          db.Artworks.Update(artwork);
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
      var artwork = await db.Artworks.FindAsync(id);
      if (artwork == null) {
        throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't exist");
      }
      if (artwork.NomineeId != nominee.Id) {
        throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't belong to you");
      }

      if (artwork.UploadComplete) {
        throw new ApiException(ApiErrorType.BadRequest, "Artwork has been submitted to judge");
      }

      var coverFileKey = fileManager.GenerateFileKeyForResource(
        ResourceType.ArtWork,
        artwork.Id, $"{artwork.Id}_cover" + dto.FileName.GetFileExt());
      var fileUrl = await fileManager.UploadFileAsync(dto.Chunk, coverFileKey);
      artwork.Cover = S3File.FromKeyAndUrl(coverFileKey, fileUrl);
      db.Artworks.Update(artwork);
      return Ok(fileUrl);
    }

    [HttpPut("artwork/{id}/poster")]
    [RequestSizeLimit(1024 * 1024 * 30)]
    public async Task<IActionResult> updatePosterImage(
        [FromServices] IS3FileManager fileManager,
        [FromServices] IAppUnitOfWork db,
        [FromRoute] string id,
        FileChunkDto dto
        ) {
      var nominee = await _userResolver.CurrentUserAsync();
      var artwork = await db.Artworks.FindAsync(id);
      if (artwork == null) {
        throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't exist");
      }

      if (artwork.NomineeId != nominee.Id) {
        throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't belong to you");
      }

      if (artwork.UploadComplete) {
        throw new ApiException(ApiErrorType.BadRequest, "Artwork has been submitted to judge");
      }

      var posterFileKey = fileManager.GenerateFileKeyForResource(
        ResourceType.ArtWork,
        artwork.Id, $"{artwork.Id}_poster" + dto.FileName.GetFileExt());
      var fileUrl = await fileManager.UploadFileAsync(dto.Chunk, posterFileKey);
      artwork.Poster = S3File.FromKeyAndUrl(posterFileKey, fileUrl);
      db.Artworks.Update(artwork);
      return Ok(fileUrl);
    }


    [HttpGet("artwork/{id}")]
    public async Task<IActionResult> GetArtowkrById([FromRoute] string id, [FromServices] IAppUnitOfWork db) {
      var nominee = await _userResolver.CurrentUserAsync();
      var artwork = await db.Artworks
        .Include(a => a.Award)
        // .Include(a => a.Payment)
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
        var artwork = await db.Artworks.FindAsync(id);
        if (artwork == null) {
          throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't exist");
        }

        if (artwork.NomineeId != nominee.Id) {
          throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't belong to you");
        }

        if (artwork.UploadComplete) {
          throw new ApiException(ApiErrorType.BadRequest, "Files upload complete, waiting for artwork review");
        }

        if (!artwork.AllowFileUpload) {
          throw new ApiException(ApiErrorType.BadRequest, "File upload are not allowed");
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
            File = S3File.FromKeyAndUrl(fileKey, fileUrl)
          };

          if ((await db.MediaFiles.FirstOrDefaultAsync(a => a.ArtWorkId == artwork.Id && a.File.FileKey == fileKey)) == null) {
            await db.MediaFiles.AddAsync(mediaFile);
          }
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
      var artwork = await db.Artworks
                            .Include(a => a.MediaFiles)
                            .FirstOrDefaultAsync(a => a.Id == id);

      if (artwork.NomineeId != nominee.Id) {
        throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't belong to you");
      }

      return Ok(_mapper.Map<ArtworkViewWithFilesDto>(artwork));
    }

    [HttpPut("artwork/{id}/publish")]
    public async Task<IActionResult> PublishArtwork(
        [FromBody] PublishArtwork publishArtworkDto,
        [FromRoute] string id,
        [FromServices] IAppUnitOfWork db) {

      var nominee = await _userResolver.CurrentUserAsync();
      var artwork = await db.Artworks
          .FirstOrDefaultAsync(a => a.Id == id);

      if (artwork.NomineeId != nominee.Id) {
        throw new ApiException(ApiErrorType.NotFound, "Artwork doesn't belong to you");
      }

      if (artwork.UploadComplete) {
        throw new ApiException(ApiErrorType.BadRequest, "Artwork has been submitted to judge");
      }

      artwork.UploadComplete = publishArtworkDto.Publish;
      db.Artworks.Update(artwork);

      return Ok();
    }

  }
}