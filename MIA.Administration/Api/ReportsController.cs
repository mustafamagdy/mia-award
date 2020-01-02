using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MIA.Administration.Api.Base;

namespace MIA.Administration.Api
{
  /// <summary>
  /// 
  /// </summary>
#if Versioning
  [ApiVersion("1.0")]
#endif
  [Route("api/pi")]
  public class ReportsController : BaseApiController<ReportsController> {

    public ReportsController(IMapper mapper, [FromServices] ILogger<ReportsController> logger) : base(logger, mapper) {
    }

  }
}