using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MIA.Api.Base;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Authorization;

namespace MIA.Administration.Api {
  /// <summary>
  /// 
  /// </summary>
#if Versioning
  [ApiVersion("1.0")]
#endif
  [Route("api/system")]
  [Authorize]
  public class SystemController : BaseApiController<SystemController> {
    private readonly IHostingEnvironment _env;

    public SystemController(IMapper mapper, [FromServices] ILogger<SystemController> logger, IHostingEnvironment env) : base(logger, mapper) {
      this._env = env;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
    [HttpGet("ping")]
    public async Task<IActionResult> Ping() {
      return Ok(await Task.FromResult("Alive " + DateTime.UtcNow));
    }

    [HasPermission(Permissions.CloseJudging)]
    [HttpPost("close-all")]
    public async Task<IActionResult> CloseJudging(IAppUnitOfWork db) {
      //todo: calc first, second award winners, then close the system
      return Ok("working on it");
    }

  }

}