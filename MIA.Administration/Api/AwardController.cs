using AutoMapper;
using MIA.Administration.Api.Base;
using MIA.Administration.Dto.Award;
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

namespace MIA.Administration.Api
{

    //[Authorize]
    [EnableCors(CorsPolicyName.AllowAll)]
    [Route("api/Awards")]
    public class AwardsController : BaseCrudController<Award, AwardDto, NewAwardDto, UpdateAwardDto>
    {
        private readonly IHostingEnvironment env;
        private readonly IOptions<UploadLimits> limitOptions;

        public AwardsController(
              IMapper mapper,
              ILogger<AwardsController> logger,
              IStringLocalizer<AwardsController> localize,
              IHostingEnvironment env,
              IOptions<UploadLimits> limitOptions
            ) : base(mapper, logger, localize)
        {
            this.env = env;
            this.limitOptions = limitOptions;
        }

        public override async Task<IActionResult> SaveNewAsync([FromBody] NewAwardDto dto, [FromServices] IAppUnitOfWork db)
        {
            var result = await base.SaveNewAsync(dto, db);
            var resultDto = ((AwardDto)(result as OkObjectResult)?.Value);
            var AwardsItem = await db.Awards.FindAsync(resultDto.Id);
            return IfFound(_mapper.Map<AwardDto>(AwardsItem));
        }

        public override async Task<IActionResult> UpdateAsync([FromBody] UpdateAwardDto dto, [FromServices] IAppUnitOfWork db)
        {
            var result = await base.UpdateAsync(dto, db);
            var resultDto = ((AwardDto)(result as OkObjectResult)?.Value);
            var AwardsItem = await db.Awards.FindAsync(resultDto.Id);
            return IfFound(_mapper.Map<AwardDto>(AwardsItem));
        }

    }

}