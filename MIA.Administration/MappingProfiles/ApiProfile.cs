using AutoMapper;
using MIA.Administration.Api;
using MIA.Administration.Dto.ArtWorkPayment;
using MIA.Administration.Dto.Award;
using MIA.Administration.Dto.BoothPayment;
using MIA.Administration.Dto.User;
using MIA.Dto.Admin;
using MIA.Models.Entities;
using System.Linq;
using MIA.Administration.Services;
using MIA.Dto.Auth;

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
        .ForMember(a => a.PosterUrl, cfg => cfg.MapFrom(a => a.Poster.FileUrl))
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
      CreateMap<BoothPayment, BoothPaymentDto>()
        .ForMember(a => a.ReceiptUrl, cfg => cfg.MapFrom(a => a.Receipt.FileUrl))
      .ValidateMemberList(MemberList.None);
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
      CreateMap<VotingCriteria, VotingCriteriasDto>()
        .IncludeAllDerived()
        .ValidateMemberList(MemberList.None);

      CreateMap<VotingCriteria, JudgeVoteCriteriaWithValueDto>()
        .IncludeBase<VotingCriteria, VotingCriteriasDto>()
        .ForMember(a => a.JudgeValue, cfg => cfg.Ignore())
        .ValidateMemberList(MemberList.None);

      CreateMap<NewVotingCriteriasDto, VotingCriteria>().ValidateMemberList(MemberList.None);
      CreateMap<UpdateVotingCriteriasDto, VotingCriteria>().ValidateMemberList(MemberList.None);

      #endregion

      #region PhotoAlbum


      CreateMap<AlbumItem, PhotoAlbumFileDto>().ValidateMemberList(MemberList.None);
      CreateMap<NewMediasDto, AlbumItem>().ValidateMemberList(MemberList.None);


      CreateMap<AlbumItem, PhotoAlbumFileDto>()
         .ForMember(a => a.FileKey, cfg => cfg.MapFrom(a => a.File.FileKey))
         .ForMember(a => a.FileUrl, cfg => cfg.MapFrom(a => a.File.FileUrl))
         .ForMember(a => a.PosterKey, cfg => cfg.MapFrom(a => a.Poster.FileKey))
         .ForMember(a => a.PosterUrl, cfg => cfg.MapFrom(a => a.Poster.FileUrl))
         .ValidateMemberList(MemberList.None);

      CreateMap<Album, PhotoAlbumDto>()
      //   .ForMember(a => a.MediaItems, cfg => cfg.MapFrom(a => a.MediaItems))
         .ValidateMemberList(MemberList.None);

      CreateMap<NewPhotoAlbumDto, Album>().ValidateMemberList(MemberList.None);
      CreateMap<UpdatePhotoAlbumDto, Album>().ValidateMemberList(MemberList.None);

      #endregion

      #region VoteOn Payment 
      CreateMap<ArtworkPayment, ArtWorkPaymentDto>()
        .ForMember(a => a.ReceiptUrl, cfg => cfg.MapFrom(a => a.Receipt.FileUrl))
      .ValidateMemberList(MemberList.None);
      CreateMap<NewArtWorkPaymentDto, ArtworkPayment>().ValidateMemberList(MemberList.None);
      CreateMap<UpdateArtWorkPaymentDto, ArtworkPayment>().ValidateMemberList(MemberList.None);

      #endregion

      #region Nominee
      CreateMap<Nominee, NomineeDto>().ValidateMemberList(MemberList.None);
      CreateMap<NomineeDto, Nominee>().ValidateMemberList(MemberList.None);

      #endregion

      #region Media File
      CreateMap<MediaFile, MediaFileDto>()
        .ForMember(a => a.FileKey, cfg => cfg.MapFrom(a => a.File.FileKey))
        .ForMember(a => a.FileUrl, cfg => cfg.MapFrom(a => a.File.FileUrl))
      .ValidateMemberList(MemberList.None);
      CreateMap<MediaFileDto, MediaFile>().ValidateMemberList(MemberList.None);

      CreateMap<MediaFile, BasicMediaFileDto>()
         .ForMember(a => a.FileKey, cfg => cfg.MapFrom(a => a.File.FileKey))
         .ForMember(a => a.FileUrl, cfg => cfg.MapFrom(a => a.File.FileUrl))
         .ValidateMemberList(MemberList.None);

      #endregion

      #region VoteOn
      CreateMap<Artwork, ArtWorkDto>()
            //.ForMember(a => a.WinnerAwardFirstPlace, cfg => cfg.Ignore())
            .ForMember(a => a.ProjectName, cfg => cfg.MapFrom(a => a.ProjectName))
            .ForMember(a => a.Description, cfg => cfg.MapFrom(a => a.Description))
        .ForMember(a => a.PosterUrl, cfg => cfg.MapFrom(a => a.Poster.FileUrl))
        .ForMember(a => a.TrailerPosterUrl, cfg => cfg.MapFrom(a => a.Poster.FileUrl))
        .ForMember(a => a.TrailerUrl, cfg => cfg.MapFrom(a => a.Trailer.FileUrl))
        .ForMember(a => a.CoverUrl, cfg => cfg.MapFrom(a => a.Cover.FileUrl))
        .ValidateMemberList(MemberList.None)
        //.ForMember(a => a.Payment, cfg => cfg.MapFrom(a => a.Payment))
        .ForMember(a => a.FileCount, cfg => cfg.MapFrom(a => a.MediaFiles.Count))
            .IncludeAllDerived();


      CreateMap<Artwork, ArtworkForJudgingDto>()
        .ForMember(a => a.ProjectName, cfg => cfg.MapFrom(a => a.ProjectName))
        .ForMember(a => a.Description, cfg => cfg.MapFrom(a => a.Description))
        .ForMember(a => a.PosterUrl, cfg => cfg.MapFrom(a => a.Poster.FileUrl))
        .ForMember(a => a.TrailerUrl, cfg => cfg.MapFrom(a => a.Trailer.FileUrl))
        .ForMember(a => a.CoverUrl, cfg => cfg.MapFrom(a => a.Cover.FileUrl))
        .ForMember(a => a.Scores, cfg => cfg.MapFrom(a => a.FinalScores))
        .ForMember(a => a.AwardId, cfg => cfg.MapFrom(a => a.AwardId))
        .ForMember(a => a.AwardName, cfg => cfg.MapFrom(a => a.Award.Title))
        .ForMember(a => a.LevelNumber, cfg => cfg.Ignore())
        .ValidateMemberList(MemberList.None)
            .IncludeAllDerived();

      CreateMap<JudgeArtworkScore, JudgeArtworkScoreViewDto>()
        .ForMember(a => a.FullName, cfg => cfg.MapFrom(a => a.Judge.FullName))
        .ForMember(a => a.ProjectName, cfg => cfg.MapFrom(a => a.Artwork.ProjectName))
        .ForMember(a => a.LevelNumber, cfg => cfg.MapFrom(a => (int)a.Level))
        .ValidateMemberList(MemberList.None);


      CreateMap<Artwork, ArtworkWithFilesDto>()
        .ForMember(a => a.Files, cfg => cfg.MapFrom(a => a.MediaFiles))
        .IncludeBase<Artwork, ArtWorkDto>()
        .ValidateMemberList(MemberList.None);

      CreateMap<Artwork, ArtworkWithFilesAndScoresDto>()
             .ForMember(a => a.Scores, cfg => cfg.MapFrom(a => a.FinalScores))
             .IncludeBase<Artwork, ArtworkWithFilesDto>()
             .ValidateMemberList(MemberList.None);


      CreateMap<NewArtWorkDto, Artwork>().ValidateMemberList(MemberList.None)
          .ForMember(a => a.ProjectName, cfg => cfg.MapFrom(a => a.ProjectName))
          .ForMember(a => a.Description, cfg => cfg.MapFrom(a => a.Description))
          //.ForMember(a => a.Payment, cfg => cfg.MapFrom(a => a.Payment))
          .ForMember(a => a.Nominee, cfg => cfg.MapFrom(a => a.Nominee))
          .ForMember(a => a.Award, cfg => cfg.MapFrom(a => a.Award));

      CreateMap<UpdateArtWorkDto, Artwork>().ValidateMemberList(MemberList.None)
            .ForMember(a => a.ProjectName, cfg => cfg.MapFrom(a => a.ProjectName))
            .ForMember(a => a.Description, cfg => cfg.MapFrom(a => a.Description));
      #endregion


      #region Award
      CreateMap<Award, AwardDto>().ValidateMemberList(MemberList.None)
        .ForMember(a => a.Title, cfg => cfg.MapFrom(a => a.Title))
        .ForMember(a => a.Description, cfg => cfg.MapFrom(a => a.Description))
        .ForMember(a => a.TrophyUrl, cfg => cfg.MapFrom(a => a.Trophy.FileUrl))
        .ForMember(a => a.Manager, cfg => cfg.MapFrom(a => a.Manager));

      CreateMap<Award, AwardDetailsDto>().ValidateMemberList(MemberList.None)
        .ForMember(a => a.TrophyUrl, cfg => cfg.MapFrom(a => a.Trophy.FileUrl));
      CreateMap<NewAwardDto, Award>().ValidateMemberList(MemberList.None);

      CreateMap<UpdateAwardDto, Award>()
        .ValidateMemberList(MemberList.None);

      #endregion

      #region Judge Vote

      CreateMap<JudgeVote, JudgeVoteDto>().ValidateMemberList(MemberList.None);
      CreateMap<NewJudgeVoteDto, JudgeVote>().ValidateMemberList(MemberList.None);
      CreateMap<VotingCriteriaVoteDto, JudgeVote>()
        .ForMember(a => a.VotingValue, cfg => cfg.MapFrom(a => a.JudgeValue))
        .ValidateMemberList(MemberList.None);

      CreateMap<JudgeVote, JudgeVoteValues>()
        .ForMember(a => a.VotingValue, cfg => cfg.MapFrom(a => a.VotingValue))
        .ForMember(a => a.CriteriaId, cfg => cfg.MapFrom(a => a.CriteriaId))
        .ForMember(a => a.Weight, cfg => cfg.MapFrom(a => a.Criteria.Weight))
        .ValidateMemberList(MemberList.None);

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

      CreateMap<Judge, JudgeDto>()
        .IncludeBase<AppUser, UserDto>()
        .ValidateMemberList(MemberList.None);
      CreateMap<JudgeDto, Judge>().ValidateMemberList(MemberList.None);

      #endregion

      #region ProfileDto  

      CreateMap<AppUser, ProfileDto>().ValidateMemberList(MemberList.None);
      CreateMap<ProfileDto, AppUser>().ValidateMemberList(MemberList.None);

      #endregion
      #region UserDto  

      CreateMap<AppUser, UserDto>()
        .ForMember(a => a.AvatarImage, n => n.MapFrom(a => a.AvatarImage.Imageurl))
        .ValidateMemberList(MemberList.None)
        .IncludeAllDerived();
      CreateMap<UserDto, AppUser>().ValidateMemberList(MemberList.None);



      CreateMap<SignUpByEmailRequest, Judge>()
        .IncludeBase<SignUpByEmailRequest, AppUser>();

      CreateMap<SignUpByEmailRequest, Nominee>()
        .IncludeBase<SignUpByEmailRequest, AppUser>();


      #endregion
      //#region Role
      //CreateMap<Role, RoleDto>().ValidateMemberList(MemberList.None); 

      //#endregion

    }

  }


}
