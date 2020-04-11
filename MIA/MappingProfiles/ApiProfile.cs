using AutoMapper;
using MIA.Api;
using MIA.Models.Entities;
using System;
using MIA.Payments;

namespace MIA.MappingProfiles
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

      CreateMap<ArtworkAward, AwardDto>()
        .ForMember(a => a.TrophyUrl, cfg => cfg.MapFrom(a => a.TrophyImageUrl))
        .ValidateMemberList(MemberList.None);

      CreateMap<ArtWork, RecentShowsDto>()
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

      CreateMap<FullArtworkWithCommentsDto, ArtWork>()
        .ValidateMemberList(MemberList.None);

      CreateMap<SubmitArtworkWithDetails, ArtWork>()
        .ForMember(a => a.AwardId, cfg => cfg.MapFrom(a => a.AwardId))
        .ForMember(a => a.ShowDescription, cfg => cfg.MapFrom(a => LocalizedData.Same(a.About)))
        .ForMember(a => a.Production, cfg => cfg.MapFrom(a => a.Producers))
        .ForMember(a => a.Director, cfg => cfg.MapFrom(a => a.Directors))
        .ForMember(a => a.Writers, cfg => cfg.MapFrom(a => a.Writers))
        .ForMember(a => a.Crew, cfg => cfg.MapFrom(a => a.Crew))
        .ForMember(a => a.Stars, cfg => cfg.MapFrom(a => a.Stars))
        .ForMember(a => a.DateOfRelease, cfg => cfg.MapFrom(a => a.Year))
        .ForMember(a => a.Country, cfg => cfg.MapFrom(a => a.Country))
        .ForMember(a => a.Title, cfg => cfg.MapFrom(a => a.Title))
        .ForMember(a => a.Payment, cfg => cfg.Ignore())
        .ValidateMemberList(MemberList.None);

      CreateMap<ArtWork, ArtworkBasiData>()
        .ForMember(a => a.About, cfg => cfg.MapFrom(a => a.ShowDescription))
        .ForMember(a => a.Story, cfg => cfg.MapFrom(a => a.Story))
        .ForMember(a => a.Producers, cfg => cfg.MapFrom(a => a.Production))
        .ForMember(a => a.Directors, cfg => cfg.MapFrom(a => a.Director))
        .ForMember(a => a.Writers, cfg => cfg.MapFrom(a => a.Writers))
        .ForMember(a => a.Crew, cfg => cfg.MapFrom(a => a.Crew))
        .ForMember(a => a.Stars, cfg => cfg.MapFrom(a => a.Stars))
        .ForMember(a => a.Year, cfg => cfg.MapFrom(a => a.DateOfRelease))
        .ForMember(a => a.Country, cfg => cfg.MapFrom(a => a.Country))
        .ValidateMemberList(MemberList.None);
      
      CreateMap<ArtWork, ArtworkBasicViewDto>()
        .IncludeAllDerived()
        .ForMember(a => a.CoverImageUrl, cfg => cfg.MapFrom(a => a.CoverUrl))
        .ValidateMemberList(MemberList.None);

      CreateMap<ArtWork, ArtworkViewDto>()
        .IncludeAllDerived()
        .ForMember(a => a.CanUploadFiles, cfg => cfg.MapFrom(a => a.AllowFileUpload))
        .ValidateMemberList(MemberList.None);

      CreateMap<ArtWork, ArtworkViewWithFilesDto>()
          .ForMember(a => a.Producers, cfg => cfg.MapFrom(a => a.Production))
          .ForMember(a => a.Directors, cfg => cfg.MapFrom(a => a.Director))
          .ForMember(a => a.Year, cfg => cfg.MapFrom(a => a.DateOfRelease))
          .ForMember(a => a.Files, cfg => cfg.MapFrom(a => a.MediaFiles))
        .IncludeAllDerived()
        .ValidateMemberList(MemberList.None);

      CreateMap<ArtWork, ArtworkWithStatusDto>()
          //.ForMember(a=>a.TrophyUrl,cfg=>cfg.MapFrom(a=>a.Award.TrophyImageUrl??""))
          .ValidateMemberList(MemberList.None);

      CreateMap<MediaFile, ArtworkFileDto>()
        .ValidateMemberList(MemberList.None);

      CreateMap<ArtWorkPayment, PaymentWithStatusDto>()
        .ForMember(a => a.Status, cfg => cfg.MapFrom(a => a.PaymentStatus.ToString()))
        .ForMember(a => a.Amount, cfg => cfg.MapFrom((a => a.Amount)))
        .ForMember(a => a.Date, cfg => cfg.MapFrom((a => a.PaymentDate.LocalDateTimeFromSeconds().ToString("dd-MM-yyyy"))))
        .ValidateMemberList(MemberList.None);



    }
  }


}
