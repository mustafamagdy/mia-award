using System;
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
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using MIA.Infrastructure.Options;

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