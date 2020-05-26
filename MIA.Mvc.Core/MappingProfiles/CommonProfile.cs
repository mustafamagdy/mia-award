using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using MIA.Authorization;
using MIA.Authorization.Entities;
using MIA.Dto.Admin;
using MIA.Dto.Auth;
using MIA.Exceptions;
using MIA.Models.Entities;
using MIA.Mvc.Core;
using Microsoft.AspNetCore.Identity;

namespace MIA.MappingProfiles {

  /// <summary>
  /// Auto mapper profile that contain mapping used in Api project
  /// </summary>
  public class CommonProfile : Profile {

    /// <summary>
    /// Constructor
    /// </summary>
    public CommonProfile() {
      //sample only, not working
      CreateMap<UserDetailsDto, AppUser>()
        .IncludeAllDerived()
        .ValidateMemberList(MemberList.None)
        .ForMember(x => x.PasswordHash, opts => opts.Ignore())
        .ReverseMap();

      CreateMap<LoginRequest, AppUser>().ValidateMemberList(MemberList.None);
      CreateMap<SignUpByEmailRequest, AppUser>()
        .IncludeAllDerived()
        .ValidateMemberList(MemberList.None)
        .ForMember(x => x.UserName, conf => conf.MapFrom(x => x.Email));

      CreateMap<SignUpByEmailRequest, Nominee>()
        .IncludeBase<SignUpByEmailRequest, AppUser>();

      CreateMap<AppRole, RoleDto>()
        .ForMember(a => a.SystemRole, cfg => cfg.Ignore())
        .ValidateMemberList(MemberList.None);

      CreateMap<RoleDto, AppRole>()
        .ValidateMemberList(MemberList.None);

      CreateMap<Permissions, PermissionDto>()
        .ConvertUsing<PermissionTypeConverter>();


      CreateMap<KeyValuePair<string, string>, KeyValuePair<string, string>>()
        .ConstructUsing(x => new KeyValuePair<string, string>(x.Key, x.Value));

      CreateMap<IdentityError, ErrorResult>()
        .ForMember(x => x.PropertyName, conf => conf.MapFrom(x => x.Code))
        .ForMember(x => x.ErrorMessage, conf => conf.MapFrom(x => x.Description));

      CreateMap<AppUser, UserProfileDto>()
         .IncludeAllDerived()
         .ValidateMemberList(MemberList.None);

      CreateMap<Nominee, UserProfileDto>()
         .IncludeAllDerived()
         .ForMember(x => x.JobTitle, conf => conf.MapFrom(x => x.JobTitle))
         .ValidateMemberList(MemberList.None);

      CreateMap<UpdateUserProfileDto, AppUser>()
           .IncludeAllDerived()
           .ForAllOtherMembers(a => a.Ignore());


    }
  }


}
