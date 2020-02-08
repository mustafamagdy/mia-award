using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using MIA.Authorization.Entities;
using MIA.Dto.Admin;
using MIA.Dto.Auth;
using MIA.Models.Entities;
using MIA.Mvc.Core;

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
        .ValidateMemberList(MemberList.None)
        .ForMember(x => x.PasswordHash, opts => opts.Ignore())
        .ReverseMap();

      CreateMap<LoginRequest, AppUser>().ValidateMemberList(MemberList.None);
      CreateMap<SignUpByEmailRequest, AppUser>()
        .ValidateMemberList(MemberList.None)
        .ForMember(x => x.UserName, conf => conf.MapFrom(x => x.Email));

      CreateMap<RoleDto, AppRole>()
        .ValidateMemberList(MemberList.None);

      CreateMap<Permissions, PermissionDto>()
        .ConvertUsing<PermissionTypeConverter>();


      CreateMap<KeyValuePair<string, string>, KeyValuePair<string, string>>()
        .ConstructUsing(x => new KeyValuePair<string, string>(x.Key, x.Value));


      CreateMap<AppUser, UserProfileDto>()
         .ValidateMemberList(MemberList.None);

      CreateMap<UpdateUserProfileDto, AppUser>()
           .ForMember(a => a.FirstName, cfg => cfg.MapFrom(a => a.FirstName))
           .ForMember(a => a.LastName, cfg => cfg.MapFrom(a => a.LastName))
           .ForAllOtherMembers(a => a.Ignore());


    }
  }


}
