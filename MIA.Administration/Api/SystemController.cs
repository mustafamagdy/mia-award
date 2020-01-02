using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
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
  [Route("api/system")]
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


    [HttpGet("roots")]
    public async Task<IActionResult> roots() {
      var webroot = _env.WebRootPath;
      var contentpath = _env.ContentRootPath;

      return Ok(new {
        webroot,
        contentpath
      });
    }

    [HttpGet("logtest")]
    public async Task<IActionResult> logtest() {
      _logger.LogInformation("systtem -> log information");
      _logger.LogDebug("systtem -> log debug");
      _logger.LogError("systtem -> log error");
      _logger.LogWarning("systtem -> log warning");
      _logger.LogCritical("systtem -> log critical");

      return Ok("logged");

    }

  }

}