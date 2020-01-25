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
       .ValidateMemberList(MemberList.None);


      CreateMap<News, FullNewsDto>()
        .ForMember(a => a.Date, cfg => cfg.MapFrom(a => a.Date.LocalDateTime().ToString("dd-MM-yyyy")))
       .ValidateMemberList(MemberList.None);

      CreateMap<News, FullNewsWithCommentsDto>()
        .ForMember(a => a.Date, cfg => cfg.MapFrom(a => a.Date.LocalDateTime().ToString("dd-MM-yyyy")))
       .ValidateMemberList(MemberList.None);

      CreateMap<NewsComment, UserCommentDto>()
        .ForMember(a => a.Comment, cfg => cfg.MapFrom(a => a.Comments))
        .ForMember(a => a.Date, cfg => cfg.MapFrom(a => a.Date.LocalDateTime().ToString("dd-MM-yyyy")))
       .ValidateMemberList(MemberList.None);

      CreateMap<NewsUserComment, NewsComment>()
        .ForMember(a => a.News, cfg => cfg.Ignore())
        .ForMember(a => a.NewsId, cfg => cfg.Ignore())
        .ForMember(a => a.Date, cfg => cfg.MapFrom(a => DateTime.Now.ToUniversalTime()))
       .ValidateMemberList(MemberList.None);

    }
  }


}
