using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MIA.Api.Base;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using MIA.Models.Entities;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using X.PagedList;

namespace MIA.Administration.Api {
  /// <summary>
  /// 
  /// </summary>
#if Versioning
  [ApiVersion("1.0")]
#endif
  [Route("api/system")]
  [Authorize]
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


    private AwardWinners[] GetGroupedWinners(Award award) {
      var res = award.Artworks
        .Select(x => {
          var level2Scores = x.FinalScores.Where(a => a.Level == JudgeLevel.Level2).ToArray();
          return new ArtworkFinalResult {
            ArtworkId = x.Id,
            ProjectName = x.ProjectName,
            AwardId = x.Award.Id,
            AwardName = x.Award.Title,
            AwardType = x.Award.AwardType,

            Avg = level2Scores.Select(n => n.Percentage).DefaultIfEmpty(0).Average(),
            Min = level2Scores.Select(n => n.Percentage).DefaultIfEmpty(0).Min(),
            Max = level2Scores.Select(n => n.Percentage).DefaultIfEmpty(0).Max(),
          };
        });

      var winners = res.OrderByDescending(a => a.Avg).Take(2).ToArray();
      var groupedWinners = winners
        .GroupBy(a => new { a.AwardId, a.AwardName, a.AwardType })
        .Select(a => {

          ArtworkFinalResult first = null;
          ArtworkFinalResult second = null;

          if (a.Any()) {
            first = a.First();
            if (a.Count() > 1) {
              second = a.Skip(1).FirstOrDefault();
            }
          }

          return new AwardWinners {
            AwardId = a.Key.AwardId,
            AwardName = a.Key.AwardName,
            AwardType = a.Key.AwardType,
            First = first,
            Second = second
          };
        })
        .ToArray();

      return groupedWinners;
    }

    [HttpPost("close-all")]
    [HasPermission(Permissions.CloseJudging)]
    public async Task<IActionResult> CloseJudging(
      [FromServices] IAppUnitOfWork db) {
      var sysOptions = db.SystemOptions.FirstOrDefault();
      if (sysOptions == null) {
        sysOptions = new SystemOptions();
      }

      var results = new List<AwardWinners>();
      var awards = await db.Awards
        .Include(a => a.Artworks)
        .ThenInclude(a => a.FinalScores)
        .AsNoTracking()
        .ToArrayAsync();

      foreach (var award in awards) {
        var groupedWinners = GetGroupedWinners(award);
        results.AddRange(groupedWinners);
      }

      if (!sysOptions.AllJudgeFinished) {
        foreach (var awardWinners in results) {
          var theAward = await db.Awards.FindAsync(awardWinners.AwardId);
          theAward.FirstPlaceId = awardWinners.First?.ArtworkId;
          theAward.SecondPlaceId = awardWinners.Second?.ArtworkId;
        }

        sysOptions.AllJudgeFinished = true;
      }

      return Ok(results);
    }
    [HttpGet("check-system-results")]
    [HasPermission(Permissions.CloseJudging)]
    public async Task<IActionResult> GetSystemResults(
      [FromServices] IAppUnitOfWork db) {
      var sysOptions = db.SystemOptions.FirstOrDefault();
      if (sysOptions == null) {
        sysOptions = new SystemOptions();
      }

      if (!sysOptions.AllJudgeFinished)
        return Ok(new {
          status = sysOptions.AllJudgeFinished,
        });

      var finalResults = new List<AwardWinners>();
      var awards = await db.Awards
        .Include(a => a.Artworks)
        .ThenInclude(a => a.FinalScores)
        .AsNoTracking()
        .ToArrayAsync();

      foreach (var award in awards) {
        var groupedWinners = GetGroupedWinners(award);
        finalResults.AddRange(groupedWinners);
      }

      return Ok(new {
        status = sysOptions.AllJudgeFinished,
        results = finalResults
      });
    }
  }

  public class AwardWinners {
    public string AwardId { get; set; }
    public LocalizedData AwardName { get; set; }
    public AwardType AwardType { get; set; }
    public ArtworkFinalResult First { get; set; }
    public ArtworkFinalResult Second { get; set; }
  }

  public class ArtworkFinalResult {
    public string ArtworkId { get; set; }
    public LocalizedData ProjectName { get; set; }
    public string AwardId { get; set; }
    public LocalizedData AwardName { get; set; }
    public AwardType AwardType { get; set; }

    public decimal Avg { get; set; }
    public decimal Min { get; set; }
    public decimal Max { get; set; }
  }
}