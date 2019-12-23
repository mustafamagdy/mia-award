using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MIA.ORMContext;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MIA.Api.Base;
using Z.EntityFramework.Plus;

namespace MIA.Api
{
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