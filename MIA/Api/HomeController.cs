using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MIA.ORMContext;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MIA.Api.Base;
using Z.EntityFramework.Plus;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.UI.Services;
using MIA.TemplateParser;
using System.Threading.Tasks;
using MIA.Exceptions;
using MIA.Infrastructure;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using MIA.Infrastructure.Options;
using MIA.Models.Entities;
using MIA.Payments;
using Newtonsoft.Json;
using X.PagedList;
using PaymentStatus = MIA.Payments.PaymentStatus;

namespace MIA.Api
{
#if Versioning
  [ApiVersion("1.0")]
#endif
  [Route("api/home")]
  public class HomeController : BaseApiController<HomeController>
  {
    private readonly IStringLocalizer<HomeController> _Locale;

    public HomeController(IMapper mapper, [FromServices] ILogger<HomeController> logger,
      IStringLocalizer<HomeController> _locale
      ) : base(logger, mapper)
    {
      this._Locale = _locale;
    }

    [HttpGet("metadata")]
    public async Task<IActionResult> Metadata([FromServices] IAppUnitOfWork db)
    {
      var subjects = await db.ContactUsSubjects
        .ProjectTo<LocalizedLookupDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

      var artworkCategories = await db.ArtworkCategories
        .ProjectTo<LocalizedLookupDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

      var artworkGenres = await db.ArtworkGenres
        .ProjectTo<LocalizedLookupDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

      var countries = await db.Countries
        .ProjectTo<LocalizedLookupDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

      var productionYears = await db.ProductionYears
        .ProjectTo<LocalizedLookupDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

      return Ok(new
      {
        ContactUsSubjects = subjects,
        Categories = artworkCategories,
        Genres = artworkGenres,
        Countries = countries,
        Years = productionYears,
      });
    }

    [HttpGet("awards")]
    public async Task<IActionResult> Awards([FromServices] IAppUnitOfWork db)
    {
      var result = await db.ArtworkAwards
                          .ProjectTo<AwardDto>(_mapper.ConfigurationProvider)
                          .ToListAsync();
      return Ok(result);
    }

    [HttpGet("main-album")]
    public async Task<IActionResult> MainAlbum([FromServices] IAppUnitOfWork db)
    {
      var result = await db.Albums
                        .Include(a => a.MediaItems)
                        .Where(a => a.MainGallery == true)
                        .ProjectTo<MainAlbumDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync();
      return Ok(result);
    }

    [HttpPost("recent-shows")]
    public async Task<IActionResult> RecentShows(
      [FromBody]RecentShowsSearchDto query,
      [FromServices] IAppUnitOfWork db)
    {
      var _result = db.ArtWorks
                    .Where(a => a.UploadComplete)
                    .AsQueryable();

      _result = _result.Where(a => string.IsNullOrEmpty(query.AwardId) || a.AwardId == query.AwardId);
      //_result = _result.Where(a => string.IsNullOrEmpty(query.CountryId) || a.CountryId == query.CountryId);
      //_result = _result.Where(a => query.Year == null || a.Year == query.Year);
      _result = _result.Where(a => string.IsNullOrEmpty(query.Title) || a.Title.ArabicContains(query.Title) || a.Title.EnglishContains(query.Title));

      var result = await _result
                .ProjectTo<RecentShowsDto>(_mapper.ConfigurationProvider)
                .ToPagedListAsync(query);

      return Ok(result);
    }

    [HttpGet("latest-news")]
    public async Task<IActionResult> LatestNews([FromServices] IAppUnitOfWork db)
    {
      var result = await db.News
                    .Where(a => a.Featured)
                    .ProjectTo<NewsDto>(_mapper.ConfigurationProvider)
                    .ToArrayAsync();

      return Ok(result);
    }

    [HttpGet("sponsors")]
    public async Task<IActionResult> Sponsers(
      [FromServices] IAppUnitOfWork db)
    {
      //var _result = db.News
      //  .Include(a => a.Image)
      //  .AsQueryable();

      //var result = _result
      //  .ProjectTo<NewsDto>(_mapper.ConfigurationProvider)
      //  .ToPagedList(query);

      //return Ok(result);

      return Ok();
    }

    [HttpPost("newsletter")]
    public async Task<IActionResult> SubscribeToNewsLeter(
     [FromBody] NewsLetterDto dto,
     [FromServices] IAppUnitOfWork db)
    {
      //var _result = db.News
      //  .Include(a => a.Image)
      //  .AsQueryable();

      //var result = _result
      //  .ProjectTo<NewsDto>(_mapper.ConfigurationProvider)
      //  .ToPagedList(query);

      //return Ok(result);

      return Ok();
    }

    [HttpGet("timeline")]
    public async Task<IActionResult> TimelineEvents([FromServices] IAppUnitOfWork db)
    {
      var timeline = await db.Contents.FirstOrDefaultAsync(a => a.ContentType == ContentType.Program);
      if (timeline != null)
      {
        var deserializedItems = JsonConvert.DeserializeObject<dynamic>(timeline.Data);
        return Ok(deserializedItems);
      }
      else
      {
        return NoContent();
      }
    }

    [HttpGet("booths")]
    public async Task<IActionResult> Booths([FromServices] IAppUnitOfWork db)
    {
      return Ok(await db.Booths
                        .Include(a => a.Purchases)
                          .ThenInclude(a => a.Payment)
                        .Where(a => !a.Purchases.Any() || a.Purchases.Any(a => a.Payment.PaymentStatus == Models.Entities.PaymentStatus.Rejected))
                        .ProjectTo<BoothDto>(_mapper.ConfigurationProvider)
                        .ToArrayAsync());
    }

    [HttpPost("book-booth")]
    public async Task<IActionResult> BookBooth(
      [FromHeader] string culture,
      [FromBody] BoothPurchaseDto dto,
      [FromServices] IEmailSender emailSender,
      [FromServices] IPaymentGateway paymentGateway,
      [FromServices] IAppUnitOfWork db,
      [FromServices] ITemplateParser templateParser,
      [FromServices] IOptions<UploadLimits> limitOptions,
      [FromServices] IS3FileManager fileManager)
    {

      var booth = await db.Booths.FirstOrDefaultAsync(a => a.Code.ToLower() == dto.BoothCode.ToLower());
      if (booth == null) return NotFound404("booth not found");
      if (booth.Purchases != null && booth.Purchases.Any())
      {
        return Conflict("booth already booked");
      }

      PaymentStatus paymentResponse = null;
      //if (!dto.Payment.IsOffline)
      //{
      //  try
      //  {
      //    if (string.IsNullOrEmpty(dto.Payment.SessionId))
      //    {
      //      var paymentDto = _mapper.Map<PaymentRequest>(dto.Payment);
      //      // 10.5$ => 1050 no decimal points (multiply by 100)
      //      paymentDto.Amount = (int)(booth.Price * 100);
      //      _logger.LogInformation("Request payment start for:" + paymentDto.Amount);
      //      paymentResponse = paymentGateway.RequestPayment(paymentDto).Result;
      //      if (paymentResponse != null && paymentResponse.IsPending)
      //      {
      //        return Ok(new
      //        {
      //          Pending = true,
      //          ThreeDsUrl = paymentResponse.ThreeDsUrl
      //        });
      //      }
      //      else if (paymentResponse != null && paymentResponse.IsApproved)
      //      {
      //        //TODO: uncomment
      //        //_logger.LogInformation($"user payment success {nominee.Id}/{nominee.UserName} -> Payment Id: {paymentResponse.PaymentId}");
      //      }
      //      else if (paymentResponse == null || !paymentResponse.IsApproved)
      //      {
      //        throw new ApiException(ApiErrorType.UserPaymentFailed, $"Payment approved: {paymentResponse?.IsApproved}");
      //      }
      //    }
      //    else
      //    {
      //      var paymentDetails = paymentGateway.GetPaymentDetails(dto.Payment.SessionId).Result;
      //      if (paymentDetails == null || !paymentDetails.Approved)
      //      {
      //        throw new ApiException(ApiErrorType.PaymentNotApproved, $"Payment approved: {paymentDetails?.Approved}");
      //      }
      //      else
      //      {
      //        paymentResponse = new PaymentStatus
      //        {
      //          PaymentId = paymentDetails.Id,
      //          Status = paymentDetails.Status,
      //        };
      //      }
      //    }
      //    _logger.LogInformation("Request payment end");
      //  }
      //  catch (Exception exPayment)
      //  {
      //    _logger.LogError(exPayment, "user payment failed");
      //    throw new ApiException(ApiErrorType.UserPaymentFailed, exPayment.Message);
      //  }
      //}


      var boothPurchase = _mapper.Map<BoothPurchase>(dto);
      boothPurchase.BoothId = booth.Id;
      await db.BoothPurchases.AddAsync(boothPurchase);

      //save payment
      var boothPayment = await SaveUserPaymentAsync(fileManager, db, booth, boothPurchase.Id, dto, paymentResponse);
      boothPurchase.Payment = boothPayment;

      //send confirmation email
      await SendBoothPurchaseConfirmationEmail(culture, templateParser, emailSender, booth, dto, paymentResponse);

      return Ok(_mapper.Map<BoothPurchaseResponseDto>(boothPurchase));
    }

    private async Task<BoothPayment> SaveUserPaymentAsync(IS3FileManager fileManager, IAppUnitOfWork db, Booth booth, string purchaseId, BoothPurchaseDto dto, PaymentStatus paymentStatus)
    {
      var payment = new BoothPayment();
      payment.BoothPurchaseId = purchaseId;
      payment.Amount = booth.Price;
      payment.PaymentId = paymentStatus?.PaymentId;

      payment.IsOffline = dto.Payment.IsOffline;
      payment.PaymentStatus = dto.Payment.IsOffline ? Models.Entities.PaymentStatus.Waiting : Models.Entities.PaymentStatus.Confirmed;
      payment.PaymentDate = DateTimeOffset.Now.ToUnixTimeSeconds();

      await db.BoothPayments.AddAsync(payment);

      if (dto.Payment.IsOffline)
      {
        var receiptFileKey = fileManager.GenerateFileKeyForResource(ResourceType.Docs, payment.Id, $"{payment.Id}_receipt." + dto.Payment.ReceiptFileName);
        payment.ReceiptId = receiptFileKey;
        payment.ReceiptUrl = await fileManager.UploadFileAsync(dto.Payment.Receipt, receiptFileKey);
      }

      return payment;
    }

    private async Task SendBoothPurchaseConfirmationEmail(string culture, ITemplateParser templateParser, IEmailSender emailSender, Booth booth, BoothPurchaseDto dto, PaymentStatus paymentStatus)
    {
      try
      {
        //todo: email template confirmation
        string htmlMessage = await templateParser.LoadAndParse("book_purchase_confirmation", locale: culture, dto);
        await emailSender.SendEmailAsync(dto.Email, _Locale["book_purchase_confirmation"], htmlMessage);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Failed to send confirmation email for booth purchase");
      }
    }



    [HttpPost("send-contactus")]
    public async Task<IActionResult> SendContactUsMessage(
      [FromHeader] string culture,
      [FromBody] ContactUsDto dto,
      [FromServices] IAppUnitOfWork db,
      [FromServices] IEmailSender emailSender,
      [FromServices] ITemplateParser templateParser,
      [FromServices] IOptions<AdminOptions> adminOptions
      )
    {
      var subject = await db.ContactUsSubjects.FindAsync(dto.Subject);
      dto.Subject = subject.Name[culture];
      string htmlMessage = await templateParser.LoadAndParse("contact_us", locale: culture, dto);
      await emailSender.SendEmailAsync(adminOptions.Value.ContactUsEmail, _Locale["contact_us"], htmlMessage);
      return Ok();
    }

  }


}