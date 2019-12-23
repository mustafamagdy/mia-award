using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using MIA.Authorization.Entities;

namespace MIA.Authorization {
  public static class PermissionExtensions {
    /// <summary>
    /// This returns true if the current user has the permission
    /// </summary>
    /// <param name="user"></param>
    /// <param name="permission"></param>
    /// <returns></returns>
    public static bool UserHasThisPermission(this ClaimsPrincipal user, Permissions permission) {
      var permissionClaim =
        user?.Claims.SingleOrDefault(x => x.Type == PermissionConstants.PackedPermissionClaimType);
      return permissionClaim?.Value.UnpackPermissionsFromString().ToArray().UserHasThisPermission(permission) == true;
    }

    public static string GetUserIdFromClaims(this IEnumerable<Claim> claims) {
      return claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
    }


    public static string PackPermissionsIntoString(this IEnumerable<Permissions> permissions) {
      return permissions.Aggregate("", (s, permission) => s + (char)permission);
    }

    public static IEnumerable<Permissions> UnpackPermissionsFromString(this string packedPermissions) {
      if (packedPermissions == null) {
        throw new ArgumentNullException(nameof(packedPermissions));
      }

      foreach (var character in packedPermissions) {
        yield return ((Permissions)character);
      }
    }

    public static Permissions? FindPermissionByName(this string permissionName) {
      return Enum.TryParse(permissionName, out Permissions permission)
        ? (Permissions?)permission
        : null;
    }


  }
}