using System;
using System.ComponentModel.DataAnnotations;
using MIA.Authorization.Attributes;

namespace MIA.Authorization.Entities
{
  public enum Permissions : short
  {
    NotSet = 0,

    //News
    [PermissionDescriptor(SystemModules.Adminstration, "view_news", "Read news")]
    NewsRead = 1,
    [PermissionDescriptor(SystemModules.Adminstration, "add_news", "add a new news")]
    NewsAddNew = 2,
    [PermissionDescriptor(SystemModules.Adminstration, "remove_news", "remove news")]
    NewsRemove = 3,
    [PermissionDescriptor(SystemModules.Adminstration, "edit_news", "edit news")]
    NewsEdit = 4,
    [PermissionDescriptor(SystemModules.Adminstration, "change_news_staus", "change news status")]
    NewsChangeStauts = 5,


    //Voting
    [PermissionDescriptor(SystemModules.Adminstration, "view_voting", "Can read voting criteria")]
    ReadVoting = 6,
    [PermissionDescriptor(SystemModules.Adminstration, "add_voting", "add a new voting")]
    VotingAddNew = 7,
    [PermissionDescriptor(SystemModules.Adminstration, "remove_voting", "remove voting")]
    VotingRemove = 8,
    [PermissionDescriptor(SystemModules.Adminstration, "edit_voting", "edit voting")]
    VotingEdit = 9,
    [PermissionDescriptor(SystemModules.Adminstration, "change_voting_staus", "change voting status")]
    VotingChangeStauts = 10,

    [PermissionDescriptor(SystemModules.Adminstration, "view_roles", "Can read roles")]
    ReadRoles,
    [PermissionDescriptor(SystemModules.Adminstration, "edit_roles", "edit roles")]
    RolesEdit ,
    //[PermissionDescriptor(SystemModules.Adminstration, "list", "Can read employees data")]
    //ReadPermissions,
    //[PermissionDescriptor(SystemModules.Adminstration, "read_permissions", "Can read employees data")]
    //ReadRolePermissions,
    //[PermissionDescriptor(SystemModules.Adminstration, "remove_permissions", "Can read employees data")]
    //RemoveRolePermissions,
    //[PermissionDescriptor(SystemModules.Adminstration, "read_user_roles", "Can read employees data")]
    //ReadUserRoles,
    //[PermissionDescriptor(SystemModules.Adminstration, "remove_user_from_role", "Can read employees data")]
    //RemoveUserFromRole,
    //[PermissionDescriptor(SystemModules.Adminstration, "add_user_to_role", "Can read employees data")]
    //AddUserToRole,

    //User
    [PermissionDescriptor(SystemModules.Adminstration, "view_user", "Can read user criteria")]
    ReadUser ,
    [PermissionDescriptor(SystemModules.Adminstration, "add_user", "add a new user")]
    UserAddNew  ,
    [PermissionDescriptor(SystemModules.Adminstration, "remove_user", "remove user")]
    UserRemove ,
    [PermissionDescriptor(SystemModules.Adminstration, "edit_user", "edit user")]
    UserEdit  ,

    //Artwork
    [PermissionDescriptor(SystemModules.Adminstration, "view_artwork", "Can read artwork ")]
    ReadArtwork  ,
    [PermissionDescriptor(SystemModules.Adminstration, "add_artwork", "add a new artwork")]
    ArtworkAddNew ,
    [PermissionDescriptor(SystemModules.Adminstration, "remove_artwork", "remove artwork")]
    ArtworkRemove  ,
    [PermissionDescriptor(SystemModules.Adminstration, "edit_artwork", "edit artwork")]
    ArtworkEdit ,
    [PermissionDescriptor(SystemModules.Adminstration, "artwork_list_basic_data", "Read and list artworks basic data")]
    ArtworkListBasicData,
    [PermissionDescriptor(SystemModules.Adminstration, "artwork_allow_file_upload", "Allow file upload for artwork")]
    ArtworkAllowFileUpload,

    //Award
    [PermissionDescriptor(SystemModules.Adminstration, "view_award", "Can read award ")]
    ReadAward,
    [PermissionDescriptor(SystemModules.Adminstration, "edit_award", "edit award")]
    AwardEdit,

    //Album
    [PermissionDescriptor(SystemModules.Adminstration, "view_album", "Read album")]
    AlbumRead,
    [PermissionDescriptor(SystemModules.Adminstration, "add_album", "add a new album")]
    AlbumAddNew, 
    [PermissionDescriptor(SystemModules.Adminstration, "edit_album", "edit album")]
    AlbumEdit,
    [PermissionDescriptor(SystemModules.Adminstration, "edit_remove", "edit remove")]
    AlbumRemove,
    [PermissionDescriptor(SystemModules.Adminstration, "view_album_file", "Read album file")]
    AlbumFileRead,
    [PermissionDescriptor(SystemModules.Adminstration, "change_album_staus", "make file featured")]
    AlbumChangeStauts,

    //Boths
    [PermissionDescriptor(SystemModules.Booths, "view_booths", "Can read booths")]
    BoothRead,
    [PermissionDescriptor(SystemModules.Booths, "add_booths", "Can add a new booths")]
    BoothAddNew,
    [PermissionDescriptor(SystemModules.Booths, "remove_booths", "remove booths")]
    BoothRemove,
    [PermissionDescriptor(SystemModules.Booths, "manage_payments", "Can read booths payments")]
    BoothPayment,
    [PermissionDescriptor(SystemModules.Booths, "change_booths_staus", "change new booths")]
    BoothChangeStauts,

    [PermissionDescriptor(SystemModules.Booths, "edit_booths", "edit booths")]
    BoothEdit ,
    //Judge
    [PermissionDescriptor(SystemModules.Judge, "list_judge_artworks", "Can read employees data")]
    JudgeArtworkList,



    //Client side dont move or change, add before this line
    [PermissionDescriptor(SystemModules.Nominee, "NomineePolicy", "Nominee policy to access all nominee sections")]
    NomineeAccess = 1000,

    [PermissionDescriptor(SystemModules.Adminstration, "AccessAll", "This allows the user to access every feature")]
    AccessAll = Int16.MaxValue,

  }
}