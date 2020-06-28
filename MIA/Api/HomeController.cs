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

    [HttpGet("metadata")]
    public async Task<IActionResult> Metadata([FromServices] IAppUnitOfWork db) {
      var subjects = await db.ContactUsSubjects
        .ProjectTo<LocalizedLookupDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

      var artworkGenres = await db.Genres
        .ProjectTo<LocalizedLookupDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

      var countries = await db.Countries
        .ProjectTo<LocalizedLookupDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

      var productionYears = await db.ProductionYears
        .ProjectTo<LocalizedLookupDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

      var artworkSubjects = await db.ArtworkSubjects
        .ProjectTo<LocalizedLookupDto>(_mapper.ConfigurationProvider)
        .ToListAsync();

      return Ok(new {
        ContactUsSubjects = subjects,
        Genres = artworkGenres,
        Countries = countries,
        Years = productionYears,
        ArtworkSubjectRoles = artworkSubjects
      });
    }

    [HttpGet("awards")]
    public async Task<IActionResult> Awards([FromServices] IAppUnitOfWork db) {
      var result = await db.Awards
                          .OrderBy(a=>a.Order)
                          .ProjectTo<AwardDto>(_mapper.ConfigurationProvider)
                          .ToListAsync();
      return Ok(result);
    }

    [HttpGet("main-album")]
    public async Task<IActionResult> MainAlbum([FromServices] IAppUnitOfWork db) {
      var result = await db.Albums
                        .Include(a => a.MediaItems)
                        .Where(a => a.MainGallery == true)
                        .ProjectTo<MainAlbumDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync();
      return Ok(result);
    }

    [HttpPost("recent-shows")]
    public async Task<IActionResult> RecentShows(
      [FromBody] ArtworkFilterDto query,
      [FromServices] IAppUnitOfWork db) {
      var _result = db.Artworks
                    .Where(a => a.UploadComplete)
                    .AsQueryable();

      //todo: filtering
      if (query.Year > 0)
        _result = _result.Where(a => a.BroadcastYear == query.Year || a.ProductionYear == query.Year);

      if (query.Title != null && query.Title.Trim() != "")
        _result = _result.Where(a => a.ProjectName.Contains(query.Title));

      if (query.TvChannels != null && query.TvChannels.Trim() != "")
        _result = _result.Where(a => a.TvChannels.Contains(query.Title));

      if (query.OnlineChannels != null && query.OnlineChannels.Trim() != "")
        _result = _result.Where(a => a.OnlineChannels.Contains(query.Title));

      var result = await _result
                .ProjectTo<RecentShowsDto>(_mapper.ConfigurationProvider)
                .ToPagedListAsync(query);

      return Ok(result);
    }

    [HttpGet("latest-news")]
    public async Task<IActionResult> LatestNews([FromServices] IAppUnitOfWork db) {
      var result = await db.News
                    .Where(a => a.Featured)
                    .ProjectTo<NewsDto>(_mapper.ConfigurationProvider)
                    .ToArrayAsync();

      return Ok(result);
    }

    [HttpPost("newsletter")]
    public async Task<IActionResult> SubscribeToNewsLeter(
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
    public async Task<IActionResult> TimelineEvents([FromServices] IAppUnitOfWork db) {
      var timeline = await db.Contents.FirstOrDefaultAsync(a => a.ContentType == ContentType.Program);
      if (timeline != null) {
        var deserializedItems = JsonConvert.DeserializeObject<dynamic>(timeline.Data);
        return Ok(deserializedItems);
      } else {
        return NoContent();
      }
    }

    [HttpGet("sponsers")]
    public async Task<IActionResult> GetSponsers([FromServices] IAppUnitOfWork db) {
      var sponsers = await db.Contents.FirstOrDefaultAsync(a => a.ContentType == ContentType.Sponsers);
      if (sponsers != null) {
        var deserializedItems = JsonConvert.DeserializeObject<dynamic>(sponsers.Data);
        return Ok(deserializedItems);
      } else {
        return NoContent();
      }
    }

    [HttpGet("booths")]
    public async Task<IActionResult> Booths([FromServices] IAppUnitOfWork db) {
      return Ok(await db.Booths
                        .Include(a => a.Purchases)
                          .ThenInclude(a => a.Payment)
                        .Where(a => a.Sellable && (!a.Purchases.Any() || a.Purchases.Any(a => a.Payment.PaymentStatus == Models.Entities.PaymentStatus.Rejected)))
                        .ProjectTo<BoothDto>(_mapper.ConfigurationProvider)
                        .OrderBy(a => a.Code)
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
      [FromServices] IS3FileManager fileManager) {

      var booth = await db.Booths.FirstOrDefaultAsync(a => a.Code.ToLower() == dto.BoothCode.ToLower());
      if (booth == null) {
        throw new ApiException(ApiErrorType.NotFound, "booth not found");
      }

      if (booth.Purchases != null && booth.Purchases.Any()) {
        throw new ApiException(ApiErrorType.Conflict, "booth already booked");
      }

      var boothPurchase = _mapper.Map<BoothPurchase>(dto);
      boothPurchase.BoothId = booth.Id;
      if (dto.CompanyLogo != null && dto.CompanyLogoFileExt != null) {
        var companyLogoFileKey = fileManager.GenerateFileKeyForResource(ResourceType.BoothPayment, boothPurchase.Id, $"{boothPurchase.Id}_companyLogo." + dto.CompanyLogoFileExt);
        boothPurchase.CompanyLogo = S3File.FromKeyAndUrl(companyLogoFileKey, await fileManager.UploadFileAsync(dto.CompanyLogo, companyLogoFileKey));
      }

      await db.BoothPurchases.AddAsync(boothPurchase);

      //save payment
      var boothPayment = await SaveUserPaymentAsync(fileManager, db, booth, boothPurchase.Id, dto);
      boothPurchase.Payment = boothPayment;

      //send confirmation email
      await SendBoothPurchaseConfirmationEmail(culture, templateParser, emailSender, booth, dto);
      return Ok(_mapper.Map<BoothPurchaseResponseDto>(boothPurchase));
    }

    private async Task<BoothPayment> SaveUserPaymentAsync(IS3FileManager fileManager, IAppUnitOfWork db, Booth booth, string purchaseId, BoothPurchaseDto dto) {
      var payment = new BoothPayment();
      payment.BoothPurchaseId = purchaseId;
      payment.Amount = booth.Price;
      payment.PaymentStatus = Models.Entities.PaymentStatus.Waiting;
      payment.PaymentDate = DateTimeOffset.Now.ToUnixTimeSeconds();

      await db.BoothPayments.AddAsync(payment);

      var receiptFileKey = fileManager.GenerateFileKeyForResource(ResourceType.BoothPayment, payment.Id, $"{payment.Id}_receipt" + dto.Payment.ReceiptFileName.GetFileExt());
      payment.Receipt = S3File.FromKeyAndUrl(receiptFileKey, await fileManager.UploadFileAsync(dto.Payment.Receipt, receiptFileKey));

      return payment;
    }

    private async Task SendBoothPurchaseConfirmationEmail(string culture, ITemplateParser templateParser, IEmailSender emailSender, Booth booth, BoothPurchaseDto dto) {
      try {
        string htmlMessage = await templateParser.LoadAndParse("booth_purchase_confirmation", locale: culture, dto);
        await emailSender.SendEmailAsync(dto.Email, _Locale["booth_purchase_confirmation"], htmlMessage);
      } catch (Exception ex) {
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
      ) {
      var subject = await db.ContactUsSubjects.FindAsync(dto.Subject);
      dto.Subject = subject.Name[culture];
      string htmlMessage = await templateParser.LoadAndParse("contact_us", locale: culture, dto);
      await emailSender.SendEmailAsync(adminOptions.Value.ContactUsEmail, _Locale["contact_us"], htmlMessage);
      return Ok();
    }

  }


}