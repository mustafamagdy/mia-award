using AutoMapper;
using MIA.Administration.Api.Base;
using MIA.Administration.Dto.User;
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
    [Route("api/Users")]
    public class UsersController : BaseCrudController<AppUser, UserDto, NewUserDto, UpdateUserDto>
    {
        private readonly IHostingEnvironment env;
        private readonly IOptions<UploadLimits> limitOptions;

        public UsersController(
              IMapper mapper,
              ILogger<UsersController> logger,
              IStringLocalizer<UsersController> localize,
              IHostingEnvironment env,
              IOptions<UploadLimits> limitOptions
            ) : base(mapper, logger, localize)
        {
            this.env = env;
            this.limitOptions = limitOptions;
        }

        public override async Task<IActionResult> SaveNewAsync([FromBody] NewUserDto dto, [FromServices] IAppUnitOfWork db)
        {
            var result = await base.SaveNewAsync(dto, db);
            var resultDto = ((UserDto)(result as OkObjectResult)?.Value);
            var UsersItem = await db.Users.FindAsync(resultDto.Id);
            return IfFound(_mapper.Map<UserDto>(UsersItem));
        }

        public override async Task<IActionResult> UpdateAsync([FromBody] UpdateUserDto dto, [FromServices] IAppUnitOfWork db)
        {
            var result = await base.UpdateAsync(dto, db);
            var resultDto = ((UserDto)(result as OkObjectResult)?.Value);
            var UsersItem = await db.Users.FindAsync(resultDto.Id);
            return IfFound(_mapper.Map<UserDto>(UsersItem));
        }

    }

}