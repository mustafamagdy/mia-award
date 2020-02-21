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
using System.Threading.Tasks;

namespace MIA.Administration.Api {

  //[Authorize]
  [EnableCors(CorsPolicyName.AllowAll)]
  [Route("api/booths")]
  public class BoothsController : BaseCrudController<Booth, BoothsDto, NewBoothsDto, UpdateBoothsDto> {
    private readonly IHostingEnvironment env;
    private readonly IOptions<UploadLimits> limitOptions;

    public BoothsController(
          IMapper mapper,
          ILogger<BoothsController> logger,
          IStringLocalizer<BoothsController> localize,
          IHostingEnvironment env,
          IOptions<UploadLimits> limitOptions
        ) : base(mapper, logger, localize) {
      this.env = env;
      this.limitOptions = limitOptions;
    }

    public override async Task<IActionResult> SaveNewAsync([FromBody] NewBoothsDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.SaveNewAsync(dto, db);
      var resultDto = ((BoothsDto)(result as OkObjectResult)?.Value);
      var BoothsItem = await db.Booths.FindAsync(resultDto.Id);
      return IfFound(_mapper.Map<BoothsDto>(BoothsItem));
    }

    public override async Task<IActionResult> UpdateAsync([FromBody] UpdateBoothsDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.UpdateAsync(dto, db);
      var resultDto = ((BoothsDto)(result as OkObjectResult)?.Value);
      var BoothsItem = await db.Booths.FindAsync(resultDto.Id);
      return IfFound(_mapper.Map<BoothsDto>(BoothsItem));
    }
    public override async Task<IActionResult> GetAsync(string id, [FromServices] IAppUnitOfWork db) {
      var result = await base.GetAsync(id, db);
      var resultDto = ((BoothsDto)(result as OkObjectResult)?.Value);
      var boothItem = await db.Booths.FirstOrDefaultAsync(a => a.Id == resultDto.Id);
      return IfFound(_mapper.Map<BoothsDto>(boothItem));
    }
  }

}