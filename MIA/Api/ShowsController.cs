using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MIA.Api.Base;
using MIA.Exceptions;
using MIA.Infrastructure.Options;
using MIA.Models.Entities;
using MIA.Models.Entities.Enums;
using MIA.ORMContext;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace MIA.Api {
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
      var result = db.Artworks
        .Include(a => a.Award)
        .Include(a => a.Nominee)
        .ThenInclude(a => a.AvatarImage)
        .Where(a => a.UploadComplete && a.Award.AwardType == AwardType.Artwork)
        .ProjectTo<ArtworkBasicViewDto>(_mapper.ConfigurationProvider)
        .ToArray();

      return Ok(result);
    }

    [HttpPost("filter")]
    public async Task<IActionResult> Filtered(
      [FromBody] ArtworkFilterDto query,
      [FromServices] IAppUnitOfWork db) {
      var _result = db.Artworks
        .Include(a => a.Award)
        .Include(a => a.Nominee)
        .ThenInclude(a => a.AvatarImage)
        .Where(a => a.UploadComplete && a.Award.AwardType == AwardType.Artwork);

      //todo: filtering
      if (query.Year > 0)
        _result = _result.Where(a => a.BroadcastYear == query.Year || a.ProductionYear == query.Year);

      if (query.Title != null && query.Title.Trim() != "")
        _result = _result.Where(a => a.ProjectName.Contains(query.Title));

      if (query.TvChannels != null && query.TvChannels.Trim() != "")
        _result = _result.Where(a => a.TvChannels.Contains(query.Title));

      if (query.OnlineChannels != null && query.OnlineChannels.Trim() != "")
        _result = _result.Where(a => a.OnlineChannels.Contains(query.Title));

      var result = await _result
        .ProjectTo<ArtworkBasicViewDto>(_mapper.ConfigurationProvider)
        .ToPagedListAsync(query);

      return Ok(result);
    }


    [HttpGet("with-comments/{id}")]
    public async Task<IActionResult> GetWithReviews(
      [FromRoute(Name = "id")] string showId,
      [FromServices] IAppUnitOfWork db) {
      var result = await db.Artworks
        .Include(a => a.Award)
        .Include(a => a.Nominee)
        .ThenInclude(a => a.AvatarImage)
        .Include(a => a.Reviews)
        .Where(a => a.UploadComplete && a.Award.AwardType == AwardType.Artwork && a.Id == showId)
        .ProjectTo<FullArtworkWithCommentsDto>(_mapper.ConfigurationProvider)
        .FirstOrDefaultAsync();

      if (result == null) {
        throw new ApiException(ApiErrorType.NotFound, "Show not found");
      }

      //filter not approved comments, this should be using the filter inside inlucde, but it needs work from zzz project
      result.Reviews = result.Reviews.Where(a => a.IsApproved).ToArray();

      return Ok(result);
    }


    [HttpPost("{id}/review")]
    public async Task<IActionResult> AddComment(
      [FromRoute(Name = "id")] string showId,
      [FromBody] SubmitUserComment dto,
      [FromServices] IAppUnitOfWork db,
      [FromServices] IOptions<AdminOptions> adminOptions
    ) {
      var comment = _mapper.Map<ArtworkReview>(dto);
      comment.ArtworkId = showId;
      comment.IsApproved = adminOptions.Value.AutoApproveNewsComments;

      await db.ArtworkReviews.AddAsync(comment);
      return Ok(_mapper.Map<UserCommentDto>(comment));
    }
  }
}