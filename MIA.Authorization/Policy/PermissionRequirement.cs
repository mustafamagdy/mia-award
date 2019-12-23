using System;
using Microsoft.AspNetCore.Authorization;

namespace MIA.Authorization.Policy {

  /// <summary>
  /// requirements to be met this should be used as a policy for Permission attribute
  /// </summary>
  public class PermissionRequirement : IAuthorizationRequirement {
    public PermissionRequirement(string permissionName) {
      PermissionName = permissionName ?? throw new ArgumentNullException(nameof(permissionName));
    }

    public string PermissionName { get; }
  }
}