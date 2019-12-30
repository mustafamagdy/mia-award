using System.Linq;
using System.Threading.Tasks;
using MIA.Models.Entities;
using MIA.ORMContext;

using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Administration.Controllers
{
    [Authorize(Roles = Constants.ADMIN_ROLE)]
    public class UsersController : Controller
    {
        private readonly IAppUnitOfWork _db;
        private readonly IHostingEnvironment hostingEnvironment;
        private readonly UserManager<AppUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public UsersController(IAppUnitOfWork db, IHostingEnvironment environment, UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager
            )
        {
            this._db = db;
            hostingEnvironment = environment;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }


        public IActionResult Index()
        {
            return View();
        }

        [Route("[controller]/all-users")]
        public IActionResult GetUsers()
        {
            var users = (from u in _db.Users
                         join ur in _db.UserRoles on u.Id equals ur.UserId
                         join r in _db.Roles on ur.RoleId equals r.Id
                         select new
                         {
                             firstName = u.FirstName,
                             lastName = u.LastName,
                             email = u.Email,
                             userName = u.UserName,
                             //enabled = u.Enabled,
                             role = r.Name
                         }
                      ).ToList();


            var usersData = new { draw = 1, recordsTotal = 10, recordsFiltered = 10, data = users };
            return Json(usersData);
        }

        [HttpPost]
        [Route("[controller]/toggleStatus/{userName}")]
        [Authorize(Roles = Constants.ADMIN_ROLE)]
        public async Task<IActionResult> ToggleStatus(string userName)
        {
            var user = await _db.Users.FirstOrDefaultAsync(x => x.UserName == userName);
            bool isAdmin = await userManager.IsInRoleAsync(user, Constants.ADMIN_ROLE);
            if (isAdmin)
            {
                return Forbid();
            }

            //user.Enabled = !user.Enabled;
            //await userManager.SetLockoutEnabledAsync(user, user.Enabled);
            await userManager.SetLockoutEnabledAsync(user, true);

            return Ok();
        }
    }
}