using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Identity;

namespace MIA.Authorization.Entities {
  /// <summary>
  /// This holds each Roles, which are mapped to Permissions
  /// </summary>
  public class AppRole : IdentityRole {

    [Required(AllowEmptyStrings = false)] //A role must have at least one permission in it
    private string _permissionsInRole;

    /// <summary>
    /// A human-friendly description of what the Role does
    /// </summary>
    public string Description { get; private set; }

    /// <summary>
    /// This returns the list of permissions in this role
    /// </summary>
    public IEnumerable<Permissions> PermissionsInRole => _permissionsInRole.UnpackPermissionsFromString();

    public string Permissions {
      get => _permissionsInRole;
      set => _permissionsInRole = value;
    }
  }

  public enum PredefinedRoles {
    [EnumMember(Value = "nominee")]
    Nominee,
    [EnumMember(Value = "admin")]
    Administrator,
    [EnumMember(Value = "judge")]
    Judge,
    [EnumMember(Value = "demo")]
    Demo
  }
}