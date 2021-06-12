using System;

namespace MIA.Authorization.Entities {
  [Flags]
  public enum SystemModules : long {
    Dashboard = 1 << 1,
    Admin = 1 << 2, 
    Booths = 1 << 3,
    Judge = 1 << 4,
    Nominee = 1 << 5,
  }
}
