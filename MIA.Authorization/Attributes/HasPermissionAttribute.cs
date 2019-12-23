using System;
using MIA.Authorization.Entities;
using Microsoft.AspNetCore.Authorization;

namespace MIA.Authorization.Attributes
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = false)]
    public class HasPermissionAttribute : AuthorizeAttribute
    {
        public HasPermissionAttribute(Permissions permission) : base(permission.ToString())
        { }
    }
}