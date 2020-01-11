using AutoMapper;
using MIA.Administration.Api;
using MIA.Models.Entities;

namespace MIA.Administration.MappingProfiles {

  /// <summary>
  /// Auto mapper profile that contain mapping used in Api project
  /// </summary>
  public class ApiProfile : Profile {

    /// <summary>
    /// Constructor
    /// </summary>
    public ApiProfile() {


      CreateMap<News, NewsDto>()
        .ForMember(a => a.ImageUrl, cfg => cfg.MapFrom(a => a.Image != null ? a.Image.Imageurl : ""))
        .ValidateMemberList(MemberList.None);
      CreateMap<NewNewsDto, News>().ValidateMemberList(MemberList.None);
      CreateMap<UpdateNewsDto, News>().ValidateMemberList(MemberList.None);
    }
  }


}
