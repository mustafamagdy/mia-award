using System;
using System.ComponentModel.DataAnnotations;
using MIA.Authorization.Attributes;

namespace MIA.Authorization.Entities {
  public enum Permissions : short {
    /*
     * Admin:
     *    10- Roles (view, add, edit, remove, add/remove permissions, list permissions)
     *    20- Users (view, add, edit, remove, add/remove to/from role)
     *    30- News (view, add, edit, remove)
     *    40- Albums (view, add, edit, remove)
     *    50- Award (view, assign/remove judge to/from award) 
     *    60- Artwork (view, view basic data, approve artwork) 
     *    70- Voting criteria (view, add, edit, remove)
     *    80- System (close judging and calc finals)
     *
     * Booths:
     *    100- Booths (view, switch status, view payment)
     *
     * Judge:
     *    200- Judge screen(view judged artwork, update artwork vote, update final thoughts, add comments to video, remove comments from video)
     *    210- Statistics & Management (view my judges, view artwork scores, view artwork judge details, view award statistics)
     *
     *
     *
     */


    NotSet = 0,

    //Roles
    [PermissionDescriptor(SystemModules.Admin, "view_roles", "read roles")]
    ReadRoles = 10,
    [PermissionDescriptor(SystemModules.Admin, "edit_roles", "edit roles")]
    EditRole,
    [PermissionDescriptor(SystemModules.Admin, "view_permissions", "read permissions")]
    ReadPermissions,
    [PermissionDescriptor(SystemModules.Admin, "view_role_permissions", "read role permissions")]
    ReadRolePermissions,
    [PermissionDescriptor(SystemModules.Admin, "manage_role_permissions", "manage role permissions")]
    ManageRolePermissions,
    [PermissionDescriptor(SystemModules.Admin, "read_user_roles", "read user role")]
    ReadUserRoles,
    [PermissionDescriptor(SystemModules.Admin, "remove_user_from_role", "remove user from role")]
    RemoveUserFromRole,
    [PermissionDescriptor(SystemModules.Admin, "add_user_to_role", "add user to role")]
    AddUserToRole,

    //User
    [PermissionDescriptor(SystemModules.Admin, "view_user", "read user")]
    ReadUser = 20,
    [PermissionDescriptor(SystemModules.Admin, "add_user", "add new user")]
    UserAddNew,
    [PermissionDescriptor(SystemModules.Admin, "remove_user", "remove user")]
    UserRemove,
    [PermissionDescriptor(SystemModules.Admin, "edit_user", "edit user")]
    UserEdit,

    //News
    [PermissionDescriptor(SystemModules.Admin, "view_news", "read news")]
    NewsRead = 30,
    [PermissionDescriptor(SystemModules.Admin, "add_news", "add a new news")]
    NewsAddNew,
    [PermissionDescriptor(SystemModules.Admin, "remove_news", "remove news")]
    NewsRemove,
    [PermissionDescriptor(SystemModules.Admin, "edit_news", "edit news")]
    NewsEdit,

    //Album
    [PermissionDescriptor(SystemModules.Admin, "view_album", "Read album")]
    AlbumRead = 40,
    [PermissionDescriptor(SystemModules.Admin, "album_manage", "manage album/gallery and its content")]
    AlbumManage,
    [PermissionDescriptor(SystemModules.Admin, "change_album_status", "make file featured")]
    AlbumChangeStatus,

    //Award
    [PermissionDescriptor(SystemModules.Admin, "view_award", "read award")]
    ReadAward = 50,
    [PermissionDescriptor(SystemModules.Admin, "edit_award", "edit award")]
    AwardEdit,
    [PermissionDescriptor(SystemModules.Admin, "manage_award_judges", "manage award judges")]
    ManageJudges,

    //Artwork
    [PermissionDescriptor(SystemModules.Admin, "view_artwork", "read artwork ")]
    ReadArtwork = 60,
    [PermissionDescriptor(SystemModules.Admin, "add_artwork", "add new artwork")]
    ArtworkAddNew,
    [PermissionDescriptor(SystemModules.Admin, "remove_artwork", "remove artwork")]
    ArtworkRemove,
    [PermissionDescriptor(SystemModules.Admin, "edit_artwork", "edit artwork")]
    ArtworkEdit,
    [PermissionDescriptor(SystemModules.Admin, "read_artworks_basic_data", "read artworks basic data")]
    ArtworkListBasicData,
    [PermissionDescriptor(SystemModules.Admin, "approve_artworks", "approve artworks")]
    ArtworkApprove,


    //Voting
    [PermissionDescriptor(SystemModules.Admin, "view_voting", "read voting criteria")]
    ReadVotingCriteria = 70,
    [PermissionDescriptor(SystemModules.Admin, "add_voting", "add a new voting criteria")]
    VotingCriteriaAddNew,
    [PermissionDescriptor(SystemModules.Admin, "remove_voting", "remove voting criteria")]
    VotingCriteriaRemove,
    [PermissionDescriptor(SystemModules.Admin, "edit_voting", "edit voting criteria")]
    VotingCriteriaEdit,

    //System
    [PermissionDescriptor(SystemModules.Admin, "close_judging", "close all judging process")]
    CloseJudging = 80,


    //Bo0ths
    [PermissionDescriptor(SystemModules.Booths, "view_booths", "read booths")]
    BoothRead = 100,
    [PermissionDescriptor(SystemModules.Booths, "add_booths", "add a new booths")]
    BoothAddNew,
    [PermissionDescriptor(SystemModules.Booths, "remove_booths", "remove booths")]
    BoothRemove,
    [PermissionDescriptor(SystemModules.Booths, "manage_payments", "manage booths payments")]
    BoothPayment,
    [PermissionDescriptor(SystemModules.Booths, "change_booths_status", "change new booths")]
    BoothChangeStatus,
    [PermissionDescriptor(SystemModules.Booths, "booth_report", "export booth report")]
    ExportBoothReport,

    //Judge
    [PermissionDescriptor(SystemModules.Judge, "list_my_judged_artworks", "list and view my judged artworks")]
    ViewJudgedArtworks = 200,
    [PermissionDescriptor(SystemModules.Judge, "update_artwork_vote", "update votes for artwork")]
    UpdateArtworkVote,
    [PermissionDescriptor(SystemModules.Judge, "update_artwork_final_thoughts", "update final thoughts for artwork")]
    UpdateArtworkFinalThoughts,
    [PermissionDescriptor(SystemModules.Judge, "add_comment_to_artwork_video", "add comment to artwork video")]
    AddCommentToArtworkVideo,
    [PermissionDescriptor(SystemModules.Judge, "remove_comment_to_artwork_video", "remove comment to artwork video")]
    RemoveCommentToArtworkVideo,
    [PermissionDescriptor(SystemModules.Judge, "read_artwork_with_all_files", "read artwork with all files")]
    ReadArtworkWithAllFiles,
    [PermissionDescriptor(SystemModules.Judge, "view_my_assigned_artworks", "view my assigned artworks")]
    ViewAssignedArtworks,

    //Judge management
    [PermissionDescriptor(SystemModules.Judge, "list_my_judges", "list my judges")]
    ViewMyJudges = 210,
    [PermissionDescriptor(SystemModules.Judge, "view_artwork_scores", "view artwork scores")]
    ViewArtworkScore,
    [PermissionDescriptor(SystemModules.Judge, "view_all_artwork_statistics", "view all artwork statistics")]
    ViewAllArtworkStatistics,
    [PermissionDescriptor(SystemModules.Judge, "view_my_artwork_statistics", "view my artwork statistics")]
    ViewMyArtworkStatistics,
    [PermissionDescriptor(SystemModules.Judge, "view_artwork_judge_details", "view artwork judge details")]
    ViewArtworkJudgeDetails,


    //Client side DON'T move or change, add before this line
    [PermissionDescriptor(SystemModules.Nominee, "NomineePolicy", "Nominee policy to access all nominee sections")]
    NomineeAccess = 1000,

    //TODO: not working now
    //[PermissionDescriptor(SystemModules.Admin, "AccessAll", "This allows the user to access every feature")]
    //AccessAll = Int16.MaxValue,

  }
}