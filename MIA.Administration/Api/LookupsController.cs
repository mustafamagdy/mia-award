using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MIA.Api.Base;
using MIA.Administration.Api.Base;
using MIA.Models.Entities;
using Microsoft.Extensions.Localization;

namespace MIA.Administration.Api {
  /// <summary>
  /// 
  /// </summary>
#if Versioning
  [ApiVersion("1.0")]
#endif
  [Route("api/lookups")]
  public class LookupsController : BaseApiController<LookupsController> {

    public LookupsController(IMapper mapper, [FromServices] ILogger<LookupsController> logger) : base(logger, mapper) {
    }

    //[HttpGet("airports")]
    //public IActionResult Airports([FromServices] IAppUnitOfWork db)
    //{
    //  var result = db.Airports
    //    .ProjectTo<AirportDto>(_mapper.ConfigurationProvider)
    //    .ToList();

    //  return IfFound(result);
    //}

  }

  public class NewsDto {
    public string Id { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
  }

  public class NewNewsDto {
    public string Title { get; set; }
    public string Body { get; set; }
  }
  public class UpdateNewsDto : IUpdateDto {
    public string Id { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
  }


  public class NewsController : BaseCrudController<News, NewsDto, NewNewsDto, UpdateNewsDto> {
    public NewsController(
          IMapper mapper,
          ILogger<NewsController> logger,
          IStringLocalizer<NewsController> localize
        ) : base(mapper, logger, localize) { }
  }

}