using AutoMapper;
using MIA.Administration.Api;
using MIA.Administration.Dto.ArtWorkPayment;
using MIA.Administration.Dto.Award;
using MIA.Administration.Dto.User;
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
      CreateMap<NewNewsDto, News>()
            .ForMember(a => a.Title, cfg => cfg.MapFrom(a => LocalizedData.FromArabic(a.Title)))
            .ForMember(a => a.Body, cfg => cfg.MapFrom(a => LocalizedData.FromArabic(a.Body)))
            .ValidateMemberList(MemberList.None);

      CreateMap<UpdateNewsDto, News>()
            .ForMember(a => a.Title, cfg => cfg.MapFrom(a => LocalizedData.FromArabic(a.Title)))
            .ForMember(a => a.Body, cfg => cfg.MapFrom(a => LocalizedData.FromArabic(a.Body)))
            //.ForMember(a => a.PosterId, cfg => cfg.Ignore())
            //.ForMember(a => a.PosterUrl, cfg => cfg.Ignore()) 
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
         .ForMember(a => a.Files, cfg => cfg.MapFrom(a => a.MediaItems))
         .ValidateMemberList(MemberList.None);

      CreateMap<NewPhotoAlbumDto, Album>().ValidateMemberList(MemberList.None);
      CreateMap<UpdatePhotoAlbumDto, Album>().ValidateMemberList(MemberList.None);

      #endregion


      #region Payment
   //   CreateMap<Payment, ArtWorkPaymentDto>().ValidateMemberList(MemberList.None);
      CreateMap<ArtWorkPaymentDto, ArtWorkPayment>().ValidateMemberList(MemberList.None);
      //CreateMap<NewPaymentDto, Payment>().ValidateMemberList(MemberList.None);
      //CreateMap<UpdatePaymentDto, Payment>().ValidateMemberList(MemberList.None);

      #endregion

      #region ArtWork
      CreateMap<ArtWork, ArtWorkDto>().ValidateMemberList(MemberList.None);
      CreateMap<NewArtWorkDto, ArtWork>().ValidateMemberList(MemberList.None)
            .ForMember(a => a.Title, cfg => cfg.MapFrom(a => LocalizedData.FromArabic(a.Title)))
            .ForMember(a => a.ShowDescription, cfg => cfg.MapFrom(a => LocalizedData.FromArabic(a.ShowDescription)))
            .ForMember(a => a.Payment, cfg => cfg.MapFrom(a => a.Payment));
      CreateMap<UpdateArtWorkDto, ArtWork>().ValidateMemberList(MemberList.None);
      #endregion


      #region Award
      CreateMap<Award, AwardDto>().ValidateMemberList(MemberList.None);
      CreateMap<NewAwardDto, Award>().ValidateMemberList(MemberList.None);
      CreateMap<UpdateAwardDto, Award>().ValidateMemberList(MemberList.None);

      #endregion


      #region Nominee
      CreateMap<Nominee, ProfileDto>().ValidateMemberList(MemberList.None);
      //CreateMap<NewNomineeDto, Nominee>().ValidateMemberList(MemberList.None);
      //CreateMap<UpdateNomineeDto, Nominee>().ValidateMemberList(MemberList.None);

      #endregion

    }

  }


}
