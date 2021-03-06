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
using Microsoft.Extensions.Options;
using MIA.Infrastructure.Options;
using System;
using MIA.Models.Entities.Enums;

namespace MIA.Api {
#if Versioning
  [ApiVersion("1.0")]
#endif
  [Route("api/news")]
  public class NewsController : BaseApiController<NewsController> {

    public NewsController(IMapper mapper, [FromServices] ILogger<NewsController> logger) : base(logger, mapper) {
    }

    [HttpPost("list")]
    public async Task<IActionResult> List(
      [FromBody] FullNewsSearch query,
      [FromServices] IAppUnitOfWork db) {
      var result = await db.News
        .Where(a => a.Outdated == false &&
            (string.IsNullOrEmpty(query.Category)
            || query.Category.ToLower() == "all"
            || a.Category.ToLower() == query.Category.ToLower()))
        .OrderByDescending(a=>a.Date)
        .ProjectTo<FullNewsDto>(_mapper.ConfigurationProvider)
        .ToPagedListAsync(query);

      return IfFound(result);
    }

    [HttpGet("featured")]
    public async Task<IActionResult> Featured(
      [FromServices] IAppUnitOfWork db) {
      var result = await db.News
        .Where(a => a.Featured == true && a.Outdated == false)
        .OrderByDescending(a=>a.Date)
        .ProjectTo<FullNewsDto>(_mapper.ConfigurationProvider)
        .ToArrayAsync();

      return IfFound(result);
    }


    [HttpGet("categories")]
    public async Task<IActionResult> Categories(
      [FromServices] IAppUnitOfWork db
      ) {
      var categories = await db.News.Select(a => a.Category).Distinct().ToArrayAsync();
      return IfFound(categories);
    }

    [HttpGet("with-comments/{id}")]
    public async Task<IActionResult> ListWithComments(
      [FromRoute(Name = "id")] string newsId,
      [FromServices] IAppUnitOfWork db) {
      var result = await db.News
                          .Include(a => a.Comments)
                          .Where(a => a.Id == newsId)
                          .ProjectTo<FullNewsWithCommentsDto>(_mapper.ConfigurationProvider)
                          .FirstOrDefaultAsync();

      //filter not approved comments, this should be using the filter inside inlucde, but it needs work from zzz project
      result.Comments = result.Comments
                              .OrderByDescending(a => a.DateLong)
                              .Where(a => a.IsApproved).ToArray();

      //poor performace, but for sake of time
      var relatedNews = db.News
        .Where(a => a.Outdated == false)
        .AsEnumerable()
        .Where(a =>
          a.Id != result.Id &&
          a.Keywords.Split(" ")
          .Intersect(result.Keywords.Split(" "))
          .Any())
        .Take(3)
        .AsQueryable()
        .ProjectTo<RelatedNewsDto>(_mapper.ConfigurationProvider)
        .ToArray();

      result.RelatedNews = relatedNews;

      return IfFound(result);
    }


    [HttpPost("{id}/comment")]
    public async Task<IActionResult> AddComment(
      [FromRoute(Name = "id")] string newsId,
      [FromBody] SubmitUserComment dto,
      [FromServices] IAppUnitOfWork db,
      [FromServices] IOptions<AdminOptions> adminOptions
      ) {
      var comment = _mapper.Map<NewsComment>(dto);
      comment.NewsId = newsId;
      comment.IsApproved = adminOptions.Value.AutoApproveNewsComments;
      comment.Date = DateTime.UtcNow.ToUnixTimeMilliseconds();

      await db.NewsComments.AddAsync(comment);
      return Ok(_mapper.Map<UserCommentDto>(comment));
    }
  }

}