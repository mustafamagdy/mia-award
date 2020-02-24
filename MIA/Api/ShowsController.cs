using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MIA.Api.Base;
using MIA.Models.Entities.Enums;
using MIA.ORMContext;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace MIA.Api
{
#if Versioning
  [ApiVersion("1.0")]
#endif
  [Route("api/shows")]
  public class ShowsController : BaseApiController<ShowsController> {

    public ShowsController(IMapper mapper, [FromServices] ILogger<ShowsController> logger) : base(logger, mapper) {
    }

    [HttpGet("featured")]
    public IActionResult Featured(
      [FromServices] IAppUnitOfWork db) {
      var result = db.ArtWorks
        .Where(a => a.UploadComplete && a.Featured)
        .ProjectTo<ArtworkViewDto>(_mapper.ConfigurationProvider)
        .ToArray();

      return IfFound(result);
    }

    [HttpPost("filter")]
    public IActionResult Filtered(
      [FromBody] ArtworkFilterDto query,
      [FromServices] IAppUnitOfWork db)
    {
      var _result = db.ArtWorks
        .Where(a => a.UploadComplete);
       
      //todo: filtering

      var result = _result
        .ProjectTo<ArtworkViewDto>(_mapper.ConfigurationProvider)
        .ToPagedList(query);

      return IfFound(result);
    }
  }
}