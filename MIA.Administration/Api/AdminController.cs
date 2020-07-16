using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MIA.Administration.Api.Base;
using MIA.Administration.Dto.User;
using MIA.Api.Base;
using MIA.Authorization;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using MIA.Dto.Admin;
using MIA.Exceptions;
using MIA.Models.Entities;
using MIA.ORMContext;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using X.PagedList;

namespace MIA.Administration.Api {
  /// <summary>
  /// Admin tasks controller
  /// </summary>
#if (Versioning)
  [ApiVersion("1.0")]
#endif
  [Route("api/admin")]
  [Authorize]
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

    [HttpGet("user/{userId}")]
    [HasPermission(Permissions.ReadUser)]
    public async Task<IActionResult> GetUser(
      [FromRoute]string userId,
      [FromServices] UserManager<AppUser> userManager) {
      var user = await userManager.FindByIdAsync(userId);
      if (user == null) {
        throw new ApiException(ApiErrorType.NotFound, "user not found");
      }

      var result = _mapper.Map<UserWithRolesDto>(user);
      var roles = await userManager.GetRolesAsync(user);
      result.Roles = roles.ToArray();
      return Ok(result);
    }

    [HttpPut("user/{userId}")]
    [HasPermission(Permissions.UserEdit)]
    public async Task<IActionResult> UpdateUser(
      [FromRoute]string userId,
      [FromBody] UserUpdateDto userDto,
      [FromServices] IUserResolver userResolver,
      [FromServices] UserManager<AppUser> userManager) {
      var currentuser = await userResolver.CurrentUserAsync();

      var user = await userManager.FindByIdAsync(userId);
      if (user == null) {
        throw new ApiException(ApiErrorType.NotFound, "user not found");
      }

      if (user.UserName.ToLower() == "admin" && currentuser.UserName.ToLower() != "admin") {
        throw new ApiException(ApiErrorType.BadRequest, "admin user can only be updated from admin user");
      }

      if (user.Email != userDto.Email) {
        user.Email = userDto.Email;
        user.EmailConfirmed = false;
      }

      user.PhoneNumber = userDto.PhoneNumber;
      user.FullName = userDto.FullName;

      await userManager.UpdateAsync(user);
      if (!string.IsNullOrEmpty(userDto.Password)) {
        var token = await userManager.GeneratePasswordResetTokenAsync(user);
        var result = await userManager.ResetPasswordAsync(user, token, userDto.Password);
        if (result.Succeeded) {
          return Ok();
        } else {
          throw new ApiException(ApiErrorType.BadRequest, result.Errors.MapTo<ErrorResult>());
        }
      }

      return Ok();
    }

    [HttpDelete("user/{userId}")]
    [HasPermission(Permissions.UserRemove)]
    public async Task<IActionResult> DeleteUser(
      [FromRoute]string userId,
      [FromServices] UserManager<AppUser> userManager) {
      var user = await userManager.FindByIdAsync(userId);
      if (user == null) {
        throw new ApiException(ApiErrorType.NotFound, "user not found");
      }

      if (user.UserName.ToLower() == "admin") {
        throw new ApiException(ApiErrorType.BadRequest, "admin user cannot be deleted");
      }

      try {
        await userManager.DeleteAsync(user);
        return Ok();
      } catch (Exception ex) {
        throw new ApiException(ex.Message);
      }
    }

    [HttpGet("roles")]
    [HasPermission(Permissions.ReadRoles)]
    public IActionResult Roles([FromServices] IAppUnitOfWork db) {
      var roles = db.Roles.MapTo<RoleDto>();
      var systemRoles = Enum.GetNames(typeof(PredefinedRoles)).Select(a => a.ToLower());
      var allRoles = roles.Select(a => {
        a.SystemRole = systemRoles.Contains(a.Name.ToLower());
        return a;
      }).ToList();
      return IfFound(allRoles);
    }

    [HttpPost("permissions")]
    [HasPermission(Permissions.ReadPermissions)]
    public IActionResult ListPermissions(BaseSearchDto dto) {
      var permissionNames = Enum.GetValues(typeof(Permissions)).Cast<short>();
      var permissions = permissionNames.Select(p => _mapper.Map<PermissionDto>((Permissions)p)).ToPagedList(dto);
      return IfFound(permissions);
    }

    [HttpGet("permissions/module/{moduleName}")]
    [HasPermission(Permissions.ReadPermissions)]
    public IActionResult ListPermissionsByModule([FromRoute] string moduleName) {
      Object systemModules;
      if (!Enum.TryParse(typeof(SystemModules), moduleName, out systemModules)) {
        throw new ApiException(ApiErrorType.NotFound, "moudle not found");
      }
      var permissionNames = Enum.GetValues(typeof(Permissions)).Cast<short>();
      var permissions = permissionNames
        .Select(p => _mapper.Map<PermissionDto>((Permissions)p))
        .Where(x => x.SystemModule == (SystemModules)systemModules).ToList();
      return IfFound(permissions);
    }

    [HttpGet("role/modules")]
    [HasPermission(Permissions.ReadRoles)]
    public async Task<IActionResult> ListModules() {
      var modules = Enum.GetNames(typeof(SystemModules));
      return IfFound(modules);
    }

    [HttpGet("permissions")]
    [HasPermission(Permissions.ReadPermissions)]
    public async Task<IActionResult> ListAllPermissions([FromServices] IAppUnitOfWork db) {
      var permissions = Enum.GetValues(typeof(Permissions)).Cast<Permissions>().MapTo<PermissionDto>();
      return IfFound(permissions);
    }

    [HttpGet("role/{roleName}/permissions")]
    [HasPermission(Permissions.ReadRolePermissions)]
    public async Task<IActionResult> ListRolePermissions([FromRoute]string roleName, [FromServices] IAppUnitOfWork db) {
      var role = await db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName);
      if (role == null) {
        throw new ApiException(ApiErrorType.NotFound, "role not found");
      }

      var rolePermissions = db.Roles
        .Where(x => x.Name.ToLower() == roleName.ToLower())
        .SelectMany(x => x.PermissionsInRole)
        .AsEnumerable()
        .MapTo<PermissionDto>();

      return IfFound(rolePermissions);
    }

    [HttpPost("createRole/{roleName}")]
    [HasPermission(Permissions.EditRole)]
    public async Task<IActionResult> CreateRole(
      [FromRoute] string roleName,
      [FromServices] RoleManager<AppRole> roleManager,
      [FromServices] IAppUnitOfWork db) {

      if (await roleManager.FindByNameAsync(roleName.ToLower()) == null) {
        await roleManager.CreateAsync(
          new AppRole(roleName) {
            Name = roleName.ToString().ToLower(),
            NormalizedName = roleName.ToString().ToUpper(),
            Permissions = "",
          });
      }
      return Ok();
    }

    [HttpPut("updateRole/{originalName}/{newName}")]
    [HasPermission(Permissions.EditRole)]
    public async Task<IActionResult> UpdateRoleName(
      [FromRoute] string originalName,
      [FromRoute] string newName,
      [FromServices] RoleManager<AppRole> roleManager,
      [FromServices] IAppUnitOfWork db) {

      if (originalName.Trim().ToLower() == PredefinedRoles.Administrator.ToString().ToLower()
          || newName.Trim().ToLower() == PredefinedRoles.Administrator.ToString().ToLower()) {
        throw new ApiException(ApiErrorType.BadRequest, "Admin role cannot be modified");
      }

      var role = await roleManager.FindByNameAsync(originalName.ToLower());
      if (role == null) {
        throw new ApiException(ApiErrorType.NotFound, "role not found");

      }

      role.Name = newName;
      await roleManager.UpdateAsync(role);

      return Ok();
    }


    [HttpPost("role/{roleName}/permissions/{permissionId}")]
    [HasPermission(Permissions.ManageRolePermissions)]
    public async Task<IActionResult> AddPermissionToRole([FromRoute] string roleName,
      [FromRoute]short permissionId,
      [FromServices] IAppUnitOfWork db) {
      var role = await db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName.ToLower());
      if (role == null) {
        throw new ApiException(ApiErrorType.NotFound, "role not found");
      }

      if (role.Name.ToLower() == PredefinedRoles.Administrator.ToString().ToLower()) {
        throw new ApiException(ApiErrorType.BadRequest, "Admin role cannot be modified");
      }

      Permissions permission;
      if (!Enum.TryParse(permissionId.ToString(), out permission)) {
        throw new ApiException(ApiErrorType.NotFound, "permission not found or not allowed");
      }

      //check if the role doesn't have any permsion
      if (role.Permissions != null) {
        var exists = role.Permissions.Contains((char)permission);
        if (!exists) {
          var moduleAttribute = permission.GetAttribute<PermissionDescriptorAttribute>();
          role.Permissions += (char)permission;
          if (moduleAttribute != null) {
            await UpdateUserModuleForRole(role, moduleAttribute.SystemModule, db, false);
          }
        }
      } else {
        var moduleAttribute = permission.GetAttribute<PermissionDescriptorAttribute>();
        role.Permissions += (char)permission;
        if (moduleAttribute != null) {
          await UpdateUserModuleForRole(role, moduleAttribute.SystemModule, db, false);
        }
      }

      return Ok(role);
    }

    private async Task UpdateUserModuleForRole(AppRole role, SystemModules module, IAppUnitOfWork db, bool remove) {
      var roleUsers = await db.UserRoles.Where(a => a.RoleId == role.Id).Select(a => a.UserId).ToArrayAsync();
      if (roleUsers.Any()) {
        var users = db.Users.Where(a => roleUsers.Contains(a.Id));
        foreach (var user in users) {
          var userModule = await db.UserModules.FirstOrDefaultAsync(a => a.UserId == user.Id);
          if (userModule == null && !remove) {
            userModule = new UserModule(user.Id, module);
            await db.UserModules.AddAsync(userModule);
          } else if (userModule != null && ((userModule.AllowedModules & module) == 0) && !remove) {
            //add user to this module
            userModule.AllowedModules |= module;
          } else if (userModule != null && remove) {
            userModule.AllowedModules &= ~module;
          }
        }
      }
    }

    [HttpDelete("role/{roleName}/permissions/{permissionId}")]
    [HasPermission(Permissions.ManageRolePermissions)]
    public async Task<IActionResult> RemovePermissionFromRole([FromRoute] string roleName, [FromRoute]short permissionId,
      [FromServices] IAppUnitOfWork db) {
      var role = await db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName.ToLower());
      if (role == null) {
        throw new ApiException(ApiErrorType.NotFound, "role not found");
      }

      if (role.Name.ToLower() == PredefinedRoles.Administrator.ToString().ToLower()) {
        throw new ApiException(ApiErrorType.BadRequest, "Admin role cannot be modified");
      }

      Permissions permission;
      if (!Enum.TryParse(permissionId.ToString(), out permission)) {
        throw new ApiException(ApiErrorType.NotFound, "permission not found or not allowed");
      }

      var exists = role.Permissions.Contains((char)permission);
      if (exists) {
        role.Permissions = role.Permissions.Remove(role.Permissions.IndexOf((char)permission), 1);
        var moduleAttribute = permission.GetAttribute<PermissionDescriptorAttribute>();
        if (moduleAttribute != null) {
          var modulePermissions = Enum.GetValues(typeof(Permissions))
            .Cast<Permissions>()
            .Where(a => a.GetAttribute<PermissionDescriptorAttribute>() != null
                        && a.GetAttribute<PermissionDescriptorAttribute>().SystemModule == moduleAttribute.SystemModule)
            .ToArray();
          var unpacked = role.Permissions.UnpackPermissionsFromString();
          //if this is no permission in this module for this role, remove users from this module
          if (!unpacked.Intersect(modulePermissions).Any()) {
            await UpdateUserModuleForRole(role, moduleAttribute.SystemModule, db, true);
          }
        }
      }

      return Ok(role);
    }


    [HttpPost("role/{roleName}/user/{userId}")]
    [HasPermission(Permissions.AddUserToRole)]
    public async Task<IActionResult> AddUserToRole([FromRoute] string roleName, [FromRoute] string userId,
      [FromServices] IAppUnitOfWork db, [FromServices] UserManager<AppUser> userManager) {
      var user = await db.Users.FindAsync(userId);
      if (user == null) {
        throw new ApiException(ApiErrorType.NotFound, "user not found");
      }

      var role = await db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName.ToLower());
      if (role == null) {
        throw new ApiException(ApiErrorType.NotFound, "role not found");
      }

      await userManager.AddToRoleAsync(user, roleName);
      var rolePermissions = role.Permissions.UnpackPermissionsFromString();
      var modules = rolePermissions
                            .Select(a => a.GetAttribute<PermissionDescriptorAttribute>().SystemModule)
                            .Distinct()
                            .ToArray();

      var userModule = (await db.UserModules.FirstOrDefaultAsync(a => a.UserId == userId)) ?? new UserModule(userId, SystemModules.Dashboard);
      foreach (var module in modules) {
        if ((userModule.AllowedModules & module) == 0) {
          userModule.AllowedModules |= module;
        }
      }

      if (await db.UserModules.FirstOrDefaultAsync(a => a.UserId == userId) == null) {
        await db.UserModules.AddAsync(userModule);
      }

      return Ok();
    }

    [HttpDelete("role/{roleName}/user/{userId}")]
    [HasPermission(Permissions.RemoveUserFromRole)]
    public async Task<IActionResult> RemoveUserToRole([FromRoute] string roleName, [FromRoute] string userId,
      [FromServices] IAppUnitOfWork db, [FromServices] UserManager<AppUser> userManager) {
      var user = await db.Users.FindAsync(userId);
      if (user == null) {
        throw new ApiException(ApiErrorType.NotFound, "user not found");
      }

      var role = await db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName.ToLower());
      if (role == null) {
        throw new ApiException(ApiErrorType.NotFound, "role not found");
      }

      await userManager.RemoveFromRoleAsync(user, roleName);
      var rolePermissions = role.Permissions.UnpackPermissionsFromString();
      var modules = rolePermissions
        .Select(a => a.GetAttribute<PermissionDescriptorAttribute>().SystemModule)
        .Distinct()
        .ToArray();

      var userModule = (await db.UserModules.FirstOrDefaultAsync(a => a.UserId == userId)) ?? new UserModule(userId, SystemModules.Dashboard);
      foreach (var module in modules) {
        if ((userModule.AllowedModules & module) != 0) {
          userModule.AllowedModules &= ~module;
        }
      }


      return Ok();
    }

    [HttpGet("user/{userId}/roles")]
    [HasPermission(Permissions.ReadUserRoles)]
    public async Task<IActionResult> ListUserRoles([FromRoute] string userId, [FromServices] IAppUnitOfWork db, [FromServices] UserManager<AppUser> userManager) {
      var user = await db.Users.FindAsync(userId);
      if (user == null) {
        throw new ApiException(ApiErrorType.NotFound, "user not found");
      }
      var roles = await userManager.GetRolesAsync(user);
      return IfFound(roles);
    }

    [HttpGet("role/{roleName}/users")]
    [HasPermission(Permissions.ReadUserRoles)]
    public async Task<IActionResult> ListRoleUsers([FromRoute] string roleName, [FromServices] IAppUnitOfWork db, [FromServices] UserManager<AppUser> userManager) {
      var role = db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName.ToLower());
      if (role == null) {
        throw new ApiException(ApiErrorType.NotFound, "role not found");
      }
      var users = await userManager.GetUsersInRoleAsync(roleName);

      return IfFound(users.MapTo<ProfileDto>());
    }

    [HttpPost("user/{userId}/toggle")]
    [HasPermission(Permissions.UserEdit)]
    public async Task<IActionResult> ToggleUserStatus([FromRoute] string userId,
      [FromServices] IAppUnitOfWork db,
      [FromServices] UserManager<AppUser> userManager) {
      var user = await db.Users.FindAsync(userId);
      if (user == null) {
        throw new ApiException(ApiErrorType.NotFound, "user not found");
      }
      if (user.UserName.ToLower() == "admin") {
        throw new ApiException(ApiErrorType.BadRequest, "Admin user cannot be modified");
      }

      user.Active = !user.Active;
      await userManager.UpdateAsync(user);

      return Ok();
    }

  }
}