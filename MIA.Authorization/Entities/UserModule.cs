using System;
using System.ComponentModel.DataAnnotations;

namespace MIA.Authorization.Entities {
  /// <summary>
  /// This holds what modules a user or tenant has
  /// </summary>
  public class UserModule {
    /// <summary>
    /// This links modules to a user
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="allowedModules"></param>
    public UserModule(string userId, SystemModules allowedModules) {
      UserId = userId ?? throw new ArgumentNullException(nameof(userId));
      AllowedModules = allowedModules;
    }

    [Key]
    [MaxLength(100)]
    public string UserId { get; private set; }

    public SystemModules AllowedModules { get; private set; }
  }
}