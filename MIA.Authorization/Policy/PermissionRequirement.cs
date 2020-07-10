using System;
using Microsoft.AspNetCore.Authorization;

namespace MIA.Authorization.Policy {

  /// <summary>
  /// requirements to be met this should be used as a policy for Permission attribute
  /// </summary>
  public class PermissionRequirement : IAuthorizationRequirement {
    public PermissionRequirement(string permissionNames) {
      PermissionNames = permissionNames ?? throw new ArgumentNullException(nameof(permissionNames));
    }

    public string PermissionNames { get; }
  }
}