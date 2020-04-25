using AutoMapper;
using MIA.Administration.Api.Base;
using MIA.Administration.Dto.Award;
using MIA.Administration.Dto.User;
using MIA.Constants;
using MIA.Exceptions;
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
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIA.Administration.Api {

  //[Authorize]
  [EnableCors(CorsPolicyName.AllowAll)]
  [Route("api/ArtworkAwards")]
  public class AwardsController : BaseCrudController<ArtworkAward, AwardDto, NewAwardDto, UpdateAwardDto> {
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

    public override async Task<IActionResult> SaveNewAsync([FromBody] NewAwardDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.SaveNewAsync(dto, db);
      var resultDto = ((AwardDto)(result as OkObjectResult)?.Value);
      var AwardsItem = await db.ArtworkAwards.FindAsync(resultDto.Id);
      return IfFound(_mapper.Map<AwardDto>(AwardsItem));
    }

    public override async Task<IActionResult> UpdateAsync([FromBody] UpdateAwardDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.UpdateAsync(dto, db);
      var resultDto = ((AwardDto)(result as OkObjectResult)?.Value);
      var AwardsItem = await db.ArtworkAwards.FindAsync(resultDto.Id);

      var JudgeAwardItem = db.JudgeArtworkAwards.Where(x => x.AwardId == resultDto.Id).ToList();


      var deleteJudges = new JudgeArtworkAward[AwardsItem.Level2Judges.Count];
      AwardsItem.Level2Judges.CopyTo(deleteJudges, 0);

      foreach (var objJudges in deleteJudges) {
        var entity = db.Set<JudgeArtworkAward>().FirstOrDefault(a => a.Id == objJudges.Id);
        if (entity != null)
          // return NotFound404("record not found"); 
          db.Set<JudgeArtworkAward>().Remove(entity);
      }

      foreach (var roleper in dto.JudgeAwards) {
        if (AwardsItem.Level2Judges.All(x => x.JudgeId != roleper.Id)) {
          AwardsItem.Level2Judges.Add(new JudgeArtworkAward {
            JudgeId = roleper.Id
          });
        }
      }

      var entry = db.Set<ArtworkAward>().Attach(AwardsItem);
      entry.State = EntityState.Modified;
      await db.CommitTransactionAsync();

      return IfFound(_mapper.Map<AwardDto>(AwardsItem));
    }
    [HttpGet("getAwardDetails")]
    public override async Task<IActionResult> GetAsync(string id, [FromServices] IAppUnitOfWork db) {
      //var result = await base.GetAsync(id, db); 
      AwardDetailsDto returnAwardDetails = null;
      var award = await db.ArtworkAwards.FirstOrDefaultAsync(a => a.Id == id);
      var judgeItems = await db.JudgeArtworkAwards.Where(a => a.AwardId == id).ToListAsync();
      if (!judgeItems.Any()) {
        returnAwardDetails = _mapper.Map<AwardDetailsDto>(award);
        return IfFound(returnAwardDetails);
      } else {
        var returnAwardJudges = _mapper.Map<List<JudgeAwardDto>>(judgeItems);

        returnAwardDetails = _mapper.Map<AwardDetailsDto>(award);
        returnAwardDetails.JudgeAwards = returnAwardJudges;
        return IfFound(returnAwardDetails);

      }
    }


    [HttpGet("judges")]
    public async Task<IActionResult> ListOfJudges([FromServices] IAppUnitOfWork db) {
      var judges = db.Judges;
      if (judges == null) {
        throw new ApiException(ApiErrorType.NotFound, "judges not found");
      }
      return IfFound(judges.MapTo<JudgeDto>());
    }
  }

}