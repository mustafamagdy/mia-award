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
using Microsoft.EntityFrameworkCore;
using MIA.Models.Entities.Enums;

namespace MIA.Api
{
#if Versioning
  [ApiVersion("1.0")]
#endif
  [Route("api/gallery")]
  public class GalleryController : BaseApiController<GalleryController>
  {

    public GalleryController(IMapper mapper, [FromServices] ILogger<GalleryController> logger) : base(logger, mapper)
    {
    }

    [HttpGet("featured")]
    public async Task<IActionResult> Featured(
      [FromServices] IAppUnitOfWork db)
    {
      var result = await db.AlbumItems
        .Include(a => a.Album)
        .Where(a => a.Featured && a.Album.MainGallery)
        .ProjectTo<AlbumItemDto>(_mapper.ConfigurationProvider)
        .ToArrayAsync();

      return IfFound(result);
    }

    [HttpPost("by-type")]
    public async Task<IActionResult> ByType(
      [FromBody] AlbumItemsRequestDto query,
      [FromServices] IAppUnitOfWork db)
    {
      var _result = db.AlbumItems
        .Include(a => a.Album)
        .Where(a => a.Album.MainGallery);

      if (query.Type.ToLower() == "photos")
      {
        _result = _result.Where(a => a.MediaType == MediaType.Image);
      }
      else if (query.Type.ToLower() == "videos")
      {
        _result = _result.Where(a => a.MediaType == MediaType.Video);
      }
      else if (query.Type.ToLower() == "latest")
      {
        _result = _result.OrderByDescending(a => a.DateCreated).ThenByDescending(a => a.Order);
      }

      var result = await _result
        .ProjectTo<AlbumItemDto>(_mapper.ConfigurationProvider)
        .ToPagedListAsync(query);

      return IfFound(result);
    }
  }

}