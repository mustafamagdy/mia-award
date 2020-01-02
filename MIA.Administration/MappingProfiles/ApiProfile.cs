using System;
using System.ComponentModel.DataAnnotations;
using AutoMapper;
using MIA.Authorization.Entities;
using MIA.Models.Entities;
using MIA.Administration.Dto.Admin;
using MIA.Administration.Dto.Auth;

namespace MIA.Administration.MappingProfiles {
  internal class PermissionTypeConverter : ITypeConverter<Permissions, PermissionDto> {
    public PermissionDto Convert(Permissions source, PermissionDto destination, ResolutionContext context) {
      var dto = new PermissionDto();
      dto.Id = (short)source;

      var displayAttribute = source.GetAttribute<DisplayAttribute>();
      if (displayAttribute != null) {
        dto.Name = displayAttribute.Name;
        dto.Group = displayAttribute.GroupName;
      } else {
        dto.Name = source.ToString();
        dto.Group = "";
      }

      return dto;
    }
  }

  /// <summary>
  /// Auto mapper profile that contain mapping used in Api project
  /// </summary>
  public class ApiProfile : Profile {

    /// <summary>
    /// Constructor
    /// </summary>
    public ApiProfile() {
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

      CreateMap<AppUser, UserProfileDto>()
         .ValidateMemberList(MemberList.None);

      CreateMap<UpdateUserProfileDto, AppUser>()
           .ForMember(a => a.FirstName, cfg => cfg.MapFrom(a => a.FirstName))
           .ForMember(a => a.LastName, cfg => cfg.MapFrom(a => a.LastName))
           .ForAllOtherMembers(a => a.Ignore());


    }
  }


}
