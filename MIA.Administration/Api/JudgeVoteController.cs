using AutoMapper;
using MIA.Administration.Api.Base;
using MIA.Constants;
using MIA.Infrastructure.Options;
using MIA.Models.Entities;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using MIA.Administration.Dto.Award;
using MIA.Administration.Services;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using MIA.Exceptions;
using MIA.ORMContext;
using Microsoft.AspNetCore.Authorization;
using X.PagedList;
using Z.EntityFramework.Plus;

namespace MIA.Administration.Api {

  [EnableCors(CorsPolicyName.DevOnly)]
  [Route("api/judgeVote")]
  [Authorize]
  public class JudgeVoteController : BaseCrudController<JudgeVote, JudgeVoteDto, NewJudgeVoteDto, UpdateJudgeVoteDto> {
    private readonly IHostingEnvironment env;
    private readonly IOptions<UploadLimits> limitOptions;

    public JudgeVoteController(
          IMapper mapper,
          ILogger<JudgeVoteController> logger,
          IStringLocalizer<JudgeVoteController> localize,
          IHostingEnvironment env,
          IOptions<UploadLimits> limitOptions
        ) : base(mapper, logger, localize) {
      this.env = env;
      this.limitOptions = limitOptions;
    }

    [HasPermission(Permissions.UpdateArtworkVote)]
    public override async Task<IActionResult> SaveNewAsync([FromForm] NewJudgeVoteDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.SaveNewAsync(dto, db);
      var resultDto = ((JudgeVoteDto)(result as OkObjectResult)?.Value);
      var JudgeVoteItem = await db.JudgeVotes.FindAsync(resultDto.Id);
      return IfFound(_mapper.Map<JudgeVoteDto>(JudgeVoteItem));

      //var result = await db.Set<JudgeVote>().AddAsync(_mapper.Map<ArtWorkPayment>(dto)); 
      //var PaymentItem = await db.ArtWorkPayments.FindAsync(result.Entity.Id);
      //return IfFound(_mapper.Map<ArtWorkPaymentDto>(PaymentItem));

    }

    [HttpPost("submitJudgeVote")]
    [HasPermission(Permissions.UpdateArtworkVote)]
    public async Task<IActionResult> SubmitJudgeVote(
      [FromBody] UpdateJudgeVoteDto dto,
      [FromServices] IUserResolver userResolver,
      [FromServices] IAppUnitOfWork db) {
      var sysOptions = db.SystemOptions.FirstOrDefault();
      if (sysOptions != null && sysOptions.AllJudgeFinished) {
        throw new ApiException(ApiErrorType.BadRequest, "Judge is closed, you cannot submit any updates");
      }

      var insertList = new List<JudgeVote>();

      var judgeVoteItems = db.JudgeVotes
        .Include(a => a.Criteria)
        .Where(a => a.ArtworkId == dto.ArtWorkId && a.Criteria.Level == dto.Level && a.JudgeId == dto.JudgeId)
        .ToList();

      if (judgeVoteItems.Any()) {
        foreach (var objJudges in judgeVoteItems) {
          var entity = objJudges;// db.Set<JudgeVote>().FirstOrDefault(a => a.ArtworkId == dto.ArtworkId);
          if (entity != null)
            db.Set<JudgeVote>().Remove(entity);
        }
      }

      foreach (var value in dto.CriteriaValues) {
        var judgeObj = new JudgeVote();
        judgeObj.JudgeId = dto.JudgeId;
        judgeObj.ArtworkId = dto.ArtWorkId;
        judgeObj.CriteriaId = value.Id;
        judgeObj.VotingValue = value.JudgeValue;
        insertList.Add(judgeObj);
      }
      await db.Set<JudgeVote>().AddRangeAsync(_mapper.Map<List<JudgeVote>>(insertList));
      await db.CommitTransactionAsync();
      return Ok();
    }

    [HasPermission(Permissions.UpdateArtworkVote)]
    public override async Task<IActionResult> GetAsync(string id, [FromServices] IAppUnitOfWork db) {
      var result = await base.GetAsync(id, db);
      var resultDto = ((JudgeVoteDto)(result as OkObjectResult)?.Value);
      var boothItem = await db.JudgeVotes.FirstOrDefaultAsync(a => a.Id == resultDto.Id);
      return IfFound(_mapper.Map<JudgeVoteDto>(boothItem));
    }

    [HttpGet("getJudgeVoteCriteriaValues")]
    [HasPermission(Permissions.UpdateArtworkVote)]
    public async Task<IActionResult> GetJudgeVoteCriteriaValuesAsync(string id, [FromServices] IAppUnitOfWork db) {
      List<JudgeVoteDto> returnVotingCriteriaVoteDto = null;
      var judgeVoting = db.JudgeVotes.Where(a => a.ArtworkId == id).ToList();
      returnVotingCriteriaVoteDto = _mapper.Map<List<JudgeVoteDto>>(judgeVoting);
      return IfFound(returnVotingCriteriaVoteDto);

    }

    [HttpGet("{artworkId}/getCriteriaByLevel/{level}")]
    [HasPermission(Permissions.ViewArtworkJudgeDetails)]
    public async Task<IActionResult> GetCriteriaBylevelAsync(
      [FromRoute(Name = "artworkId")]string artworkId,
      [FromRoute(Name = "level")] JudgeLevel level,
      [FromServices] IAppUnitOfWork db,
      [FromServices] IUserResolver userResolver) {
      var userId = (await userResolver.CurrentUserAsync())?.Id;
      if (string.IsNullOrEmpty(userId)) {
        throw new ApiException(ApiErrorType.Unauthorized, "User cannot be resolved");
      }

      var artwork = await db.Artworks.FindAsync(artworkId);

      var list = db.VotingCriterias
        .IncludeFilter(a => a.ArtworkVotes.Where(x => x.JudgeId == userId && x.ArtworkId == artworkId))
        .Where(c => c.Level == level && c.AwardId == artwork.AwardId)
        .ToList()
        .Select(a => new JudgeVoteCriteriaWithValueDto {
          Id = a.Id,
          Level = a.Level,
          Order = a.Order,
          Code = a.Code,
          Name = a.Name,
          Weight = a.Weight,
          JudgeValue = a.ArtworkVotes.Any() ? a.ArtworkVotes.FirstOrDefault().VotingValue : 0
        })
        .ToArray();
      return IfFound(list);

    }

    [HttpPost("my-artworks")]
    [HasPermission(Permissions.ViewAssignedArtworks)]
    public async Task<IActionResult> GetJudgeArtWorksAsync(
      [FromServices] IUserResolver userResolver,
      [FromServices] IAppUnitOfWork db) {
      var userId = (await userResolver.CurrentUserAsync())?.Id;

      var judgeAwardForLevel1 = await db.JudgeAwards.Where(a => a.JudgeId == userId && a.Level == JudgeLevel.Level1).AsNoTracking().ToListAsync();
      var judgeAwardForLevel2 = await db.JudgeAwards.Where(a => a.JudgeId == userId && a.Level == JudgeLevel.Level2).AsNoTracking().ToListAsync();

      var remaining_level1Artworks = new List<ArtworkForJudgingDto>();
      foreach (var award in judgeAwardForLevel1) {
        var result = await GetArtworksForJudgeAndLevel(db, award.AwardId, userId, JudgeLevel.Level1, false);
        remaining_level1Artworks.AddRange(result);
      }

      var remaining_level2Artworks = new List<ArtworkForJudgingDto>();
      foreach (var award in judgeAwardForLevel2) {
        var result = await GetArtworksForJudgeAndLevel(db, award.AwardId, userId, JudgeLevel.Level2, false);
        remaining_level2Artworks.AddRange(result);
      }


      var done_level1Artworks = new List<ArtworkForJudgingDto>();
      foreach (var award in judgeAwardForLevel1) {
        var result = await GetArtworksForJudgeAndLevel(db, award.AwardId, userId, JudgeLevel.Level1, true);
        done_level1Artworks.AddRange(result);
      }

      var done_level2Artworks = new List<ArtworkForJudgingDto>();
      foreach (var award in judgeAwardForLevel2) {
        var result = await GetArtworksForJudgeAndLevel(db, award.AwardId, userId, JudgeLevel.Level2, true);
        done_level2Artworks.AddRange(result);
      }

      return IfFound(new {
        Remaining = new {
          Level1Artworks = remaining_level1Artworks.OrderBy(a => a.Id).ToArray(),
          Level2Artworks = remaining_level2Artworks.OrderBy(a => a.Id).ToArray(),
        },
        Done = new {
          Level1Artworks = done_level1Artworks.OrderBy(a => a.Scores.Length).ThenBy(a => a.Id).ToArray(),
          Level2Artworks = done_level2Artworks.OrderBy(a => a.Scores.Length).ThenBy(a => a.Id).ToArray(),
        }
      });

    }

    private async Task<ArtworkForJudgingDto[]> GetArtworksForJudgeAndLevel(IAppUnitOfWork db, string awardId, string judgeId, JudgeLevel level, bool isDone) {
      var artWorksQuery = db.Artworks
        .Include(a => a.FinalScores)
        .Where(a => a.FinalScores.Any(x => x.JudgeId == judgeId && x.Level == level) == isDone
                    && a.AwardId == awardId && a.UploadComplete)
        .AsNoTracking();

      if (!isDone && level == JudgeLevel.Level2) {
        //if you want list of artworks that has not been done in level 2, those artworks should not contain list of artworks
        //in level 1 but not yet finished in level 1 (not failed, not succeeded yet)
        artWorksQuery = artWorksQuery.Where(a => a.IllegibleForJudge != null);
      }

      var artWorks = await artWorksQuery.ToListAsync();

      var result = artWorks.Select(a => _mapper.Map<ArtworkForJudgingDto>(a))
        .Select(a => GetArtworkForLevelWithScore(a, judgeId, level)).ToArray();
      return result;
    }
    private ArtworkForJudgingDto GetArtworkForLevelWithScore(ArtworkForJudgingDto artwork, string judgeId, JudgeLevel level) {
      artwork.Scores = artwork.Scores.Where(a => a.JudgeId == judgeId && a.Level == level).ToArray();
      artwork.LevelNumber = (int)level;
      return artwork;
    }

    [HttpPost("my-awards")]
    [HasPermission(Permissions.ReadAward)]
    public async Task<IActionResult> GetMyAwards(
      [FromServices] IUserResolver userResolver,
      [FromServices] IAppUnitOfWork db) {
      var userId = (await userResolver.CurrentUserAsync())?.Id;
      var awards = await db.JudgeAwards
                        .Include(a => a.Award)
                        .Where(a => a.JudgeId == userId || a.Award.ManagerId == userId)
                        .Select(a => a.Award)
                        .Distinct()
                        .AsNoTracking()
                        .ProjectTo<AwardMinimumDto>(_mapper.ConfigurationProvider)
                        .ToListAsync();

      return IfFound(awards);
    }

    [HttpPost("my-statistics")]
    [HasPermission(Permissions.ViewMyArtworkStatistics)]
    public async Task<IActionResult> MyArtworkStatistics(
      [FromBody] JudgeStatisticsFilter dto,
      [FromServices] IUserResolver userResolver,
      [FromServices] IAppUnitOfWork db) {
      var judgeId = (await userResolver.CurrentUserAsync())?.Id;

      var judgeAwards = await db.JudgeAwards.Where(a => a.JudgeId == judgeId).ToListAsync();
      var judgeAwardForLevel1 = new List<JudgeAward>();
      var judgeAwardForLevel2 = new List<JudgeAward>();

      if (!string.IsNullOrEmpty(dto.AwardId)) {
        judgeAwards = await judgeAwards.Where(a => a.AwardId == dto.AwardId).ToListAsync();
      }

      if (dto.Level.HasValue) {
        if (dto.Level.Value == JudgeLevel.Level1) {
          judgeAwardForLevel1 = judgeAwards.Where(a => a.Level == JudgeLevel.Level1).ToList();
        } else if (dto.Level.Value == JudgeLevel.Level2) {
          judgeAwardForLevel2 = judgeAwards.Where(a => a.Level == JudgeLevel.Level2).ToList();
        }
      } else {
        judgeAwardForLevel1 = judgeAwards.Where(a => a.Level == JudgeLevel.Level1).ToList();
        judgeAwardForLevel2 = judgeAwards.Where(a => a.Level == JudgeLevel.Level2).ToList();
      }


      var remaining_level1Artworks = new List<ArtworkForJudgingDto>();
      foreach (var award in judgeAwardForLevel1) {
        var result = await GetArtworksForJudgeAndLevel(db, award.AwardId, judgeId, JudgeLevel.Level1, false);
        remaining_level1Artworks.AddRange(result);
      }

      var remaining_level2Artworks = new List<ArtworkForJudgingDto>();
      foreach (var award in judgeAwardForLevel2) {
        var result = await GetArtworksForJudgeAndLevel(db, award.AwardId, judgeId, JudgeLevel.Level2, false);
        remaining_level2Artworks.AddRange(result);
      }


      var done_level1Artworks = new List<ArtworkForJudgingDto>();
      foreach (var award in judgeAwardForLevel1) {
        var result = await GetArtworksForJudgeAndLevel(db, award.AwardId, judgeId, JudgeLevel.Level1, true);
        done_level1Artworks.AddRange(result);
      }

      var done_level2Artworks = new List<ArtworkForJudgingDto>();
      foreach (var award in judgeAwardForLevel2) {
        var result = await GetArtworksForJudgeAndLevel(db, award.AwardId, judgeId, JudgeLevel.Level2, true);
        done_level2Artworks.AddRange(result);
      }

      return IfFound(new {
        Totals = new {
          Level1Artworks = remaining_level1Artworks.Count + done_level1Artworks.Count,
          Level2Artworks = remaining_level2Artworks.Count + done_level2Artworks.Count
        },
        Remaining = new {
          Level1Artworks = remaining_level1Artworks.Count,
          Level2Artworks = remaining_level2Artworks.Count,
        }
      });

    }


    [HttpPost("my-judges")]
    [HasPermission(Permissions.ViewMyJudges)]
    public async Task<IActionResult> MyJudges(
     [FromBody] JudgeStatisticsFilter dto,
     [FromServices] IUserResolver userResolver,
     [FromServices] IAppUnitOfWork db) {
      var managerId = (await userResolver.CurrentUserAsync())?.Id;
      var myAward = await db.Awards.FindAsync(dto.AwardId);
      if (myAward == null || myAward.ManagerId != managerId) {
        throw new ApiException(ApiErrorType.NotFound, "record not found");
      }
      var judgeAwards = await db.JudgeAwards.Include(a => a.Judge).Where(a => a.AwardId == myAward.Id).ToListAsync();
      var resultList = new List<JudgeStatisticsDto>();
      var query = await judgeAwards.DefaultIfEmpty().GroupBy(a => a.Judge).ToListAsync();
      foreach (var judgeWork in query) {
        var judgeAwardForLevel1 = new List<JudgeAward>();
        var judgeAwardForLevel2 = new List<JudgeAward>();

        if (dto.Level.HasValue) {
          if (dto.Level.Value == JudgeLevel.Level1) {
            judgeAwardForLevel1 = judgeWork.Where(a => a.Level == JudgeLevel.Level1).ToList();
          } else if (dto.Level.Value == JudgeLevel.Level2) {
            judgeAwardForLevel2 = judgeWork.Where(a => a.Level == JudgeLevel.Level2).ToList();
          }
        } else {
          judgeAwardForLevel1 = judgeWork.Where(a => a.Level == JudgeLevel.Level1).ToList();
          judgeAwardForLevel2 = judgeWork.Where(a => a.Level == JudgeLevel.Level2).ToList();
        }


        var remaining_level1Artworks = new List<ArtworkForJudgingDto>();
        foreach (var award in judgeAwardForLevel1) {
          var result = await GetArtworksForJudgeAndLevel(db, award.AwardId, award.JudgeId, JudgeLevel.Level1, false);
          remaining_level1Artworks.AddRange(result);
        }

        var remaining_level2Artworks = new List<ArtworkForJudgingDto>();
        foreach (var award in judgeAwardForLevel2) {
          var result = await GetArtworksForJudgeAndLevel(db, award.AwardId, award.JudgeId, JudgeLevel.Level2, false);
          remaining_level2Artworks.AddRange(result);
        }


        var done_level1Artworks = new List<ArtworkForJudgingDto>();
        foreach (var award in judgeAwardForLevel1) {
          var result = await GetArtworksForJudgeAndLevel(db, award.AwardId, award.JudgeId, JudgeLevel.Level1, true);
          done_level1Artworks.AddRange(result);
        }

        var done_level2Artworks = new List<ArtworkForJudgingDto>();
        foreach (var award in judgeAwardForLevel2) {
          var result = await GetArtworksForJudgeAndLevel(db, award.AwardId, award.JudgeId, JudgeLevel.Level2, true);
          done_level2Artworks.AddRange(result);
        }

        resultList.Add(new JudgeStatisticsDto {
          JudgeId = judgeWork.Key.Id,
          JudgeFullName = judgeWork.Key.FullName,
          Totals = new ArtworkStatisticsTotalDto {
            Level1Artworks = remaining_level1Artworks.Count + done_level1Artworks.Count,
            Level2Artworks = remaining_level2Artworks.Count + done_level2Artworks.Count
          },
          Remaining = new ArtworkStatisticsTotalDto {
            Level1Artworks = remaining_level1Artworks.Count,
            Level2Artworks = remaining_level2Artworks.Count,
          }
        });
      }


      return IfFound(resultList);

    }

    [HttpGet("getCommetsListByMedia")]
    [HasPermission(Permissions.AddCommentToArtworkVideo)]
    public async Task<IActionResult> GetCommetsListByMediaAsync(string id, [FromServices] IAppUnitOfWork db) {
      List<JudgeCommentDto> judgeCommentDtoto = null;
      var getCommetnsList = db.JudgeComments.
        Include(j => j.Judge).
        Where(c => c.MediaFileId == id).
        OrderByDescending(x => x.Id).
        ToList();
      judgeCommentDtoto = _mapper.Map<List<JudgeCommentDto>>(getCommetnsList);
      return IfFound(judgeCommentDtoto);

    }

    [HttpPost("submitJudgeComment")]
    [HasPermission(Permissions.AddCommentToArtworkVideo)]
    public async Task<IActionResult> SubmitJudgeComment([FromBody] NewJudgeCommentDto dto, [FromServices] IAppUnitOfWork db) {
      var judgeObj = new JudgeComment();
      judgeObj.JudgeId = dto.JudgeId;
      judgeObj.MediaFileId = dto.MediaFileId;
      judgeObj.MediaTime = dto.MediaTime;
      judgeObj.Comments = dto.Comments;
      await db.Set<JudgeComment>().AddAsync(_mapper.Map<JudgeComment>(judgeObj));
      await db.CommitTransactionAsync();

      return Ok();
    }


    [HttpPost("final-thoughts")]
    [HasPermission(Permissions.UpdateArtworkFinalThoughts)]
    public async Task<IActionResult> CloseJudgeWithFinalThoughts(
      [FromServices] IUserResolver userResolver,
      [FromBody] JudgeCompleteWithFinalThoughtDto dto,
      [FromServices] IAppUnitOfWork db,
      [FromServices] IOptions<AdminOptions> adminOptions,
      [FromServices] IVotingCalculator calculator
    ) {

      var sysOptions = db.SystemOptions.FirstOrDefault();
      if (sysOptions != null && sysOptions.AllJudgeFinished) {
        throw new ApiException(ApiErrorType.BadRequest, "Judge is closed, you cannot submit any updates");
      }

      var userId = (await userResolver.CurrentUserAsync())?.Id;
      var artwork = await db.Artworks.FindAsync(dto.ArtworkId);
      if (artwork == null) {
        throw new ApiException(ApiErrorType.NotFound, "record not found");
      }

      var isValidArtworkForJudge = await db.JudgeAwards.AnyAsync(a => a.JudgeId == userId && a.AwardId == artwork.AwardId && a.Level == dto.Level);
      if (isValidArtworkForJudge == false) {
        throw new ApiException(ApiErrorType.NotFound, "artwork is not in judge's award");
      }

      var artworkScore = await db.ArtworkScores.FirstOrDefaultAsync(a => a.JudgeId == userId && a.ArtworkId == dto.ArtworkId && a.Level == dto.Level);
      if (artworkScore != null) {
        throw new ApiException(ApiErrorType.BadRequest, "you already submitted the final score to this artwork");
      }

      var judgeVotes = db.JudgeVotes
                          .Include(a => a.Criteria)
                          .Where(a => a.ArtworkId == artwork.Id && a.JudgeId == userId)
                          .ProjectTo<JudgeVoteValues>(_mapper.ConfigurationProvider);

      var results = calculator.CalculateTotalsFor(judgeVotes);

      artworkScore = new JudgeArtworkScore();
      artworkScore.JudgeId = userId;
      artworkScore.ArtworkId = artwork.Id;
      artworkScore.Level = dto.Level;
      artworkScore.ScoreTotal = results.ScoreTotal;
      artworkScore.Score = results.Score;
      artworkScore.Percentage = results.Percentage;
      artworkScore.FinalThoughts = dto.FinalThoughts;

      await db.ArtworkScores.AddAsync(artworkScore);

      if (dto.Level == JudgeLevel.Level1) {
        if (results.Percentage >= adminOptions.Value.Level1Threshold) {
          artwork.IllegibleForJudge = true;
        } else {
          artwork.IllegibleForJudge = false;
        }

        db.Artworks.Update(artwork);
      }

      return Ok();
    }

  }

}