using System;

namespace MIA.Authorization.Entities {
  /// <summary>
  /// This is an example of how you would manage what optional parts of your system a user can access
  /// NOTE: You can add Display attributes (as done on Permissions) to give more information about a module
  /// </summary>
  [Flags]
  public enum SystemModules : long {
    None = 1 << 1,
    Adminstration = 1 << 2,
    News = 1 << 3,
    Booths = 1 << 4,
    Gallery = 1 << 5
  }
}
