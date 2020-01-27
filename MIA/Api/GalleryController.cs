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
using MIA.Models.Entities.Enums;

namespace MIA.Api {
#if Versioning
  [ApiVersion("1.0")]
#endif
  [Route("api/gallery")]
  public class GalleryController : BaseApiController<GalleryController> {

    public GalleryController(IMapper mapper, [FromServices] ILogger<GalleryController> logger) : base(logger, mapper) {
    }

    [HttpGet("featured")]
    public IActionResult Featured(
      [FromServices] IAppUnitOfWork db) {
      var result = db.AlbumItems
        .Include(a => a.Album)
        .Where(a => a.Featured && a.Album.MainGallery)
        .ProjectTo<AlbumItemDto>(_mapper.ConfigurationProvider)
        .ToArray();

      return IfFound(result);
    }

    [HttpPost("by-type")]
    public IActionResult ByType(
      [FromBody] AlbumItemsRequestDto query,
      [FromServices] IAppUnitOfWork db) {
      var _result = db.AlbumItems
        .Include(a => a.Album)
        .Where(a => a.Album.MainGallery);

      if (query.Type.ToLower() == "photos") {
        _result = _result.Where(a => a.MediaType == MediaType.Image);
      } else if (query.Type.ToLower() == "videos") {
        _result = _result.Where(a => a.MediaType == MediaType.Video);
      } else if (query.Type.ToLower() == "latest") {
        _result = _result.OrderByDescending(a => a.DateCreated).ThenByDescending(a => a.Order);
      }

      var result = _result
        .ProjectTo<AlbumItemDto>(_mapper.ConfigurationProvider)
        .ToPagedList(query);

      return IfFound(result);
    }
  }

}