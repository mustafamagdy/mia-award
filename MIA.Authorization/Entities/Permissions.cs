using System;
using System.ComponentModel.DataAnnotations;
using MIA.Authorization.Attributes;

namespace MIA.Authorization.Entities {
  public enum Permissions : short {
    NotSet = 0,

    //News
    [PermissionDescriptor(SystemModules.Admin, "view_news", "Read news")]
    NewsRead = 1,
    [PermissionDescriptor(SystemModules.Admin, "add_news", "add a new news")]
    NewsAddNew = 2,
    [PermissionDescriptor(SystemModules.Admin, "remove_news", "remove news")]
    NewsRemove = 3,
    [PermissionDescriptor(SystemModules.Admin, "edit_news", "edit news")]
    NewsEdit = 4,
    [PermissionDescriptor(SystemModules.Admin, "change_news_status", "change news status")]
    NewsChangeStatus = 5,


    //Voting
    [PermissionDescriptor(SystemModules.Admin, "view_voting", "Can read voting criteria")]
    ReadVoting = 6,
    [PermissionDescriptor(SystemModules.Admin, "add_voting", "add a new voting")]
    VotingAddNew = 7,
    [PermissionDescriptor(SystemModules.Admin, "remove_voting", "remove voting")]
    VotingRemove = 8,
    [PermissionDescriptor(SystemModules.Admin, "edit_voting", "edit voting")]
    VotingEdit = 9,
    [PermissionDescriptor(SystemModules.Admin, "change_voting_status", "change voting status")]
    VotingChangeStatus = 10,

    [PermissionDescriptor(SystemModules.Admin, "view_roles", "Can read roles")]
    ReadRoles,
    [PermissionDescriptor(SystemModules.Admin, "edit_roles", "edit roles")]
    RolesEdit,
    [PermissionDescriptor(SystemModules.Admin, "view_permissions", "Can read employees data")]
    ReadPermissions,
    [PermissionDescriptor(SystemModules.Admin, "view_role_permissions", "Can read employees data")]
    ReadRolePermissions,
    [PermissionDescriptor(SystemModules.Admin, "remove_role_permission", "Can read employees data")]
    RemoveRolePermissions,
    [PermissionDescriptor(SystemModules.Admin, "read_user_roles", "Can read employees data")]
    ReadUserRoles,
    [PermissionDescriptor(SystemModules.Admin, "remove_user_from_role", "Can read employees data")]
    RemoveUserFromRole,
    [PermissionDescriptor(SystemModules.Admin, "add_user_to_role", "Can read employees data")]
    AddUserToRole,

    //User
    [PermissionDescriptor(SystemModules.Admin, "view_user", "Can read user criteria")]
    ReadUser,
    [PermissionDescriptor(SystemModules.Admin, "add_user", "add a new user")]
    UserAddNew,
    [PermissionDescriptor(SystemModules.Admin, "remove_user", "remove user")]
    UserRemove,
    [PermissionDescriptor(SystemModules.Admin, "edit_user", "edit user")]
    UserEdit,

    //Artwork
    [PermissionDescriptor(SystemModules.Admin, "view_artwork", "Can read artwork ")]
    ReadArtwork,
    [PermissionDescriptor(SystemModules.Admin, "add_artwork", "add a new artwork")]
    ArtworkAddNew,
    [PermissionDescriptor(SystemModules.Admin, "remove_artwork", "remove artwork")]
    ArtworkRemove,
    [PermissionDescriptor(SystemModules.Admin, "edit_artwork", "edit artwork")]
    ArtworkEdit,
    [PermissionDescriptor(SystemModules.Admin, "artwork_list_basic_data", "Read and list artworks basic data")]
    ArtworkListBasicData,
    [PermissionDescriptor(SystemModules.Admin, "artwork_allow_file_upload", "Allow file upload for artwork")]
    ArtworkAllowFileUpload,

    //Award
    [PermissionDescriptor(SystemModules.Admin, "view_award", "Can read award ")]
    ReadAward,
    [PermissionDescriptor(SystemModules.Admin, "edit_award", "edit award")]
    AwardEdit,

    //Album
    [PermissionDescriptor(SystemModules.Admin, "view_album", "Read album")]
    AlbumRead,
    [PermissionDescriptor(SystemModules.Admin, "add_album", "add a new album")]
    AlbumAddNew,
    [PermissionDescriptor(SystemModules.Admin, "edit_album", "edit album")]
    AlbumEdit,
    [PermissionDescriptor(SystemModules.Admin, "edit_remove", "edit remove")]
    AlbumRemove,
    [PermissionDescriptor(SystemModules.Admin, "view_album_file", "Read album file")]
    AlbumFileRead,
    [PermissionDescriptor(SystemModules.Admin, "change_album_status", "make file featured")]
    AlbumChangeStatus,

    //Boths
    [PermissionDescriptor(SystemModules.Booths, "view_booths", "Can read booths")]
    BoothRead,
    [PermissionDescriptor(SystemModules.Booths, "add_booths", "Can add a new booths")]
    BoothAddNew,
    [PermissionDescriptor(SystemModules.Booths, "remove_booths", "remove booths")]
    BoothRemove,
    [PermissionDescriptor(SystemModules.Booths, "manage_payments", "Can read booths payments")]
    BoothPayment,
    [PermissionDescriptor(SystemModules.Booths, "change_booths_status", "change new booths")]
    BoothChangeStatus,

    [PermissionDescriptor(SystemModules.Booths, "edit_booths", "edit booths")]
    BoothEdit,
    //Judge
    [PermissionDescriptor(SystemModules.Judge, "list_judge_artworks", "Can read employees data")]
    JudgeArtworkList,



    //Client side dont move or change, add before this line
    [PermissionDescriptor(SystemModules.Nominee, "NomineePolicy", "Nominee policy to access all nominee sections")]
    NomineeAccess = 1000,

    //[PermissionDescriptor(SystemModules.Admin, "AccessAll", "This allows the user to access every feature")]
    //AccessAll = Int16.MaxValue,

  }
}