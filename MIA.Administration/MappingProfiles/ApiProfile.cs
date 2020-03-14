using AutoMapper;
using MIA.Administration.Api;
using MIA.Administration.Dto.ArtWorkPayment;
using MIA.Administration.Dto.Award;
using MIA.Administration.Dto.BoothPayment;
using MIA.Administration.Dto.User;
using MIA.Dto.Admin;
using MIA.Models.Entities;
using System.Linq;

namespace MIA.Administration.MappingProfiles
{

  /// <summary>
  /// Auto mapper profile that contain mapping used in Api project
  /// </summary>
  public class ApiProfile : Profile
  {

    /// <summary>
    /// Constructor
    /// </summary>
    public ApiProfile()
    {

      #region News

      CreateMap<News, NewsDto>()
        //.ForMember(a => a.ImageUrl, cfg => cfg.MapFrom(a => a.Image != null ? a.Image.Imageurl : ""))
        .ValidateMemberList(MemberList.None);
      CreateMap<NewNewsDto, News>()
            .ForMember(a => a.Title, cfg => cfg.MapFrom(a => a.Title))
            .ForMember(a => a.Body, cfg => cfg.MapFrom(a => a.Body))
            .ValidateMemberList(MemberList.None);

      CreateMap<UpdateNewsDto, News>()
            .ForMember(a => a.Title, cfg => cfg.MapFrom(a => a.Title))
            .ForMember(a => a.Body, cfg => cfg.MapFrom(a => a.Body))
            //.ForMember(a => a.PosterId, cfg => cfg.Ignore())
            //.ForMember(a => a.PosterUrl, cfg => cfg.Ignore()) 
            .ValidateMemberList(MemberList.None);
      #endregion

      #region BoothPurchase
     
      CreateMap<NewBoothPaymentDto, BoothPayment>().ValidateMemberList(MemberList.None);
      CreateMap<BoothPurchase, BoothPurchaseDto>().ValidateMemberList(MemberList.None);
      CreateMap<NewBoothPurchaseDto, BoothPurchase>().ValidateMemberList(MemberList.None);
      CreateMap<UpdateBoothPurchaseDto, BoothPurchase>().ValidateMemberList(MemberList.None);

      #endregion

      #region Booth Payment 
      CreateMap<BoothPayment, BoothPaymentDto>().ValidateMemberList(MemberList.None);
      CreateMap<BoothPaymentDto, BoothPayment>().ValidateMemberList(MemberList.None);
      CreateMap<UpdateBoothPaymentDto, BoothPayment>().ValidateMemberList(MemberList.None);

      #endregion

      #region Booth
      CreateMap<Booth, BoothsDto>().ValidateMemberList(MemberList.None)
            .ForMember(a => a.BoothPurchase, cfg => cfg.MapFrom(a => a.Purchases))
            .ForMember(a => a.HasConfirmedPayment, cfg => cfg.MapFrom(a => a.Purchases.Any(z => z.Payment.PaymentStatus == PaymentStatus.Confirmed)))
        ;
      CreateMap<NewBoothsDto, Booth>().ValidateMemberList(MemberList.None)
            .ForMember(a => a.Description, cfg => cfg.MapFrom(a => a.Description))
        ;
      CreateMap<UpdateBoothsDto, Booth>().ValidateMemberList(MemberList.None)
            .ForMember(a => a.Description, cfg => cfg.MapFrom(a => a.Description))
        ;

      #endregion

      #region VotingCriteria
      CreateMap<VotingCriteria, VotingCriteriasDto>().ValidateMemberList(MemberList.None);
      CreateMap<NewVotingCriteriasDto, VotingCriteria>().ValidateMemberList(MemberList.None);
      CreateMap<UpdateVotingCriteriasDto, VotingCriteria>().ValidateMemberList(MemberList.None);

      #endregion

      #region PhotoAlbum


      CreateMap<AlbumItem, PhotoAlbumFileDto>().ValidateMemberList(MemberList.None);
      CreateMap<NewMediasDto, AlbumItem>().ValidateMemberList(MemberList.None);


      CreateMap<AlbumItem, PhotoAlbumFileDto>()
         .ForMember(a => a.FileKey, cfg => cfg.MapFrom(a => a.FileKey))
         .ForMember(a => a.FileUrl, cfg => cfg.MapFrom(a => a.FileUrl))
         .ValidateMemberList(MemberList.None);

      CreateMap<Album, PhotoAlbumDto>()
      //   .ForMember(a => a.MediaItems, cfg => cfg.MapFrom(a => a.MediaItems))
         .ValidateMemberList(MemberList.None);

      CreateMap<NewPhotoAlbumDto, Album>().ValidateMemberList(MemberList.None);
      CreateMap<UpdatePhotoAlbumDto, Album>().ValidateMemberList(MemberList.None);

      #endregion


      #region ArtWork Payment 
      CreateMap<ArtWorkPayment, ArtWorkPaymentDto>().ValidateMemberList(MemberList.None);
      CreateMap<NewArtWorkPaymentDto, ArtWorkPayment>().ValidateMemberList(MemberList.None);
      CreateMap<UpdateArtWorkPaymentDto, ArtWorkPayment>().ValidateMemberList(MemberList.None);

      #endregion


      #region Nominee
      CreateMap<Nominee, NomineeDto>().ValidateMemberList(MemberList.None);
      CreateMap<NomineeDto, Nominee>().ValidateMemberList(MemberList.None);

      #endregion


      #region Media File
      CreateMap<MediaFile, MediaFileDto>().ValidateMemberList(MemberList.None);
      CreateMap<MediaFileDto, MediaFile>().ValidateMemberList(MemberList.None);

      #endregion

      #region ArtWork
      CreateMap<ArtWork, ArtWorkDto>()
        //.ForMember(a => a.WinnerAwardFirstPlace, cfg => cfg.Ignore())
        .ValidateMemberList(MemberList.None)
        .ForMember(a => a.Payment, cfg => cfg.MapFrom(a => a.Payment));


      CreateMap<NewArtWorkDto, ArtWork>().ValidateMemberList(MemberList.None)
            .ForMember(a => a.Title, cfg => cfg.MapFrom(a => a.Title))
            .ForMember(a => a.ShowDescription, cfg => cfg.MapFrom(a => a.ShowDescription))
            .ForMember(a => a.Payment, cfg => cfg.MapFrom(a => a.Payment))
            .ForMember(a => a.Nominee, cfg => cfg.MapFrom(a => a.Nominee));
      CreateMap<UpdateArtWorkDto, ArtWork>().ValidateMemberList(MemberList.None)
            .ForMember(a => a.Title, cfg => cfg.MapFrom(a => a.Title))
            .ForMember(a => a.ShowDescription, cfg => cfg.MapFrom(a => a.ShowDescription));
      #endregion


      #region Award
      CreateMap<Award, AwardDto>().ValidateMemberList(MemberList.None)
        .ForMember(a => a.Title, cfg => cfg.MapFrom(a => a.Title))
        .ForMember(a => a.Description, cfg => cfg.MapFrom(a => a.Description))

;
      CreateMap<Award, AwardDetailsDto>().ValidateMemberList(MemberList.None);
      CreateMap<NewAwardDto, Award>().ValidateMemberList(MemberList.None);
      CreateMap<UpdateAwardDto, Award>().ValidateMemberList(MemberList.None);

      #endregion

      #region Judge Vote

      CreateMap<JudgeVote, JudgeVoteDto>().ValidateMemberList(MemberList.None);
      CreateMap<NewJudgeVoteDto, JudgeVote>().ValidateMemberList(MemberList.None);
      CreateMap<VotingCriteriaVoteDto, JudgeVote>().ValidateMemberList(MemberList.None);

      #endregion

      #region Judge Award

      CreateMap<JudgeAward, JudgeAwardDto>().ValidateMemberList(MemberList.None);
      CreateMap<JudgeAwardDto, JudgeAward>().ValidateMemberList(MemberList.None);
      #endregion

      #region Judge Comment

      CreateMap<JudgeComment, JudgeCommentDto>().ValidateMemberList(MemberList.None);
      CreateMap<NewJudgeCommentDto, JudgeComment>().ValidateMemberList(MemberList.None);

      #endregion

      #region Judge  

      CreateMap<Judge, JudgeDto>().ValidateMemberList(MemberList.None);
      CreateMap<JudgeDto, Judge>().ValidateMemberList(MemberList.None);

      #endregion
      //#region Role
      //CreateMap<Role, RoleDto>().ValidateMemberList(MemberList.None); 

      //#endregion

    }

  }


}
