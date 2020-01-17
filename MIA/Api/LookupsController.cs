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

namespace MIA.Api {
#if Versioning
  [ApiVersion("1.0")]
#endif
  [Route("api/home")]
  public class HomeController : BaseApiController<HomeController> {

    public HomeController(IMapper mapper, [FromServices] ILogger<HomeController> logger) : base(logger, mapper) {
    }

    [HttpGet("awards")]
    public IActionResult Awards([FromServices] IAppUnitOfWork db) {
      var result = db.Awards
        .ProjectTo<AwardDto>(_mapper.ConfigurationProvider)
        .ToList();
      return IfFound(result);
    }

    [HttpGet("main-alum")]
    public IActionResult MainAlbum([FromServices] IAppUnitOfWork db) {
      var result = db.PhotoAlbums
        //.FirstOrDefault(a => a.IsMain)
        .ProjectTo<MainAlbumDto>(_mapper.ConfigurationProvider)
        .ToList();
      return IfFound(result);
    }

  }

  public enum AlbumItemType { Photo, Video }
  public class AlbumItemDto : BaseDto {
    public string Url { get; set; }
    public int Order { get; set; }
    public AlbumItemType Type { get; set; }
  }
  public class MainAlbumDto : BaseDto {
    public string Description { get; set; }
    public AlbumItemDto[] Items { get; set; }
  }
  public class AwardDto : BaseDto {
    public string Id { get; set; }
    public string Title { get; set; }
    public string TrophyUrl { get; set; }
    public int Order { get; set; }
  }
}