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
using Microsoft.EntityFrameworkCore;
using MIA.Models.Entities;

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

    [HttpGet("main-album")]
    public IActionResult MainAlbum([FromServices] IAppUnitOfWork db) {
      var result = db.PhotoAlbums
        .Include(a => a.Images)
        //.FirstOrDefault(a => a.IsMain)
        .ProjectTo<MainAlbumDto>(_mapper.ConfigurationProvider)
        .ToList();
      return IfFound(result);
    }

    [HttpPost("recent-shows")]
    public IActionResult RecentShows(
      [FromBody]RecentShowsSearchDto query,
      [FromServices] IAppUnitOfWork db) {
      var _result = db.ArtWorks
        //.Include(a=>a.Poster)
        .AsQueryable();


      _result = _result.Where(a => string.IsNullOrEmpty(query.AwardId) || a.AwardId == query.AwardId);
      //_result = _result.Where(a => string.IsNullOrEmpty(query.CountryId) || a.CountryId == query.CountryId);
      //_result = _result.Where(a => query.Year == null || a.Year == query.Year);

      var result = _result
        .ProjectTo<RecentShowsDto>(_mapper.ConfigurationProvider)
        .ToPagedList(query);

      return IfFound(result);
    }

    [HttpPost("latest-news")]
    public IActionResult LatestNews(
      [FromBody]NewsSearchDto query,
      [FromServices] IAppUnitOfWork db) {
      var _result = db.News
        .Include(a=>a.Image)
        .AsQueryable();

      var result = _result
        .ProjectTo<NewsDto>(_mapper.ConfigurationProvider)
        .ToPagedList(query);

      return IfFound(result);
    }

    [HttpGet("sponsers")]
    public IActionResult Sponsers(
      [FromServices] IAppUnitOfWork db) {
      //var _result = db.News
      //  .Include(a => a.Image)
      //  .AsQueryable();

      //var result = _result
      //  .ProjectTo<NewsDto>(_mapper.ConfigurationProvider)
      //  .ToPagedList(query);

      //return IfFound(result);

      return Ok();
    }

    [HttpPost("newsletter")]
    public IActionResult SubscribeToNewsLeter(
     [FromBody] NewsLetterDto dto,
     [FromServices] IAppUnitOfWork db) {
      //var _result = db.News
      //  .Include(a => a.Image)
      //  .AsQueryable();

      //var result = _result
      //  .ProjectTo<NewsDto>(_mapper.ConfigurationProvider)
      //  .ToPagedList(query);

      //return IfFound(result);

      return Ok();
    }
  }

  public class NewsLetterDto : BaseDto {
    public string Email { get; set; }
  }

  public class NewsSearchDto : IPagedData {
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
  }

  
  public class NewsDto : BaseDto {
    public string Id { get; set; }
    public string Title { get; set; }
    public string Date { get; set; }
    public string PosterUrl { get; set; }
    public NewsCategory Category { get; set; }
  }


  public class RecentShowsSearchDto : IPagedData {
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int? Year { get; set; }
    public string AwardId { get; set; }
    public string CountryId { get; set; }
  }

  public class RecentShowsDto : BaseDto {
    public string Id { get; set; }
    public string Title { get; set; }
    public int Rating { get; set; }
    public string PosterUrl { get; set; }
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