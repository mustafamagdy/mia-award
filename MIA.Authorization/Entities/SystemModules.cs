using System;

namespace MIA.Authorization.Entities {
  [Flags]
  public enum SystemModules : long {
    Dashboard = 1 << 1,
    Adminstration = 1 << 2, 
    Booths = 1 << 4,
    Gallery = 1 << 5,
    Nominee = 1 << 6,
    Judge = 1 << 7,
  }
}
