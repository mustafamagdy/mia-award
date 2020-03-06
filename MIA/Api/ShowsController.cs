using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MIA.Api.Base;
using MIA.Infrastructure.Options;
using MIA.Models.Entities;
using MIA.Models.Entities.Enums;
using MIA.ORMContext;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace MIA.Api
{
#if Versioning
  [ApiVersion("1.0")]
#endif
  [Route("api/shows")]
  public class ShowsController : BaseApiController<ShowsController>
  {

    public ShowsController(IMapper mapper, [FromServices] ILogger<ShowsController> logger) : base(logger, mapper)
    {
    }

    [HttpGet("featured")]
    public IActionResult Featured(
      [FromServices] IAppUnitOfWork db)
    {
      var result = db.ArtWorks
        .Where(a => a.UploadComplete && a.Featured)
        .ProjectTo<ArtworkBasicViewDto>(_mapper.ConfigurationProvider)
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
        .ProjectTo<ArtworkBasicViewDto>(_mapper.ConfigurationProvider)
        .ToPagedList(query);

      return IfFound(result);
    }


    [HttpGet("with-comments/{id}")]
    public async Task<IActionResult> GetWithReviews(
      [FromRoute(Name = "id")] string showId,
      [FromServices] IAppUnitOfWork db)
    {
      var result = await db.ArtWorks
        .Include(a => a.Reviews)
        .Where(a => a.UploadComplete && a.Id == showId)
        .ProjectTo<FullArtworkWithCommentsDto>(_mapper.ConfigurationProvider)
        .FirstOrDefaultAsync();

      if (result == null) return NotFound404("Show not found");

      //filter not approved comments, this should be using the filter inside inlucde, but it needs work from zzz project
      result.Reviews = result.Reviews.Where(a => a.IsApproved).ToArray();

      return IfFound(result);
    }


    [HttpPost("{id}/review")]
    public async Task<IActionResult> AddComment(
      [FromRoute(Name = "id")] string showId,
      [FromBody] SubmitUserComment dto,
      [FromServices] IAppUnitOfWork db,
      [FromServices] IOptions<AdminOptions> adminOptions
    )
    {
      var comment = _mapper.Map<ArtworkReview>(dto);
      comment.ArtworkId = showId;
      comment.IsApproved = adminOptions.Value.AutoApproveNewsComments;

      await db.ArtworkReviews.AddAsync(comment);
      return Ok(_mapper.Map<UserCommentDto>(comment));
    }
  }
}