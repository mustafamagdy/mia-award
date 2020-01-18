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

      #region News

      CreateMap<News, NewsDto>()
        //.ForMember(a => a.ImageUrl, cfg => cfg.MapFrom(a => a.Image != null ? a.Image.Imageurl : ""))
        .ValidateMemberList(MemberList.None);
      CreateMap<NewNewsDto, News>().ValidateMemberList(MemberList.None);
      CreateMap<UpdateNewsDto, News>()
            .ForMember(a => a.PosterId, cfg => cfg.Ignore())
            .ForMember(a => a.PosterUrl, cfg => cfg.Ignore())
            .ValidateMemberList(MemberList.None);
      #endregion

      #region Booth
      CreateMap<Booth, BoothsDto>().ValidateMemberList(MemberList.None);
      CreateMap<NewBoothsDto, Booth>().ValidateMemberList(MemberList.None);
      CreateMap<UpdateBoothsDto, Booth>().ValidateMemberList(MemberList.None);

      #endregion

      #region VotingCriteria
      CreateMap<VotingCriteria, VotingCriteriasDto>().ValidateMemberList(MemberList.None);
      CreateMap<NewVotingCriteriasDto, VotingCriteria>().ValidateMemberList(MemberList.None);
      CreateMap<UpdateVotingCriteriasDto, VotingCriteria>().ValidateMemberList(MemberList.None);

      #endregion

      #region PhotoAlbum

      CreateMap<AlbumItem, PhotoAlbumFileDto>()
         .ForMember(a => a.FileKey, cfg => cfg.MapFrom(a => a.FileKey))
         .ForMember(a => a.FileUrl, cfg => cfg.MapFrom(a => a.FileUrl))
         .ValidateMemberList(MemberList.None);

      CreateMap<Album, PhotoAlbumDto>()
         .ForMember(a => a.Files, cfg => cfg.MapFrom(a=>a.MediaItems))
         .ValidateMemberList(MemberList.None);

      CreateMap<NewPhotoAlbumDto, Album>().ValidateMemberList(MemberList.None);
      CreateMap<UpdatePhotoAlbumDto, Album>().ValidateMemberList(MemberList.None);

      #endregion
    }
  }


}
