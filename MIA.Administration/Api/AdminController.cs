using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MIA.Administration.Api.Base;
using MIA.Api.Base;
using MIA.Authorization;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using MIA.Dto.Admin;
using MIA.Exceptions;
using MIA.Models.Entities;
using MIA.ORMContext;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using X.PagedList;

namespace MIA.Administration.Api
{
  /// <summary>
  /// Admin tasks controller
  /// </summary>
#if (Versioning)
  [ApiVersion("1.0")]
#endif
  [Route("api/admin")]

  public class AdminController : BaseApiController<AdminController>
  {
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
    ) : base(logger, mapper)
    {
      this._locale = locale;
    }

    [HttpGet("roles")]
    // //[HasPermission(Permissions.ReadRoles)]
    public IActionResult Roles([FromServices] IAppUnitOfWork db)
    {
      var roles = db.Roles.MapTo<RoleDto>();
      var systemRoles = Enum.GetNames(typeof(PredefinedRoles)).Select(a => a.ToLower());
      var allRoles = roles.Select(a =>
      {
        a.SystemRole = systemRoles.Contains(a.Name.ToLower());
        return a;
      }).ToList();
      return IfFound(allRoles);
    }

    [HttpPost("permissions")]
    // //[HasPermission(Permissions.ReadPermissions)]
    public IActionResult ListPermissions(BaseSearchDto dto)
    {
      var permissionNames = Enum.GetValues(typeof(Permissions)).Cast<short>();
      var permissions = permissionNames.Select(p => _mapper.Map<PermissionDto>((Permissions)p)).ToPagedList(dto);
      //var result = permissions
      //              .ProjectTo<PermissionDto>(_mapper.ConfigurationProvider)
      //              .ToPagedList(dto);

      return IfFound(permissions);
      //return IfFound(permissions);
    }

    [HttpGet("permissions/module/{moduleName}")]
    // //[HasPermission(Permissions.ReadPermissions)]
    public IActionResult ListPermissionsByModule([FromRoute] string moduleName)
    {
      Object systemModules;
      if (!Enum.TryParse(typeof(SystemModules), moduleName, out systemModules))
      {
        throw new ApiException(ApiErrorType.NotFound, "moudle not found");
      }
      var permissionNames = Enum.GetValues(typeof(Permissions)).Cast<short>();
      var permissions = permissionNames
        .Select(p => _mapper.Map<PermissionDto>((Permissions)p))
        .Where(x => x.SystemModule == (SystemModules)systemModules).ToList();
      return IfFound(permissions);
    }
    [HttpGet("role/modules")]
    ////[HasPermission(Permissions.ReadRoleModules)]
    public async Task<IActionResult> ListModules()
    {
      var modules = Enum.GetNames(typeof(SystemModules));
      return IfFound(modules);
    }
    [HttpGet("role/{roleName}/permissions")]
    ////[HasPermission(Permissions.ReadRolePermissions)]
    public async Task<IActionResult> ListRolePermissions([FromRoute]string roleName, [FromServices] IAppUnitOfWork db)
    {
      var role = await db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName);
      if (role == null)
      {
        throw new ApiException(ApiErrorType.NotFound, "role not found");
      }

      var rolePermissions = db.Roles
        .Where(x => x.Name.ToLower() == roleName.ToLower())
        .SelectMany(x => x.PermissionsInRole)
        .AsEnumerable()
        .MapTo<PermissionDto>();

      return IfFound(rolePermissions);
    }

    [HttpPost("role/createRole/{roleName}")]
    //[HasPermission(Permissions.ReadRolePermissions)]
    public async Task<IActionResult> CreateRole([FromRoute] string roleName, RoleManager<AppRole> roleManager, [FromServices] IAppUnitOfWork db)
    {
      if (await roleManager.FindByNameAsync(roleName.ToString().ToLower()) == null)
      {
        await roleManager.CreateAsync(
          new AppRole(roleName)
          {
            Name = roleName.ToString().ToLower(),
            NormalizedName = roleName.ToString().ToUpper()
          });
      }
      return Ok();
    }
    [HttpPost("role/{roleName}/permissions/{permissionId}")]
    //[HasPermission(Permissions.ReadRolePermissions)]
    public async Task<IActionResult> AddPermissionToRole([FromRoute] string roleName, 
      [FromRoute]short permissionId,
      [FromServices] IAppUnitOfWork db)
    {
      var role = await db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName.ToLower());
      if (role == null)
      {
        throw new ApiException(ApiErrorType.NotFound, "role not found");
      }

      Permissions permission;
      if (!Enum.TryParse(permissionId.ToString(), out permission))
      {
        throw new ApiException(ApiErrorType.NotFound, "permission not found or not allowed");
      }
      
      //check if the role doesn't have any permsion
      if (role.Permissions != null)
      {
        var exists = role.Permissions.Contains((char)permission);
        if (!exists)
        {
          var moduleAttribute = permission.GetAttribute<PermissionDescriptorAttribute>();
          role.Permissions += (char)permission;
          if (moduleAttribute != null)
          {
            await UpdateUserModuleForRole(role, moduleAttribute.SystemModule, db, false);
          }
        }
      }
      else
      {
        var moduleAttribute = permission.GetAttribute<PermissionDescriptorAttribute>();
        role.Permissions += (char)permission;
        if (moduleAttribute != null) {
          await UpdateUserModuleForRole(role, moduleAttribute.SystemModule, db, false);
        }
      }

      return Ok(role);
    }

    private async Task UpdateUserModuleForRole(AppRole role, SystemModules module, IAppUnitOfWork db,bool remove)
    {
      var roleUsers = await db.UserRoles.Where(a => a.RoleId == role.Id).Select(a=>a.UserId).ToArrayAsync();
      if (roleUsers.Any())
      {
        var users = db.Users.Where(a => roleUsers.Contains(a.Id));
        foreach (var user in users)
        {
          var userModule = await db.UserModules.FirstOrDefaultAsync(a => a.UserId == user.Id);
          if (userModule == null && !remove) {
            userModule = new UserModule(user.Id, module);
            await db.UserModules.AddAsync(userModule);
          }
          else if (userModule  != null && ((userModule.AllowedModules & module) == 0) && !remove)
          {
            //add user to this module
            userModule.AllowedModules |= module;
          }
          else if(userModule != null && remove)
          {
            userModule.AllowedModules &= ~module;
          }
        }
      }
    }

    [HttpDelete("role/{roleName}/permissions/{permissionId}")]
    //[HasPermission(Permissions.RemoveRolePermissions)]
    public async Task<IActionResult> RemovePermissionFromRole([FromRoute] string roleName, [FromRoute]short permissionId,
      [FromServices] IAppUnitOfWork db)
    {
      var role = await db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName.ToLower());
      if (role == null)
      {
        throw new ApiException(ApiErrorType.NotFound, "role not found");
      }
      
      Permissions permission;
      if (!Enum.TryParse(permissionId.ToString(), out permission))
      {
        throw new ApiException(ApiErrorType.NotFound, "permission not found or not allowed");
      }

      var exists = role.Permissions.Contains((char)permission);
      if (exists)
      {
        role.Permissions = role.Permissions.Remove(role.Permissions.IndexOf((char)permission),1);
        var moduleAttribute = permission.GetAttribute<PermissionDescriptorAttribute>();
        if (moduleAttribute != null) {
          var modulePermissions = Enum.GetValues(typeof(Permissions))
            .Cast<Permissions>()
            .Where(a => a.GetAttribute<PermissionDescriptorAttribute>() != null 
                        && a.GetAttribute<PermissionDescriptorAttribute>().SystemModule == moduleAttribute.SystemModule)
            .ToArray();
          var unpacked = role.Permissions.UnpackPermissionsFromString();
          //if this is no permission in this module for this role, remove users from this module
          if (!unpacked.Intersect(modulePermissions).Any())
          {
            await UpdateUserModuleForRole(role, moduleAttribute.SystemModule, db, true);
          }
        }
      }

      return Ok(role);
    }


    [HttpPost("role/{roleName}/user/{userId}")]
    //[HasPermission(Permissions.AddUserToRole)]
    public async Task<IActionResult> AddUserToRole([FromRoute] string roleName, [FromRoute] string userId,
      [FromServices] IAppUnitOfWork db, [FromServices] UserManager<AppUser> userManager)
    {
      var user = await db.Users.FindAsync(userId);
      if (user == null)
      {
        throw new ApiException(ApiErrorType.NotFound, "user not found");
      }

      var role = db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName.ToLower());
      if (role == null)
      {
        throw new ApiException(ApiErrorType.NotFound, "role not found");
      }

      await userManager.AddToRoleAsync(user, roleName);
      return Ok();
    }

    [HttpDelete("role/{roleName}/user/{userId}")]
    //[HasPermission(Permissions.RemoveUserFromRole)]
    public async Task<IActionResult> RemoveUserToRole([FromRoute] string roleName, [FromRoute] string userId,
      [FromServices] IAppUnitOfWork db, [FromServices] UserManager<AppUser> userManager)
    {
      var user = await db.Users.FindAsync(userId);
      if (user == null)
      {
        throw new ApiException(ApiErrorType.NotFound, "user not found");
      }

      var role = db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName.ToLower());
      if (role == null)
      {
        throw new ApiException(ApiErrorType.NotFound, "role not found");
      }

      await userManager.RemoveFromRoleAsync(user, roleName);
      return Ok();
    }

    [HttpGet("user/{userId}/roles")]
    //[HasPermission(Permissions.ReadUserRoles)]
    public async Task<IActionResult> ListUserRoles([FromRoute] string userId, [FromServices] IAppUnitOfWork db, [FromServices] UserManager<AppUser> userManager)
    {
      var user = await db.Users.FindAsync(userId);
      if (user == null)
      {
        throw new ApiException(ApiErrorType.NotFound, "user not found");
      }
      var roles = await userManager.GetRolesAsync(user);
      return IfFound(roles);
    }

    [HttpGet("role/{roleName}/users")]
    //[HasPermission(Permissions.ReadUserRoles)]
    public async Task<IActionResult> ListRoleUsers([FromRoute] string roleName, [FromServices] IAppUnitOfWork db, [FromServices] UserManager<AppUser> userManager)
    {
      var role = db.Roles.FirstOrDefaultAsync(x => x.Name.ToLower() == roleName.ToLower());
      if (role == null)
      {
        throw new ApiException(ApiErrorType.NotFound, "role not found");
      }
      var users = await userManager.GetUsersInRoleAsync(roleName);

      return IfFound(users.MapTo<ProfileDto>());
    }



  }
}