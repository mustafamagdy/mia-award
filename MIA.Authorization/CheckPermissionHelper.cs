using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using MIA.Authorization.Entities;

namespace MIA.Authorization {
  public static class CheckPermissionHelper {
    /// <summary>
    /// This is used by the policy provider to check the permission name string
    /// </summary>
    /// <param name="packedPermissions"></param>
    /// <param name="permissionName"></param>
    /// <returns></returns>
    public static bool ThisPermissionIsAllowed(this string packedPermissions, string[] permissionNames) {
      var usersPermissions = packedPermissions.UnpackPermissionsFromString().ToArray();
      var requiredPermissions = new List<Permissions>();
      if (permissionNames == null || permissionNames.Length == 0) {
        throw new InvalidEnumArgumentException("Not valid permission requirements");
      }
      foreach (var permissionName in permissionNames) {
        if (!Enum.TryParse(permissionName, true, out Permissions permissionToCheck))
          throw new InvalidEnumArgumentException($"{permissionName} could not be converted to a {nameof(Permissions)}.");
        requiredPermissions.Add(permissionToCheck);
      }

      return usersPermissions.UserHasThisPermission(requiredPermissions.ToArray());
    }

    /// <summary>
    /// This is the main checker of whether a user permissions allows them to access something with the given permission
    /// </summary>
    /// <param name="usersPermissions"></param>
    /// <param name="permissionToCheck"></param>
    /// <returns></returns>
    public static bool UserHasThisPermission(this Permissions[] usersPermissions, Permissions[] permissionToCheck) {
      var result = usersPermissions.Intersect(permissionToCheck);

      return result.Any()
      //|| usersPermissions.Contains(Permissions.AccessAll)
      ;
    }
  }
}