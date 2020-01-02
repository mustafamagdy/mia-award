using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MIA.Api.Base;

namespace MIA.Administration.Api {
  /// <summary>
  /// 
  /// </summary>
#if Versioning
  [ApiVersion("1.0")]
#endif
  [Route("api/lookups")]
  public class LookupsController : BaseApiController<LookupsController>
  {

    public LookupsController(IMapper mapper, [FromServices] ILogger<LookupsController> logger) : base(logger, mapper)
    {
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
}