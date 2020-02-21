using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
using PaymentStatus = MIA.Payments.PaymentStatus;

namespace MIA.Api {
#if Versioning
  [ApiVersion("1.0")]
#endif
  [Route("api/home")]
  public class HomeController : BaseApiController<HomeController> {
    private readonly IStringLocalizer<HomeController> _Locale;

    public HomeController(IMapper mapper, [FromServices] ILogger<HomeController> logger,
      IStringLocalizer<HomeController> _locale
      ) : base(logger, mapper) {
      this._Locale = _locale;
    }

    [HttpGet("awards")]
    public IActionResult Awards([FromServices] IAppUnitOfWork db) {
      var result = db.Awards
        .ProjectTo<AwardDto>(_mapper.ConfigurationProvider)
        .ToList();
      return Ok(result);
    }

    [HttpGet("main-album")]
    public IActionResult MainAlbum([FromServices] IAppUnitOfWork db) {
      var result = db.Albums
        .Include(a => a.MediaItems)
        //.FirstOrDefault(a => a.IsMain)
        .ProjectTo<MainAlbumDto>(_mapper.ConfigurationProvider)
        .ToList();
      return Ok(result);
    }

    [HttpPost("recent-shows")]
    public IActionResult RecentShows(
      [FromBody]RecentShowsSearchDto query,
      [FromServices] IAppUnitOfWork db) {
      var _result = db.ArtWorks
        //.Include(a=>a.Poster)
        .AsQueryable();


      _result = _result.Where(a => string.IsNullOrEmpty(query.AwardId) || a.AwardId == query.AwardId);
      //_result = _result.Where(a => string.IsNullOrEmpty(query.CountryId) || a.CountryId == query.CountryId);
      //_result = _result.Where(a => query.Year == null || a.Year == query.Year);

      var result = _result
        .ProjectTo<RecentShowsDto>(_mapper.ConfigurationProvider)
        .ToPagedList(query);

      return Ok(result);
    }

    [HttpPost("latest-news")]
    public IActionResult LatestNews(
      [FromBody] NewsSearchDto query,
      [FromServices] IAppUnitOfWork db) {
      var _result = db.News
        //.Include(a => a.Image)
        .AsQueryable();

      var result = _result
        .ProjectTo<NewsDto>(_mapper.ConfigurationProvider)
        .ToPagedList(query);

      return Ok(result);
    }

    [HttpGet("sponsors")]
    public IActionResult Sponsers(
      [FromServices] IAppUnitOfWork db) {
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
    public IActionResult SubscribeToNewsLeter(
     [FromBody] NewsLetterDto dto,
     [FromServices] IAppUnitOfWork db) {
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
    public IActionResult TimelineEvents() {
      var filename = "timeline.json";
      if (System.IO.File.Exists("./" + filename)) {
        using (StreamReader r = new StreamReader(filename)) {
          string json = r.ReadToEnd();
          var deserializedItems = JsonConvert.DeserializeObject<dynamic>(json);
          return Ok(deserializedItems);
        }
      } else {
        return NoContent();
      }
    }

    [HttpGet("booths")]
    public async Task<IActionResult> Booths([FromServices] IAppUnitOfWork db) {
      return Ok(await db.Booths.Include(a => a.Purchases)
                        .Where(a => !a.Purchases.Any())
                        .ProjectTo<BoothDto>(_mapper.ConfigurationProvider)
                        .ToArrayAsync());
    }

    [HttpPost("book-booth")]
    public async Task<IActionResult> BookBooth(
      [FromBody] BoothPurchaseDto dto,
      [FromServices] IPaymentGateway paymentGateway,
      [FromServices] IAppUnitOfWork db,
      [FromServices] IOptions<UploadLimits> limitOptions,
      [FromServices] IS3FileManager fileManager) {

      var booth = await db.Booths.FirstOrDefaultAsync(a=>a.Code.ToLower()== dto.BoothCode.ToLower());
      if (booth == null) return NotFound404("booth not found");
      if (booth.Purchases.Any())
      {
        return Conflict("booth already booked");
      }

      PaymentStatus paymentResponse = null;
      if (!dto.Payment.IsOffline) {
        try {
          if (string.IsNullOrEmpty(dto.Payment.SessionId)) {
            var paymentDto = _mapper.Map<PaymentRequest>(dto.Payment);
            // 10.5$ => 1050 no decimal points (multiply by 100)
            paymentDto.Amount = (int)(booth.Price * 100);
            _logger.LogInformation("Request payment start for:" + paymentDto.Amount);
            paymentResponse = paymentGateway.RequestPayment(paymentDto).Result;
            if (paymentResponse != null && paymentResponse.IsPending) {
              return Ok(new {
                Pending = true,
                ThreeDsUrl = paymentResponse.ThreeDsUrl
              });
            } else if (paymentResponse != null && paymentResponse.IsApproved) {

              //TODO: uncomment
              //_logger.LogInformation($"user payment success {nominee.Id}/{nominee.UserName} -> Payment Id: {paymentResponse.PaymentId}");

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


      var boothPurchase = _mapper.Map<BoothPurchase>(dto);
      boothPurchase.BoothId = booth.Id;
      await db.BoothPurchases.AddAsync(boothPurchase);

      //save payment
      var boothPayment = await SaveUserPaymentAsync(fileManager, db, booth, boothPurchase.Id, dto, paymentResponse);
      boothPurchase.Payment = boothPayment;

      return Ok(_mapper.Map<BoothPurchaseResponseDto>(boothPurchase));
    }

    private async Task<BoothPayment> SaveUserPaymentAsync(IS3FileManager fileManager, IAppUnitOfWork db, Booth booth, string purchaseId, BoothPurchaseDto dto, PaymentStatus paymentStatus) {
      var payment = new BoothPayment();
      payment.BoothPurchaseId = purchaseId;
      payment.Amount = booth.Price;
      payment.PaymentId = paymentStatus?.PaymentId;

      payment.IsOffline = dto.Payment.IsOffline;
      payment.PaymentStatus = dto.Payment.IsOffline ? Models.Entities.PaymentStatus.Waiting : Models.Entities.PaymentStatus.Confirmed;
      payment.PaymentDate = DateTimeOffset.Now.ToUnixTimeSeconds();

      await db.BoothPayments.AddAsync(payment);

      if (dto.Payment.IsOffline) {
        var receiptFileKey = fileManager.GenerateFileKeyForResource(ResourceType.Docs, payment.Id, $"{payment.Id}_receipt." + dto.Payment.ReceiptFileName);
        payment.ReceiptId = receiptFileKey;
        payment.ReceiptUrl = await fileManager.UploadFileAsync(dto.Payment.Receipt, receiptFileKey);
      }

      return payment;
    }


    [HttpGet("contact-message-subject")]
    public IActionResult ContactUsMessageSubjects([FromServices] IAppUnitOfWork db) {
      var subjects = db.ContactUsSubjects
        .ProjectTo<LocalizedLookupDto>(_mapper.ConfigurationProvider)
        .ToList();

      return Ok(subjects);
    }

    [HttpPost("send-contactus")]
    public async Task<IActionResult> SendContactUsMessage(
      [FromHeader] string culture,
      [FromBody] ContactUsDto dto,
      [FromServices] IEmailSender emailSender,
      [FromServices] ITemplateParser templateParser,
      [FromServices] IOptions<AdminOptions> adminOptions
      ) {

      string htmlMessage = await templateParser.LoadAndParse("contact_us", locale: culture, dto);
      await emailSender.SendEmailAsync(adminOptions.Value.ContactUsEmail, _Locale["contact_us"], htmlMessage);
      return Ok();
    }

  }


}