using System;
using System.Linq;
using MIA.Authorization.Entities;
using Microsoft.AspNetCore.Authorization;

namespace MIA.Authorization.Attributes {
  [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = false)]
  public class HasPermissionAttribute : AuthorizeAttribute {
    public HasPermissionAttribute(params Permissions[] permissions)
      : base(string.Join(",", permissions.Select(a => a.ToString()))) { }
  }
}