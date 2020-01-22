using System;
using System.ComponentModel.DataAnnotations;
using MIA.Authorization.Attributes;

namespace MIA.Authorization.Entities {
  public enum Permissions : short {
    NotSet = 0, //error condition

    //Here is an example of very detailed control over something
    [LinkedToModule(SystemModules.News)]
    [Display(GroupName = "News", Name = "view", Description = "Can read employees")]
    NewsRead = 10,
    [LinkedToModule(SystemModules.News)]
    [Display(GroupName = "News", Name = "add_new", Description = "Can add a new employees item")]
    NewsAddNew = 13,
    [LinkedToModule(SystemModules.News)]
    [Display(GroupName = "News", Name = "remove", Description = "Can read employees data")]
    NewsRemove = 14,

    //todo: complete permissions data
    [LinkedToModule(SystemModules.Adminstration)]
    [Display(GroupName = "roles", Name = "view", Description = "Can read employees data")]
    ReadRoles,
    [LinkedToModule(SystemModules.Adminstration)]
    [Display(GroupName = "roles", Name = "list", Description = "Can read employees data")]
    ReadPermissions,
    [LinkedToModule(SystemModules.Adminstration)]
    [Display(GroupName = "roles", Name = "read_permissions", Description = "Can read employees data")]
    ReadRolePermissions,
    [LinkedToModule(SystemModules.Adminstration)]
    [Display(GroupName = "roles", Name = "remove_permissions", Description = "Can read employees data")]
    RemoveRolePermissions,
    [LinkedToModule(SystemModules.Adminstration)]
    [Display(GroupName = "roles", Name = "read_user_roles", Description = "Can read employees data")]
    ReadUserRoles,
    [LinkedToModule(SystemModules.Adminstration)]
    [Display(GroupName = "roles", Name = "remove_user_from_role", Description = "Can read employees data")]
    RemoveUserFromRole,
    [LinkedToModule(SystemModules.Adminstration)]
    [Display(GroupName = "roles", Name = "add_user_to_role", Description = "Can read employees data")]
    AddUserToRole,


    //This is an example of what to do with permission you don't used anymore.
    //You don't want its number to be reused as it could cause problems 
    //Just mark it as obsolete and the PermissionDisplay code won't show it
    [Obsolete]
    [Display(GroupName = "Old", Name = "Not used", Description = "example of old permission")]
    OldPermissionNotUsed = 100,
   

    [Display(GroupName = "SuperAdmin", Name = "AccessAll", Description = "This allows the user to access every feature")]
    AccessAll = Int16.MaxValue,


  
  }
}