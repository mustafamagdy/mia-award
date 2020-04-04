using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using MIA.Authorization.Entities;

namespace MIA.Authorization {
  public class PermissionDto {
    public short Id { get; set; }
    public string Group { get; set; }
    public string Name { get; set; }
    public SystemModules SystemModule { get; set; }
  }
}