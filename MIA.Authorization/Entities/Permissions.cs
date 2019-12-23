using System;
using System.ComponentModel.DataAnnotations;
using MIA.Authorization.Attributes;

namespace MIA.Authorization.Entities {
  public enum Permissions : short {
    NotSet = 0, //error condition

    //Here is an example of very detailed control over something
    [Display(GroupName = "Employees", Name = "Read", Description = "Can read employees")]
    EmployeesRead = 10,
    [Display(GroupName = "Employees", Name = "Add new", Description = "Can add a new employees item")]
    EmployeesAddNew = 13,
    [Display(GroupName = "Employees", Name = "Remove", Description = "Can read employees data")]
    EmployeesRemove = 14,

    //todo: complete permissions data

    [Display(GroupName = "roles", Name = "read roles", Description = "Can read employees data")]
    ReadRoles,
    [Display(GroupName = "roles", Name = "list permission", Description = "Can read employees data")]
    ReadPermissions,
    [Display(GroupName = "roles", Name = "read role permissions", Description = "Can read employees data")]
    ReadRolePermissions,
    [Display(GroupName = "roles", Name = "remove permissions from role", Description = "Can read employees data")]
    RemoveRolePermissions,
    ReadUserRoles,
    RemoveUserFromRole,
    AddUserToRole,


    //This is an example of what to do with permission you don't used anymore.
    //You don't want its number to be reused as it could cause problems 
    //Just mark it as obsolete and the PermissionDisplay code won't show it
    [Obsolete]
    [Display(GroupName = "Old", Name = "Not used", Description = "example of old permission")]
    OldPermissionNotUsed = 100,

    //This is an example of a permission linked to a module
    //The code that turns roles to permissions can
    //remove this permission if the user isn't allowed to access this module
    [LinkedToModule(SystemModules.Module1)]
    [Display(GroupName = "Modules", Name = "Module1", Description = "Can access module 1")]
    Module1Access = 1000,
    [LinkedToModule(SystemModules.Module2)]
    [Display(GroupName = "Modules", Name = "Module2", Description = "Can access module 2")]
    Module2Access = 1001,

    [Display(GroupName = "SuperAdmin", Name = "AccessAll", Description = "This allows the user to access every feature")]
    AccessAll = Int16.MaxValue,


  
  }
}