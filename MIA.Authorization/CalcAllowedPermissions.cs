using System.Linq;
using System.Reflection;
using MIA.Authorization.Attributes;
using MIA.Authorization.Context;
using MIA.Authorization.Entities;
using Microsoft.AspNetCore.Identity;

namespace MIA.Authorization {
  /// <summary>
  /// This is the code that calculates what feature permissions a user has
  /// </summary>
  public class CalcAllowedPermissions {
    private readonly IPermissionsDbContext<string, IdentityUserRole<string>, AppRole> _context;

    public CalcAllowedPermissions(IPermissionsDbContext<string, IdentityUserRole<string>, AppRole> context) {
      _context = context;
    }

    /// <summary>
    /// This is called if the Permissions that a user needs calculating.
    /// It looks at what permissions the user has, and then filters out any permissions
    /// they aren't allowed because they haven't get access to the module that permission is linked to.
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>a string containing the packed permissions</returns>
    public string CalcPermissionsForUserAsync(string userId) {
      //This gets all the permissions, with a distinct to remove duplicates
      var permissionsForUser = (
          from ur in _context.UserRoles
          join role in _context.Roles on ur.RoleId equals role.Id
          where ur.UserId == userId
          select role.PermissionsInRole)
        .SelectMany(x => x).Distinct();

      //we get the modules this user is allowed to see
      var userModules = _context.UserModules.Find(userId)
                          ?.AllowedModules ?? SystemModules.Dashboard;
      //Now we remove permissions that are linked to modules that the user has no access to
      var filteredPermissions =
        from permission in permissionsForUser
        let moduleAttr = typeof(Permissions).GetMember(permission.ToString())[0]
          .GetCustomAttribute<PermissionDescriptorAttribute>()
        where moduleAttr != null && userModules.HasFlag(moduleAttr.SystemModule)
        select permission;
        //where moduleAttr == null || userModules.HasFlag(moduleAttr.SystemModule)
      return filteredPermissions.DefaultIfEmpty().PackPermissionsIntoString();
    }

  }
}