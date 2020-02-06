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
using Microsoft.Extensions.Options;
using MIA.Infrastructure;
using MIA.Infrastructure.Options;
using Microsoft.EntityFrameworkCore;

namespace MIA.Api {

  public class ArtworkViewDto {
    public string Id { get; set; }
    public LocalizedData Title { get; set; }
    public string PosterUrl { get; set; }
    public string TrailerUrl { get; set; }
    public string CoverImageUrl { get; set; }
    public string About { get; set; }
    public string Story { get; set; }
    public string Director { get; set; }
    public string Production { get; set; }
    public string Writer { get; set; }
    public string Crew { get; set; }
  }
  public class ArtworkViewWithFilesDto: ArtworkViewDto {
    public ArtworkFileDto[] Files { get; set; }
  }

  public class ArtworkFileDto {
    public string FileUrl { get; set; }
    public int Size { get; set; }
  }

  public class ArtworkWithStatusDto {
    public string Id { get; set; }
    public LocalizedData Title { get; set; }
    public string PosterUrl { get; set; }
    public string TrailerUrl { get; set; }
    public string CoverImageUrl { get; set; }
    public string Status { get; set; }
  }

  public class PaymentWithStatusDto {
    public string Id { get; set; }
    public decimal Amount { get; set; }
    public string Date { get; set; }
    public bool IsOffline { get; set; }
    public string Status { get; set; }
  }

  public class ArtworkDetailsDto : ArtworkWithStatusDto {
    public string About { get; set; }
    public string Story { get; set; }
    public string Director { get; set; }
    public string Production { get; set; }
    public string Writer { get; set; }
    public string Crew { get; set; }
  }

  public class SubmitArtworkWithDetails {
    public LocalizedData Title { get; set; }
    public string About { get; set; }
    public string Story { get; set; }
    public string Director { get; set; }
    public string Production { get; set; }
    public string Writer { get; set; }
    public string Crew { get; set; }
    public IFormFile Poster { get; set; }
    public IFormFile Trailer { get; set; }
    public IFormFile CoverImage { get; set; }

    public string AwardId { get; set; }
    public PaymentDto Payment { get; set; }
  }

  public class PaymentDto {
    public string CardHolderName { get; set; }
    public string CardType { get; set; }
    public string Last4Digit { get; set; }
    public string CardToken { get; set; }
    public string Currency { get; set; }
    public string BookingToken { get; set; }
    public string SessionId { get; set; }
    public string Type { get; set; }
    public bool IsOffline { get; set; }
    public string ReceiptNumber { get; set; }
    public decimal Amount { get; set; }
    public IFormFile ReceiptFile { get; set; }
  }

#if (Versioning)
  [ApiVersion("1.0")]
#endif
  [Route("api/artworks")]
  [Authorize(Roles = "nominee")]
  public class ArtworksController : BaseApiController<ArtworksController> {
    private readonly IUserResolver _userResolver;

    public ArtworksController(IMapper mapper,
      [FromServices] ILogger<ArtworksController> logger,
      [FromServices] IUserResolver userResolver
      ) : base(logger, mapper) {
      this._userResolver = userResolver;
    }


    [HttpGet("")]
    public async Task<IActionResult> Artworks([FromServices] IAppUnitOfWork db) {
      var nominee = await _userResolver.CurrentUserAsync();
      var artworks = db.ArtWorks
        .Where(a => a.NomineeId == nominee.Id)
        .ProjectTo<ArtworkWithStatusDto>(_mapper.ConfigurationProvider)
        .ToArray();

      return Ok(artworks);
    }


    [HttpPost("payments")]
    public async Task<IActionResult> Payments([FromServices] IAppUnitOfWork db) {
      var nominee = await _userResolver.CurrentUserAsync();
      var artworks = db.ArtWorkPayments
        .Where(a => a.ArtWork.NomineeId == nominee.Id)
        .ProjectTo<PaymentWithStatusDto>(_mapper.ConfigurationProvider)
        .ToArray();

      return Ok(artworks);
    }


    [HttpPost("")]
    public async Task<IActionResult> SubmitArtwork(
      [FromForm] SubmitArtworkWithDetails dto,
      [FromServices] IPaymentGateway paymentGateway,
      [FromServices] IAppUnitOfWork db,
      [FromServices] IOptions<UploadLimits> limitOptions,
      [FromServices] IS3FileManager fileManager) {

      var nominee = await _userResolver.CurrentUserAsync();
      var award = await db.Awards.FindAsync(dto.AwardId);

      PaymentStatus paymentResponse = null;
      if (!dto.Payment.IsOffline) {
        try {
          if (string.IsNullOrEmpty(dto.Payment.SessionId)) {
            var paymentDto = _mapper.Map<PaymentRequest>(dto.Payment);
            // 10.5$ => 1050 no decimal points (multiply by 100)
            paymentDto.Amount = (int)(award.ArtworkFee * 100);
            _logger.LogInformation("Request payment start for:" + paymentDto.Amount);
            paymentResponse = paymentGateway.RequestPayment(paymentDto).Result;
            if (paymentResponse != null && paymentResponse.IsPending) {
              return Ok(new {
                Pending = true,
                ThreeDsUrl = paymentResponse.ThreeDsUrl
              });
            } else if (paymentResponse != null && paymentResponse.IsApproved) {
              _logger.LogInformation($"user payment success {nominee.Id}/{nominee.UserName} -> Payment Id: {paymentResponse.PaymentId}");
            } else if (paymentResponse == null || !paymentResponse.IsApproved) {
              throw new ApiException(ApiErrorType.UserPaymentFailed, $"Payment approved: {paymentResponse?.IsApproved}");
            }
          } else {
            var paymentDetails = paymentGateway.GetPaymentDetails(dto.Payment.SessionId).Result;
            if (paymentDetails == null || !paymentDetails.Approved) {
              throw new ApiException(ApiErrorType.PaymentNotApproved, $"Payment approved: {paymentDetails?.Approved}");
            } else {
              paymentResponse = new PaymentStatus {
                PaymentId = paymentDetails.Id,
                Status = paymentDetails.Status,
              };
            }
          }
          _logger.LogInformation("Request payment end");
        } catch (Exception exPayment) {
          _logger.LogError(exPayment, "user payment failed");
          throw new ApiException(ApiErrorType.UserPaymentFailed, exPayment.Message);
        }
      }

      //save payment
      await SaveUserPaymentAsync(fileManager, db, award, dto, paymentResponse);

      var artwork = _mapper.Map<ArtWork>(dto);
      artwork.NomineeId = nominee.Id;
      artwork.AllowFileUpload = !dto.Payment.IsOffline;

      await db.ArtWorks.AddAsync(artwork);

      var posterFileKey = fileManager.GenerateFileKeyForResource(
                                    ResourceType.Artwork,
                                    artwork.Id, $"{artwork.Id}_poster." + dto.Poster.GetFileExt());
      artwork.PosterId = posterFileKey;
      artwork.PosterUrl = await fileManager.UploadFileAsync(dto.Poster.OpenReadStream(), posterFileKey);

      var trailerFileKey = fileManager.GenerateFileKeyForResource(
                                    ResourceType.Artwork,
                                    artwork.Id, $"{artwork.Id}_trailer." + dto.Trailer.GetFileExt());
      artwork.TrailerId = trailerFileKey;
      artwork.TrailerUrl = await fileManager.UploadFileAsync(dto.Trailer.OpenReadStream(), trailerFileKey);

      var coverFileKey = fileManager.GenerateFileKeyForResource(
                                   ResourceType.Artwork,
                                   artwork.Id, $"{artwork.Id}_cover." + dto.CoverImage.GetFileExt());
      artwork.CoverId = coverFileKey;
      artwork.CoverUrl = await fileManager.UploadFileAsync(dto.CoverImage.OpenReadStream(), coverFileKey);

      db.ArtWorks.Update(artwork);

      return Ok(_mapper.Map<ArtworkViewDto>(artwork));
    }

    private async Task SaveUserPaymentAsync(IS3FileManager fileManager, IAppUnitOfWork db, Award award, SubmitArtworkWithDetails dto, PaymentStatus paymentStatus) {
      var payment = _mapper.Map<ArtWorkPayment>(dto.Payment);
      payment.Amount = award.ArtworkFee;
      payment.PaymentId = paymentStatus?.PaymentId;

      payment.PaymentStatus = dto.Payment.IsOffline ? Models.Entities.PaymentStatus.Waiting : Models.Entities.PaymentStatus.Confirmed;
      payment.PaymentDate = DateTimeOffset.Now.ToUnixTimeSeconds();

      await db.ArtWorkPayments.AddAsync(payment);

      if (dto.Payment.IsOffline) {
        var receiptFileKey = fileManager.GenerateFileKeyForResource(ResourceType.Docs, payment.Id, $"{payment.Id}_receipt." + dto.Payment.ReceiptFile.GetFileExt());
        payment.ReceiptId = receiptFileKey;
        payment.ReceiptUrl = await fileManager.UploadFileAsync(dto.Payment.ReceiptFile.OpenReadStream(), receiptFileKey);

        db.ArtWorkPayments.Update(payment);
      }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetArtowkrById([FromRoute] string id, [FromServices] IAppUnitOfWork db) {
      var nominee = await _userResolver.CurrentUserAsync();
      var artwork = await db.ArtWorks.FindAsync(id);
      if (artwork.NomineeId != nominee.Id)
        return NotFound404("Artwork doesn't belong to you");

      return Ok(_mapper.Map<ArtworkViewDto>(artwork));
    }

    [HttpPost("{id}/files")]
    public async Task<IActionResult> UploadArtworkFiles(
      [FromRoute] string id,
      [FromServices] IAppUnitOfWork db,
      [FromServices] IS3FileManager fileManager,
      FileChunkDto dto) {
      var nominee = await _userResolver.CurrentUserAsync();
      var artwork = await db.ArtWorks.FindAsync(id);
      if (artwork.NomineeId != nominee.Id)
        return NotFound404("Artwork doesn't belong to you");

      var tempDir = fileManager.GetTempDirectoryForResource(ResourceType.Artwork, id);
      var result = await fileManager.UploadChunk(tempDir, dto);
      if (!string.IsNullOrEmpty(result.FinalUrl)) {
        //move file to final directory of the artwork files
        var fileKey = fileManager.GenerateFileKeyForResource(ResourceType.Artwork, id, dto.FileName);
        await fileManager.MoveObjectAsync(result.FileKey, fileKey);
        return Ok(fileKey);
      } else {
        return Ok(result);
      }
    }

    [HttpGet("{id}/files")]
    public async Task<IActionResult> ArtworkFiles(
      [FromRoute] string id,
      [FromServices] IAppUnitOfWork db) {

      var nominee = await _userResolver.CurrentUserAsync();
      var artwork = await db.ArtWorks
                            .Include(a=>a.MediaFiles)
                            .FirstOrDefaultAsync(a=>a.Id == id);

      if (artwork.NomineeId != nominee.Id)
        return NotFound404("Artwork doesn't belong to you");


      return Ok(_mapper.Map<ArtworkViewWithFilesDto>(artwork));
    }

  }
}