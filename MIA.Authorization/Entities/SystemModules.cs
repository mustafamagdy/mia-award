using System;

namespace MIA.Authorization.Entities
{
  /// <summary>
  /// This is an example of how you would manage what optional parts of your system a user can access
  /// NOTE: You can add Display attributes (as done on Permissions) to give more information about a module
  /// </summary>
  [Flags]
  public enum SystemModules : long {
    None = 0,
    Module1 = 1,
    Module2 = 2,
    Module3 = 3
  }
}
