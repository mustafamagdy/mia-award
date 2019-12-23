using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using MIA.Models.Entities;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using MIA.Api.Base;
using MIA.Dto.Admin;

namespace MIA.Api {
  /// <summary>
  /// Admin tasks controller
  /// </summary>
#if (Versioning)
  [ApiVersion("1.0")]
#endif
  public class AdminController : BaseApiController<AdminController> {
    private readonly IStringLocalizer<AdminController> _locale;

    /// <summary>
    /// 
    /// </summary>
    /// <param name="mapper"></param>
    /// <param name="logger"></param>
    /// <param name="locale"></param>
    public AdminController(
      IMapper mapper,
      ILogger<AdminController> logger,
      IStringLocalizer<AdminController> locale
    ) : base(logger, mapper) {
      this._locale = locale;
    }

    [HttpGet("roles")]
    [HasPermission(Permissions.ReadRoles)]
    public IActionResult Roles([FromServices] IAppUnitOfWork db) {
      return IfFound(db.Roles.MapTo<RoleDto>());
    }

    [HttpGet("permissions")]
    [HasPermission(Permissions.ReadPermissions)]
    public IActionResult ListPermissions() {
      var permissionNames = Enum.GetValues(typeof(Permissions)).Cast<short>();
      var permissions = permissionNames.Select(p => _mapper.Map<PermissionDto>((Permissions)p)).ToList();
      return IfFound(permissions);
    }

    [HttpGet("role/{roleName}/permissions")]
    [HasPermission(Permissions.ReadRolePermissions)]
    public async Task<IActionResult> ListRolePermissions([FromRoute]string roleName, [FromServices] IAppUnitOfWork db) {
      var role = await db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName);
      if (role == null) {
        return NotFound404("role not found");
      }

      var rolePermissions = db.Roles
        .Where(x => x.Name.ToLower() == roleName.ToLower())
        .SelectMany(x => x.PermissionsInRole)
        .AsEnumerable()
        .MapTo<PermissionDto>();

      return IfFound(rolePermissions);
    }

    [HttpPost("role/{roleName}/permissions/{permissionId}")]
    [HasPermission(Permissions.ReadRolePermissions)]
    public async Task<IActionResult> AddPermissionToRole([FromRoute] string roleName, [FromRoute]short permissionId,
      [FromServices] IAppUnitOfWork db) {
      var role = await db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName.ToLower());
      if (role == null) {
        return NotFound404("role not found");
      }

      Permissions permission;
      if (!Enum.TryParse(permissionId.ToString(), out permission)) {
        return NotFound404("permission not found or not allowed");
      }

      var exists = role.Permissions.Contains((char)permission);
      if (!exists) {
        role.Permissions += (char)permission;
      }

      return Ok(role);
    }

    [HttpDelete("role/{roleName}/permissions/{permissionId}")]
    [HasPermission(Permissions.RemoveRolePermissions)]
    public async Task<IActionResult> RemovePermissionFromRole([FromRoute] string roleName, [FromRoute]short permissionId,
      [FromServices] IAppUnitOfWork db) {
      var role = await db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName.ToLower());
      if (role == null) {
        return NotFound404("role not found");
      }

      Permissions permission;
      if (!Enum.TryParse(permissionId.ToString(), out permission)) {
        return NotFound404("permission not found or not allowed");
      }

      var exists = role.Permissions.Contains((char)permission);
      if (exists) {
        role.Permissions.Remove(role.Permissions.IndexOf((char)permission));
      }

      return Ok(role);
    }


    [HttpPost("role/{roleName}/user/{userId}")]
    [HasPermission(Permissions.AddUserToRole)]
    public async Task<IActionResult> AddUserToRole([FromRoute] string roleName, [FromRoute] string userId,
      [FromServices] IAppUnitOfWork db, [FromServices] UserManager<AppUser> userManager) {
      var user = await db.Users.FindAsync(userId);
      if (user == null) {
        return NotFound404("user not found");
      }

      var role = db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName.ToLower());
      if (role == null) {
        return NotFound404("role not found");
      }

      await userManager.AddToRoleAsync(user, roleName);
      return Ok();
    }

    [HttpDelete("role/{roleName}/user/{userId}")]
    [HasPermission(Permissions.RemoveUserFromRole)]
    public async Task<IActionResult> RemoveUserToRole([FromRoute] string roleName, [FromRoute] string userId,
      [FromServices] IAppUnitOfWork db, [FromServices] UserManager<AppUser> userManager) {
      var user = await db.Users.FindAsync(userId);
      if (user == null) {
        return NotFound404("user not found");
      }

      var role = db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName.ToLower());
      if (role == null) {
        return NotFound404("role not found");
      }

      await userManager.RemoveFromRoleAsync(user, roleName);
      return Ok();
    }

    [HttpGet("user/{userId}/roles")]
    [HasPermission(Permissions.ReadUserRoles)]
    public async Task<IActionResult> ListUserRoles([FromRoute] string userId, [FromServices] IAppUnitOfWork db, [FromServices] UserManager<AppUser> userManager) {
      var user = await db.Users.FindAsync(userId);
      if (user == null) {
        return NotFound404("user not found");
      }
      var roles = await userManager.GetRolesAsync(user);
      return IfFound(roles);
    }

    [HttpGet("role/{roleName}/users")]
    [HasPermission(Permissions.ReadUserRoles)]
    public async Task<IActionResult> ListRoleUsers([FromRoute] string roleName, [FromServices] IAppUnitOfWork db, [FromServices] UserManager<AppUser> userManager) {
      var role = db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName.ToLower());
      if (role == null) {
        return NotFound404("role not found");
      }
      var users = await userManager.GetUsersInRoleAsync(roleName);

      return IfFound(users.MapTo<ProfileDto>());
    }



  }
}