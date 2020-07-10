using AutoMapper;
using AutoMapper.QueryableExtensions;
using MIA.Administration.Api.Base;
using MIA.Administration.Dto.Award;
using MIA.Administration.Dto.User;
using MIA.Constants;
using MIA.Exceptions;
using MIA.Infrastructure.Options;
using MIA.Models.Entities;
using MIA.ORMContext;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using Microsoft.AspNetCore.Authorization;
using X.PagedList;

namespace MIA.Administration.Api {

  [EnableCors(CorsPolicyName.DevOnly)]
  [Route("api/Awards")]
  [Authorize]
  public class AwardsController : BaseCrudController<Award, AwardDto, NewAwardDto, UpdateAwardDto> {
    private readonly IHostingEnvironment env;
    private readonly IOptions<UploadLimits> limitOptions;

    public AwardsController(
          IMapper mapper,
          ILogger<AwardsController> logger,
          IStringLocalizer<AwardsController> localize,
          IHostingEnvironment env,
          IOptions<UploadLimits> limitOptions
        ) : base(mapper, logger, localize) {
      this.env = env;
      this.limitOptions = limitOptions;
    }

    [HasPermission(Permissions.AwardEdit)]
    public override async Task<IActionResult> SaveNewAsync([FromBody] NewAwardDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.SaveNewAsync(dto, db);
      var resultDto = ((AwardDto)(result as OkObjectResult)?.Value);
      var AwardsItem = await db.Awards.FindAsync(resultDto.Id);
      return IfFound(_mapper.Map<AwardDto>(AwardsItem));
    }

    [HasPermission(Permissions.AwardEdit)]
    public override async Task<IActionResult> UpdateAsync([FromBody] UpdateAwardDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.UpdateAsync(dto, db);
      var resultDto = ((AwardDto)(result as OkObjectResult)?.Value);
      var AwardsItem = await db.Awards
        .Include(a => a.AllJudges)
        .FirstOrDefaultAsync(a => a.Id == resultDto.Id);

      //var JudgeAwardItem = db.JudgeAwards.Where(x => x.AwardId == resultDto.Id).ToList();

      #region Judge Level 1

      //var deleteJudgesLevel1 = new JudgeAward[AwardsItem.Level1Judges.Count];
      //AwardsItem.Level1Judges.CopyTo(deleteJudgesLevel1, 0);

      foreach (var item in dto.RemoveLevel1Judges) {
        var entity = db.Set<JudgeAward>().FirstOrDefault(a => a.JudgeId == item && a.AwardId == dto.Id && a.Level == JudgeLevel.Level1);
        if (entity != null)
          db.Set<JudgeAward>().Remove(entity);
      }

      foreach (var item in dto.AddLevel1Judges) {
        if (!AwardsItem.AllJudges.Any(x => x.JudgeId == item && x.AwardId == dto.Id && x.Level == JudgeLevel.Level1)) {
          await db.JudgeAwards.AddAsync(new JudgeAward {
            JudgeId = item,
            AwardId = AwardsItem.Id,
            Level = JudgeLevel.Level1
          });
        }
      }

      #endregion

      #region Judge Level 2
      //var deleteJudgesLevel2 = new JudgeAward[AwardsItem.Level2Judges.Count];
      //AwardsItem.Level2Judges.CopyTo(deleteJudgesLevel2, 0);

      foreach (var item in dto.RemoveLevel2Judges) {
        var entity = db.Set<JudgeAward>().FirstOrDefault(a => a.JudgeId == item && a.AwardId == dto.Id&& a.Level == JudgeLevel.Level2);
        if (entity != null)
          db.Set<JudgeAward>().Remove(entity);
      }

      foreach (var item in dto.AddLevel2Judges) {
        if (!AwardsItem.AllJudges.Any(x => x.JudgeId  == item && x.AwardId == dto.Id && x.Level == JudgeLevel.Level2)) {
          await db.JudgeAwards.AddAsync(new JudgeAward {
            JudgeId = item,
            AwardId = AwardsItem.Id,
            Level = JudgeLevel.Level2
          });
        }
      }
      #endregion

      await db.CommitTransactionAsync();

      AwardsItem = await db.Awards
        .Include(a => a.AllJudges)
        .FirstOrDefaultAsync(a => a.Id == resultDto.Id);

      return IfFound(_mapper.Map<AwardDto>(AwardsItem));
    }
   
    [HttpGet("getAwardDetails")]
    [HasPermission(Permissions.ReadAward)]
    public override async Task<IActionResult> GetAsync(string id, [FromServices] IAppUnitOfWork db) {
      AwardDetailsDto returnAwardDetails = null;
      var award = await db.Awards.FirstOrDefaultAsync(a => a.Id == id);
      var judgeItems = await db.JudgeAwards.Where(a => a.AwardId == id).ToListAsync();
      return IfFound(_mapper.Map<AwardDetailsDto>(award));
    }

    [HttpPost("for-dropdown")]
    [HasPermission(Permissions.ReadAward)]
    public async Task<IActionResult> GetAwardsForDropdown(
      [FromServices] IAppUnitOfWork db) {
      var awards = await db.Awards
                          .ProjectTo<AwardMinimumDto>(_mapper.ConfigurationProvider)
                          .ToListAsync();

      return IfFound(awards);
    }

    [HttpGet("judges")]
    [HasPermission(Permissions.ManageJudges)]
    public async Task<IActionResult> ListOfJudges([FromServices] IAppUnitOfWork db) {
      var judges = db.Judges;
      if (judges == null) {
        throw new ApiException(ApiErrorType.NotFound, "judges not found");
      }
      return IfFound(judges.MapTo<JudgeDto>());
    }

    [HttpPost("awardsByType")]
    [HasPermission(Permissions.ReadAward)]
    public async Task<IActionResult> ListOfAwardsByType(AwardFilterDto dto, [FromServices] IAppUnitOfWork db) {
      var awards = db.Awards
        .Include(m => m.Manager)
        .ThenInclude(a => a.AvatarImage)
        .Where(x => x.AwardType == dto.AwardType)
        .AsQueryable();

      if (awards == null)
        throw new ApiException(ApiErrorType.NotFound, "judges not found");

      var result = awards
                     .ProjectTo<AwardDto>(_mapper.ConfigurationProvider)
                     .ToPagedList(dto);

      return IfFound(result);

    }
  }

}