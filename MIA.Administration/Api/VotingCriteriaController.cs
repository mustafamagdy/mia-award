using System.Linq;
using AutoMapper;
using MIA.Administration.Api.Base;
using MIA.Constants;
using MIA.Infrastructure.Options;
using MIA.Models.Entities;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using MIA.Exceptions;
using MIA.ORMContext;
using Microsoft.AspNetCore.Authorization;

namespace MIA.Administration.Api {

  [EnableCors(CorsPolicyName.DevOnly)]
  [Route("api/votingCriterias")]
  [Authorize]
  public class VotingCriteriasController : BaseCrudController<VotingCriteria, VotingCriteriasDto, NewVotingCriteriasDto, UpdateVotingCriteriasDto> {
    private readonly IHostingEnvironment env;
    private readonly IOptions<UploadLimits> limitOptions;

    public VotingCriteriasController(
          IMapper mapper,
          ILogger<VotingCriteriasController> logger,
          IStringLocalizer<VotingCriteriasController> localize,
          IHostingEnvironment env,
          IOptions<UploadLimits> limitOptions
        ) : base(mapper, logger, localize) {
      this.env = env;
      this.limitOptions = limitOptions;
    }

    [HttpPost("filterByAward")]
    [HasPermission(Permissions.ReadVotingCriteria)]
    public async Task<IActionResult> FilterByAward(
      [FromBody] VotingCriteriaSearchDto dto,
      [FromServices] IAppUnitOfWork db) {
      var criterias = db.VotingCriterias.AsQueryable();
      if (!string.IsNullOrEmpty(dto.AwardId)) {
        criterias = criterias.Where(a => a.AwardId == dto.AwardId);
      }

      if (dto.Level != null) {
        criterias = criterias.Where(a => a.Level == dto.Level.Value);
      }

      var result = await criterias
                        .ProjectTo<VotingCriteriasDto>(_mapper.ConfigurationProvider)
                        .ToPagedListAsync(dto);

      return IfFound(result);
    }

    [HasPermission(Permissions.VotingCriteriaAddNew)]
    public override async Task<IActionResult> SaveNewAsync([FromBody] NewVotingCriteriasDto dto, [FromServices] IAppUnitOfWork db) {
      var sysOptions = db.SystemOptions.FirstOrDefault();
      if (sysOptions != null && sysOptions.AllJudgeFinished) {
        throw new ApiException(ApiErrorType.BadRequest, "Judge is closed, you cannot submit any updates");
      }

      var result = await base.SaveNewAsync(dto, db);
      var resultDto = ((VotingCriteriasDto)(result as OkObjectResult)?.Value);
      var VotingCriteriasItem = await db.VotingCriterias.FindAsync(resultDto.Id);
      return IfFound(_mapper.Map<VotingCriteriasDto>(VotingCriteriasItem));
    }

    [HasPermission(Permissions.VotingCriteriaEdit)]
    public override async Task<IActionResult> UpdateAsync([FromBody] UpdateVotingCriteriasDto dto, [FromServices] IAppUnitOfWork db) {

      var sysOptions = db.SystemOptions.FirstOrDefault();
      if (sysOptions != null && sysOptions.AllJudgeFinished) {
        throw new ApiException(ApiErrorType.BadRequest, "Judge is closed, you cannot submit any updates");
      }

      var result = await base.UpdateAsync(dto, db);
      var resultDto = ((VotingCriteriasDto)(result as OkObjectResult)?.Value);
      var VotingCriteriasItem = await db.VotingCriterias.FindAsync(resultDto.Id);
      return IfFound(_mapper.Map<VotingCriteriasDto>(VotingCriteriasItem));
    }

  }

}