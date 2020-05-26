using AutoMapper;
using MIA.Api;
using MIA.Models.Entities;
using System;
using MIA.Payments;

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
       .ForMember(a => a.Date, cfg => cfg.MapFrom(a => a.Date.LocalDateTimeFromSeconds().ToString("dd-MM-yyyy")))
       .ValidateMemberList(MemberList.None);

      CreateMap<Lookup, LocalizedLookupDto>()
       .IncludeAllDerived()
       .ValidateMemberList(MemberList.None);

      CreateMap<News, FullNewsDto>()
        .ForMember(a => a.Date, cfg => cfg.MapFrom(a => a.Date.LocalDateTimeFromSeconds().ToString("dd-MM-yyyy")))
       .ValidateMemberList(MemberList.None);

      CreateMap<BoothPurchaseDto, BoothPurchase>()
        .ForMember(a => a.Payment, cfg => cfg.Ignore())
        .ForMember(a => a.PaymentId, cfg => cfg.Ignore())
        .ValidateMemberList(MemberList.None);

      CreateMap<Booth, BoothDto>()
       .ValidateMemberList(MemberList.None);

      CreateMap<News, RelatedNewsDto>()
       .ValidateMemberList(MemberList.None);

      CreateMap<News, FullNewsWithCommentsDto>()
        .ForMember(a => a.RelatedNews, cfg => cfg.Ignore())
        .ForMember(a => a.Date, cfg => cfg.MapFrom(a => a.Date.LocalDateTimeFromSeconds().ToString("dd-MM-yyyy")))
       .ValidateMemberList(MemberList.None);

      CreateMap<NewsComment, UserCommentDto>()
        .ForMember(a => a.Comment, cfg => cfg.MapFrom(a => a.Comments))
        .ForMember(a => a.UserFullName, cfg => cfg.MapFrom(a => a.Name))
        .ForMember(a => a.UserAvatarUrl, cfg => cfg.Ignore())
        .ForMember(a => a.Date, cfg => cfg.MapFrom(a => a.Date.LocalDateTimeFromSeconds().ToString("dd-MM-yyyy")))
       .ValidateMemberList(MemberList.None);

      CreateMap<SubmitUserComment, NewsComment>()
        .ForMember(a => a.News, cfg => cfg.Ignore())
        .ForMember(a => a.NewsId, cfg => cfg.Ignore())
        .ForMember(a => a.Comments, cfg => cfg.MapFrom(a => a.Comment))
        .ForMember(a => a.Date, cfg => cfg.MapFrom(a => DateTime.Now.ToUnixTimeSeconds()))
        .ValidateMemberList(MemberList.None);

      CreateMap<Album, MainAlbumDto>()
        .ForMember(a => a.Items, cfg => cfg.MapFrom(a => a.MediaItems))
        .ValidateMemberList(MemberList.None);

      CreateMap<AlbumItem, AlbumItemDto>()
       .ForMember(a => a.DateCreated, cfg => cfg.MapFrom(a => a.DateCreated.LocalDateTimeFromSeconds().ToString("dd-MM-yyyy")))
       .ValidateMemberList(MemberList.None);

      CreateMap<Award, AwardDto>()
        .ForMember(a => a.AwardType, cfg => cfg.MapFrom(a => a.AwardType))
        .ForMember(a => a.TrophyUrl, cfg => cfg.MapFrom(a => a.TrophyImageUrl))
        .ValidateMemberList(MemberList.None);

      CreateMap<Artwork, RecentShowsDto>()
        .ValidateMemberList(MemberList.None);

      CreateMap<PaymentDto, PaymentRequest>()
        .ForMember(a => a.CardToken, cfg => cfg.MapFrom(a => a.CardToken))
        .ForMember(a => a.Last4Digits, cfg => cfg.MapFrom(a => a.Last4Digit))
        .ValidateMemberList(MemberList.None);

      CreateMap<ArtworkReview, UserCommentDto>()
        .ForMember(a => a.Comment, cfg => cfg.MapFrom(a => a.Comments))
        .ForMember(a => a.UserFullName, cfg => cfg.MapFrom(a => a.Name))
        .ForMember(a => a.UserAvatarUrl, cfg => cfg.Ignore())
        .ForMember(a => a.Date, cfg => cfg.MapFrom(a => a.Date.LocalDateTimeFromSeconds().ToString("dd-MM-yyyy")))
        .ValidateMemberList(MemberList.None);

      CreateMap<SubmitUserComment, ArtworkReview>()
        .ForMember(a => a.Artwork, cfg => cfg.Ignore())
        .ForMember(a => a.ArtworkId, cfg => cfg.Ignore())
        .ForMember(a => a.Comments, cfg => cfg.MapFrom(a => a.Comment))
        .ForMember(a => a.Date, cfg => cfg.MapFrom(a => DateTime.Now.ToUnixTimeSeconds()))
        .ValidateMemberList(MemberList.None);

      CreateMap<FullArtworkWithCommentsDto, Artwork>()
        .ValidateMemberList(MemberList.None);

      CreateMap<SubmitArtworkWithDetails, Artwork>()
        .ForMember(a => a.AwardId, cfg => cfg.MapFrom(a => a.AwardId))
        .ForMember(a => a.Payment, cfg => cfg.Ignore())
        .ValidateMemberList(MemberList.None);

      CreateMap<UpdateArtworkWithDetails, Artwork>()
        .ValidateMemberList(MemberList.None);

      CreateMap<Artwork, ArtworkBasicData>()
        .ValidateMemberList(MemberList.None);

      CreateMap<Artwork, ArtworkBasicViewDto>()
        .IncludeAllDerived()
        .ForMember(a => a.PosterUrl, cfg => cfg.MapFrom(a => a.Poster.FileUrl))
        .ForMember(a => a.TrailerPosterUrl, cfg => cfg.MapFrom(a => a.Cover.FileUrl))
        .ForMember(a => a.CoverImageUrl, cfg => cfg.MapFrom(a => a.Cover.FileUrl))
        .ForMember(a => a.TrailerUrl, cfg => cfg.MapFrom(a => a.Trailer.FileUrl))
        .ValidateMemberList(MemberList.None);

      CreateMap<Artwork, ArtworkViewDto>()
        .IncludeAllDerived()
        .ForMember(a => a.CanUploadFiles, cfg => cfg.MapFrom(a => a.AllowFileUpload))
        .ForMember(a => a.AwardType, cfg => cfg.MapFrom(a => a.Award.AwardType))
        .ValidateMemberList(MemberList.None);

      CreateMap<Artwork, ArtworkViewWithFilesDto>()
          // .ForMember(a => a.Producers, cfg => cfg.MapFrom(a => a.Production))
          // .ForMember(a => a.Directors, cfg => cfg.MapFrom(a => a.Director))
          .ForMember(a => a.AwardType, cfg => cfg.MapFrom(a => a.Award.AwardType))
          .ForMember(a => a.Files, cfg => cfg.MapFrom(a => a.MediaFiles))
        .IncludeAllDerived()
        .ValidateMemberList(MemberList.None);

      CreateMap<Artwork, ArtworkWithStatusDto>()
          .ForMember(a => a.PosterUrl, cfg => cfg.MapFrom(a => a.Poster.FileUrl))
          .ForMember(a => a.CoverUrl, cfg => cfg.MapFrom(a => a.Cover.FileUrl))
          .ForMember(a => a.TrailerUrl, cfg => cfg.MapFrom(a => a.Trailer.FileUrl))
          .ForMember(a => a.AwardType, cfg => cfg.MapFrom(a => a.Award.AwardType))
          .ValidateMemberList(MemberList.None);

      CreateMap<MediaFile, ArtworkFileDto>()
        .ValidateMemberList(MemberList.None);

      CreateMap<ArtworkPayment, PaymentWithStatusDto>()
        .ForMember(a => a.Status, cfg => cfg.MapFrom(a => a.PaymentStatus.ToString()))
        .ForMember(a => a.Amount, cfg => cfg.MapFrom((a => a.Amount)))
        .ForMember(a => a.Date, cfg => cfg.MapFrom((a => a.PaymentDate.LocalDateTimeFromSeconds().ToString("dd-MM-yyyy"))))
        .ValidateMemberList(MemberList.None);



    }
  }


}
