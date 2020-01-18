using AutoMapper;
using MIA.Api;
using MIA.Models.Entities;
using System;

namespace MIA.MappingProfiles {

  /// <summary>
  /// Auto mapper profile that contain mapping used in Api project
  /// </summary>
  public class ApiProfile : Profile {

    /// <summary>
    /// Constructor
    /// </summary>
    public ApiProfile() {

      CreateMap<News, NewsDto>()
       .ForMember(a => a.Date, cfg => cfg.MapFrom(a => a.Date.LocalDateTime().ToString("dd-MM-yyyy")))
       //.ForMember(a => a.PosterUrl, cfg => cfg.MapFrom(a => a.Image != null ? a.Image.Imageurl : ""))
       .ValidateMemberList(MemberList.None);
    }
  }


}
