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

namespace MIA.Api
{
    public abstract class ArtworkBasiData
    {
        public LocalizedData Title { get; set; }
        public string About { get; set; }
        public string Story { get; set; }
        public string Directors { get; set; }
        public string Producers { get; set; }
        public string Writers { get; set; }
        public string Crew { get; set; }
        public string Stars { get; set; }
        public string Year { get; set; }
        public string Country { get; set; }

    }
    public class ArtworkViewDto : ArtworkBasiData
    {
        public string Id { get; set; }
        public string PosterUrl { get; set; }
        public string TrailerUrl { get; set; }
        public string TrailerPosterUrl { get; set; }
        public string CoverImageUrl { get; set; }
        public bool CanUploadFiles { get; set; }
    }
    public class ArtworkViewWithFilesDto : ArtworkViewDto
    {
        public ArtworkFileDto[] Files { get; set; }
        public PaymentWithStatusDto Payment { get; set; }
    }

    public class ArtworkFileDto
    {
        public string FileUrl { get; set; }
        public int Size { get; set; }
    }

    public class AwardWithStatusDto
    {
        public string Id { get; set; }
        public LocalizedData Name { get; set; }
        public string TrophyUrl { get; set; }
        public bool Winner { get; set; }
    }

    public class ArtworkWithStatusDto
    {
        public string Id { get; set; }
        public string PosterUrl { get; set; }
        public string TrailerUrl { get; set; }
        public string CoverImageUrl { get; set; }
        public bool UploadComplete { get; set; }
        public bool AllowFileUpload { get; set; }
        public LocalizedData Title { get; set; }
    }

    public class PaymentWithStatusDto
    {
        public string Id { get; set; }
        public decimal Amount { get; set; }
        public string Date { get; set; }
        public bool IsOffline { get; set; }
        public string Status { get; set; }
    }

    public class SubmitArtworkWithDetails : ArtworkBasiData
    {
        public LocalizedData Title { get; set; }
        public string PosterFileName { get; set; }
        public string CoverImageFileName { get; set; }
        public byte[] Poster { get; set; }
        public byte[] CoverImage { get; set; }

        public string AwardId { get; set; }
        public PaymentDto Payment { get; set; }
    }

    public class PaymentDto
    {
        public string CardHolderName { get; set; }
        public string CardType { get; set; }
        public string Last4Digit { get; set; }
        public string CardToken { get; set; }
        public string Currency { get; set; }
        public string SessionId { get; set; }
        public string Type { get; set; }

        public string PaymentMethod { get; set; }
        public string ReceiptDate { get; set; }
        public string ReceiptNumber { get; set; }
        public decimal ReceiptAmount { get; set; }
        public string ReceiptFileName { get; set; }
        public byte[] Receipt { get; set; }

        public bool IsOffline => PaymentMethod.ToLower() == "offline";
    }

#if (Versioning)
    [ApiVersion("1.0")]
#endif
    [Route("api/members")]
    //[Authorize(Roles = "nominee")]
    public class MembersController : BaseApiController<MembersController>
    {
        private readonly IUserResolver _userResolver;

        public MembersController(IMapper mapper,
          [FromServices] ILogger<MembersController> logger,
          [FromServices] IUserResolver userResolver
          ) : base(logger, mapper)
        {
            this._userResolver = userResolver;
        }


        [HttpGet("awards")]
        [Authorize]
        public async Task<IActionResult> Awards([FromServices] IAppUnitOfWork db)
        {
            var nominee = await _userResolver.CurrentUserAsync();
            var artworks = db.ArtWorks
              .Include(a => a.Award)
              .Where(a => a.NomineeId == nominee.Id)
              .Select(a => new AwardWithStatusDto
              {
                  Id = a.AwardId,
                  TrophyUrl = a.Award.TrophyImageUrl,
                  //TODO: this need to be calculated or a flag
                  Winner = false
              })
              .ToArray();

            return Ok(artworks);
        }

        [HttpGet("artworks")]
        public async Task<IActionResult> Artworks([FromServices] IAppUnitOfWork db)
        {
            var nominee = await _userResolver.CurrentUserAsync();
            var artworks = db.ArtWorks
                .Include(a=>a.Award)
              .Where(a => a.NomineeId == nominee.Id)
              .ProjectTo<ArtworkWithStatusDto>(_mapper.ConfigurationProvider)
              .ToArray();

            return Ok(artworks);
        }


        [HttpGet("myawards")]
        public async Task<IActionResult> MyAwards([FromServices] IAppUnitOfWork db)
        {
            var nominee = await _userResolver.CurrentUserAsync();

            var awards = await db.Awards
                .Include(a => a.FirstPlace)
                .Include(a => a.SecondPlace)
                .Where(a => a.SecondPlace.NomineeId == nominee.Id || a.FirstPlace.NomineeId == nominee.Id)
                .ProjectTo<AwardDto>(_mapper.ConfigurationProvider)
                .ToArrayAsync();


            return Ok(awards);
        }


        [HttpGet("payments")]
        public async Task<IActionResult> Payments([FromServices] IAppUnitOfWork db)
        {
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
          [FromServices] IS3FileManager fileManager)
        {

            //TODO: uncomment
            //var nominee = await _userResolver.CurrentUserAsync();
            var award = await db.Awards.FindAsync(dto.AwardId);

            PaymentStatus paymentResponse = null;
            if (!dto.Payment.IsOffline)
            {
                try
                {
                    if (string.IsNullOrEmpty(dto.Payment.SessionId))
                    {
                        var paymentDto = _mapper.Map<PaymentRequest>(dto.Payment);
                        // 10.5$ => 1050 no decimal points (multiply by 100)
                        paymentDto.Amount = (int)(award.ArtworkFee * 100);
                        _logger.LogInformation("Request payment start for:" + paymentDto.Amount);
                        paymentResponse = paymentGateway.RequestPayment(paymentDto).Result;
                        if (paymentResponse != null && paymentResponse.IsPending)
                        {
                            return Ok(new
                            {
                                Pending = true,
                                ThreeDsUrl = paymentResponse.ThreeDsUrl
                            });
                        }
                        else if (paymentResponse != null && paymentResponse.IsApproved)
                        {

                            //TODO: uncomment
                            //_logger.LogInformation($"user payment success {nominee.Id}/{nominee.UserName} -> Payment Id: {paymentResponse.PaymentId}");

                        }
                        else if (paymentResponse == null || !paymentResponse.IsApproved)
                        {
                            throw new ApiException(ApiErrorType.UserPaymentFailed, $"Payment approved: {paymentResponse?.IsApproved}");
                        }
                    }
                    else
                    {
                        var paymentDetails = paymentGateway.GetPaymentDetails(dto.Payment.SessionId).Result;
                        if (paymentDetails == null || !paymentDetails.Approved)
                        {
                            throw new ApiException(ApiErrorType.PaymentNotApproved, $"Payment approved: {paymentDetails?.Approved}");
                        }
                        else
                        {
                            paymentResponse = new PaymentStatus
                            {
                                PaymentId = paymentDetails.Id,
                                Status = paymentDetails.Status,
                            };
                        }
                    }
                    _logger.LogInformation("Request payment end");
                }
                catch (Exception exPayment)
                {
                    _logger.LogError(exPayment, "user payment failed");
                    throw new ApiException(ApiErrorType.UserPaymentFailed, exPayment.Message);
                }
            }


            var artwork = _mapper.Map<ArtWork>(dto);
            //TODO: uncomment
            //artwork.NomineeId = nominee.Id;
            artwork.AllowFileUpload = !dto.Payment.IsOffline;

            await db.ArtWorks.AddAsync(artwork);

            //save payment
            var artWorkPayment = await SaveUserPaymentAsync(fileManager, db, award, artwork.Id, dto, paymentResponse);

            if (!string.IsNullOrEmpty(dto.PosterFileName) && dto.Poster != null && dto.Poster.Length > 0)
            {
                var posterFileKey = fileManager.GenerateFileKeyForResource(
                  ResourceType.ArtWork,
                  artwork.Id, $"{artwork.Id}_poster." + dto.PosterFileName);
                artwork.PosterId = posterFileKey;
                artwork.PosterUrl = await fileManager.UploadFileAsync(dto.Poster, posterFileKey);
            }

            if (!string.IsNullOrEmpty(dto.CoverImageFileName) && dto.CoverImage != null && dto.CoverImage.Length > 0)
            {
                var coverFileKey = fileManager.GenerateFileKeyForResource(
                  ResourceType.ArtWork,
                  artwork.Id, $"{artwork.Id}_cover." + dto.CoverImageFileName);
                artwork.CoverId = coverFileKey;
                artwork.CoverUrl = await fileManager.UploadFileAsync(dto.CoverImage, coverFileKey);
            }

            artwork.Payment = artWorkPayment;

            return Ok(_mapper.Map<ArtworkViewWithFilesDto>(artwork));
        }

        private async Task<ArtWorkPayment> SaveUserPaymentAsync(IS3FileManager fileManager, IAppUnitOfWork db, Award award, string artworkId, SubmitArtworkWithDetails dto, PaymentStatus paymentStatus)
        {
            var payment = new ArtWorkPayment();
            payment.ArtWorkId = artworkId;
            payment.Amount = award.ArtworkFee;
            payment.PaymentId = paymentStatus?.PaymentId;

            payment.IsOffline = dto.Payment.IsOffline;
            payment.PaymentStatus = dto.Payment.IsOffline ? Models.Entities.PaymentStatus.Waiting : Models.Entities.PaymentStatus.Confirmed;
            payment.PaymentDate = DateTimeOffset.Now.ToUnixTimeSeconds();

            await db.ArtWorkPayments.AddAsync(payment);

            if (dto.Payment.IsOffline)
            {
                var receiptFileKey = fileManager.GenerateFileKeyForResource(ResourceType.Docs, payment.Id, $"{payment.Id}_receipt." + dto.Payment.ReceiptFileName);
                payment.ReceiptId = receiptFileKey;
                payment.ReceiptUrl = await fileManager.UploadFileAsync(dto.Payment.Receipt, receiptFileKey);
            }

            return payment;
        }


        [HttpPut("artwork/{id}")]
        public async Task<IActionResult> UpdateArtwork(
          [FromRoute] string id,
          [FromBody] SubmitArtworkWithDetails dto,
          [FromServices] IAppUnitOfWork db)
        {

            //TODO: uncomment
            //var nominee = await _userResolver.CurrentUserAsync();
            var artwork = await db.ArtWorks.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id);
            artwork = _mapper.Map<ArtWork>(dto);
            artwork.Id = id;
            //if (artwork.NomineeId != nominee.Id)
            //  return NotFound404("Artwork doesn't belong to you");

            db.ArtWorks.Update(artwork);
            return Ok();
        }


        [HttpPut("artwork/{id}/trailer")]
        [RequestSizeLimit(1024 * 1024 * 30)]
        public async Task<IActionResult> UpdateTrailer([FromRoute] string id,
            [FromServices] IAppUnitOfWork db,
            [FromServices] IS3FileManager fileManager,
            FileChunkDto dto)
        {
            //var trailerFileKey = fileManager.GenerateFileKeyForResource(
            //  ResourceType.Artwork,
            //  artwork.Id, $"{artwork.Id}_trailer." + dto.Trailer.GetFileExt());
            //artwork.TrailerId = trailerFileKey;
            //artwork.TrailerUrl = await fileManager.UploadFileAsync(dto.Trailer.OpenReadStream(), trailerFileKey);
            try
            {
                //TODO: uncomment
                var nominee = await _userResolver.CurrentUserAsync();
                var artwork = await db.ArtWorks.FindAsync(id);
                if (artwork == null)
                {
                    return NotFound404("Artwork doesn't exist");
                }
                if (artwork.NomineeId != nominee.Id)
                {
                    return NotFound404("Artwork doesn't belong to you");
                }

                var imageExtensions = new[] { ".jpg", ".png" };

                var tempDir = fileManager.GetTempDirectoryForResource(ResourceType.ArtWork, id);
                var result = await fileManager.UploadChunk(tempDir, dto);
                if (!string.IsNullOrEmpty(result.FinalUrl))
                {
                    var isPoster = imageExtensions.Any(a => dto.FileName.Contains(a));
                    var fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, artwork.Id,isPoster? $"{artwork.Id}_trailer_poster." : $"{artwork.Id}_trailer." + dto.FileName);

                    var fileUrl = await fileManager.MoveObjectAsync(result.FileKey, fileKey);
                    //if file is image the it will be a poster 
                    
                    if (isPoster)
                    {
                        artwork.TrailerPosterId = fileKey;
                        artwork.TrailerPosterUrl = fileUrl;
                    }
                    // else it will the trailer video
                    else
                    {
                        artwork.TrailerId = fileKey;
                        artwork.TrailerUrl = fileUrl;
                    }
                    //move file to final directory of the artwork files

                    db.ArtWorks.Update(artwork);
                    return Ok(fileUrl);
                }
                else
                {
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to upload file");
                throw new ApiException(ApiErrorType.FailedToUploadChunkedFile, $"{ex.Message}");
            }
        }

        [HttpPut("artwork/{id}/cover")]
        public async Task<IActionResult> UpdateCoverImage()
        {
            //var coverFileKey = fileManager.GenerateFileKeyForResource(
            //  ResourceType.Artwork,
            //  artwork.Id, $"{artwork.Id}_cover." + dto.CoverImage.GetFileExt());
            //artwork.CoverId = coverFileKey;
            //artwork.CoverUrl = await fileManager.UploadFileAsync(dto.CoverImage.OpenReadStream(), coverFileKey);


            return Ok();
        }


        [HttpGet("artwork/{id}")]
        public async Task<IActionResult> GetArtowkrById([FromRoute] string id, [FromServices] IAppUnitOfWork db)
        {

            //TODO: uncomment
            //var nominee = await _userResolver.CurrentUserAsync();
            var artwork = await db.ArtWorks
              .Include(a => a.Payment)
              .Include(a => a.MediaFiles)
              .FirstOrDefaultAsync(a => a.Id == id);
            //if (artwork.NomineeId != nominee.Id)
            //  return NotFound404("Artwork doesn't belong to you");

            return Ok(_mapper.Map<ArtworkViewWithFilesDto>(artwork));
        }

        [HttpPost("artwork/{id}/files")]
        [RequestSizeLimit(1024 * 1024 * 30)]
        public async Task<IActionResult> UploadArtworkFiles(
          [FromRoute] string id,
          [FromServices] IAppUnitOfWork db,
          [FromServices] IS3FileManager fileManager,
          FileChunkDto dto)
        {
            try
            {
                //TODO: uncomment
                var nominee = await _userResolver.CurrentUserAsync();
                var artwork = await db.ArtWorks.FindAsync(id);
                if (artwork == null)
                {
                    return NotFound404("Artwork doesn't exist");
                }
                if (artwork.NomineeId != nominee.Id)
                {
                    return NotFound404("Artwork doesn't belong to you");
                }
                if (artwork.UploadComplete)
                {
                    return ValidationError(HttpStatusCode.BadRequest, "Files upload complete, waiting for artwork review");
                }

                var tempDir = fileManager.GetTempDirectoryForResource(ResourceType.ArtWork, id);
                var result = await fileManager.UploadChunk(tempDir, dto);
                if (!string.IsNullOrEmpty(result.FinalUrl))
                {
                    //move file to final directory of the artwork files
                    var fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, id, dto.FileName);
                    var fileUrl = await fileManager.MoveObjectAsync(result.FileKey, fileKey);

                    var mediaFile = new MediaFile
                    {
                        //TODO: uncomment
                        ArtWorkId = artwork.Id,
                        UploadDate = DateTime.Now.ToUnixTimeSeconds(),
                        FileKey = fileKey,
                        FileUrl = fileUrl
                    };

                    //TODO: uncomment
                    await db.MediaFiles.AddAsync(mediaFile);
                    var _artwork = await db.ArtWorks.Include(a => a.MediaFiles).FirstOrDefaultAsync(a => a.Id == id);
                    if (_artwork.MediaFiles.Any() && _artwork.FileCount <= _artwork.MediaFiles.Count)
                    {
                        _artwork.UploadComplete = true;
                        db.ArtWorks.Update(_artwork);
                    }
                    return Ok(fileKey);
                }
                else
                {
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to upload file");
                throw new ApiException(ApiErrorType.FailedToUploadChunkedFile, $"{ex.Message}");
            }
        }

        [HttpGet("artwork/{id}/files")]
        public async Task<IActionResult> ArtworkFiles(
          [FromRoute] string id,
          [FromServices] IAppUnitOfWork db)
        {

            var nominee = await _userResolver.CurrentUserAsync();
            var artwork = await db.ArtWorks
                                  .Include(a => a.MediaFiles)
                                  .FirstOrDefaultAsync(a => a.Id == id);

            if (artwork.NomineeId != nominee.Id)
                return NotFound404("Artwork doesn't belong to you");


            return Ok(_mapper.Map<ArtworkViewWithFilesDto>(artwork));
        }

    }
}