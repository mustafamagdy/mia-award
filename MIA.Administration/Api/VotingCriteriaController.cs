using AutoMapper;
using MIA.Administration.Api.Base;
using MIA.Constants;
using MIA.Infrastructure.Options;
using MIA.Models.Entities;
using MIA.ORMContext;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIA.Administration.Api
{

  //[Authorize]
  [EnableCors(CorsPolicyName.AllowAll)]
  [Route("api/votingCriterias")]
  public class VotingCriteriasController : BaseCrudController<VotingCriteria, VotingCriteriasDto, NewVotingCriteriasDto, UpdateVotingCriteriasDto>
  {
    private readonly IHostingEnvironment env;
    private readonly IOptions<UploadLimits> limitOptions;

    public VotingCriteriasController(
          IMapper mapper,
          ILogger<VotingCriteriasController> logger,
          IStringLocalizer<VotingCriteriasController> localize,
          IHostingEnvironment env,
          IOptions<UploadLimits> limitOptions
        ) : base(mapper, logger, localize)
    {
      this.env = env;
      this.limitOptions = limitOptions;
    }

    public override async Task<IActionResult> SaveNewAsync([FromBody] NewVotingCriteriasDto dto, [FromServices] IAppUnitOfWork db)
    {
      var result = await base.SaveNewAsync(dto, db);
      var resultDto = ((VotingCriteriasDto)(result as OkObjectResult)?.Value);
      var VotingCriteriasItem = await db.VotingCriterias.FindAsync(resultDto.Id);
      return IfFound(_mapper.Map<VotingCriteriasDto>(VotingCriteriasItem));
    }

    public override async Task<IActionResult> UpdateAsync([FromBody] UpdateVotingCriteriasDto dto, [FromServices] IAppUnitOfWork db)
    {
      var result = await base.UpdateAsync(dto, db);
      var resultDto = ((VotingCriteriasDto)(result as OkObjectResult)?.Value);
      var VotingCriteriasItem = await db.VotingCriterias.FindAsync(resultDto.Id);
      return IfFound(_mapper.Map<VotingCriteriasDto>(VotingCriteriasItem));
    }
    [HttpPost("getVotingCriteriaByAward")]
    public async Task<IActionResult> getVotingCriteriaByAwardAsync(BaseSearchIdDto dto, [FromServices] IAppUnitOfWork db)
    {
      var votingCriterias = db.VotingCriterias.Where(a => a.AwardId == dto.Id).ToList();
      var returnVoting = _mapper.Map<List<VotingCriteriasDto>>(votingCriterias).ToPagedList(dto);
      return IfFound(returnVoting);

    }
  }

}