using System;
using System.ComponentModel.DataAnnotations;
using MIA.Authorization.Attributes;

namespace MIA.Authorization.Entities
{
  public enum Permissions : short
  {
    NotSet = 0,

    [PermissionDescriptor(SystemModules.News, "view", "Can read employees")]
    NewsRead = 10,
    [PermissionDescriptor(SystemModules.News, "add_new", "Can add a new employees item")]
    NewsAddNew = 13,
    [PermissionDescriptor(SystemModules.News, "remove", "Can read employees data")]
    NewsRemove = 14,

    //todo: complete permissions data
    [PermissionDescriptor(SystemModules.Adminstration, "view", "Can read employees data")]
    ReadRoles,
    [PermissionDescriptor(SystemModules.Adminstration, "list", "Can read employees data")]
    ReadPermissions,
    [PermissionDescriptor(SystemModules.Adminstration, "read_permissions", "Can read employees data")]
    ReadRolePermissions,
    [PermissionDescriptor(SystemModules.Adminstration, "remove_permissions", "Can read employees data")]
    RemoveRolePermissions,
    [PermissionDescriptor(SystemModules.Adminstration, "read_user_roles", "Can read employees data")]
    ReadUserRoles,
    [PermissionDescriptor(SystemModules.Adminstration, "remove_user_from_role", "Can read employees data")]
    RemoveUserFromRole,
    [PermissionDescriptor(SystemModules.Adminstration, "add_user_to_role", "Can read employees data")]
    AddUserToRole,

    //Boths
    [PermissionDescriptor(SystemModules.Booths, "view", "Can read employees")]
    BoothRead,
    [PermissionDescriptor(SystemModules.Booths, "add_new", "Can add a new employees item")]
    BoothAddNew,
    [PermissionDescriptor(SystemModules.Booths, "remove", "Can read employees data")]
    BoothRemove,
    [PermissionDescriptor(SystemModules.Booths, "manage_payments", "Can read employees data")]
    BoothPayment,

    //Judge
    [PermissionDescriptor(SystemModules.Judge, "list_judge_artwork", "Can read employees data")]
    JudgeArtworkList,

    //Client side dont move or change, add before this line
    [PermissionDescriptor(SystemModules.Nominee, "NomineePolicy", "Nominee policy to access all nominee sections")]
    NomineeAccess = 1000,

    [PermissionDescriptor(SystemModules.News, "AccessAll", "This allows the user to access every feature")]
    AccessAll = Int16.MaxValue,

  }
}