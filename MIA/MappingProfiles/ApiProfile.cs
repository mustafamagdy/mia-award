﻿using AutoMapper;
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

      CreateMap<Lookup, LocalizedLookupDto>()
       .IncludeAllDerived()
       .ValidateMemberList(MemberList.None);

      CreateMap<News, FullNewsDto>()
        .ForMember(a => a.Date, cfg => cfg.MapFrom(a => a.Date.LocalDateTime().ToString("dd-MM-yyyy")))
       .ValidateMemberList(MemberList.None);

      CreateMap<News, RelatedNewsDto>()
       .ValidateMemberList(MemberList.None);

      CreateMap<News, FullNewsWithCommentsDto>()
        .ForMember(a => a.RelatedNews, cfg => cfg.Ignore())
        .ForMember(a => a.Date, cfg => cfg.MapFrom(a => a.Date.LocalDateTime().ToString("dd-MM-yyyy")))
       .ValidateMemberList(MemberList.None);

      CreateMap<NewsComment, UserCommentDto>()
        .ForMember(a => a.Comment, cfg => cfg.MapFrom(a => a.Comments))
        .ForMember(a => a.UserFullName, cfg => cfg.MapFrom(a => a.Name))
        .ForMember(a => a.UserAvatarUrl, cfg => cfg.Ignore())
        .ForMember(a => a.Date, cfg => cfg.MapFrom(a => a.Date.LocalDateTime().ToString("dd-MM-yyyy")))
       .ValidateMemberList(MemberList.None);

      CreateMap<NewsUserComment, NewsComment>()
        .ForMember(a => a.News, cfg => cfg.Ignore())
        .ForMember(a => a.NewsId, cfg => cfg.Ignore())
        .ForMember(a => a.Date, cfg => cfg.MapFrom(a => DateTime.Now.ToUniversalTime()))
       .ValidateMemberList(MemberList.None);


      CreateMap<AlbumItem, AlbumItemDto>()
       .ForMember(a => a.DateCreated, cfg => cfg.MapFrom(a => a.DateCreated.LocalDateTime().ToString("dd-MM-yyyy")))
       .ValidateMemberList(MemberList.None);

      CreateMap<Award, AwardDto>()
        .ForMember(a => a.TrophyUrl, cfg => cfg.MapFrom(a => a.TrophyImageUrl))
        .ValidateMemberList(MemberList.None);

      CreateMap<ArtWork, RecentShowsDto>()
        .ValidateMemberList(MemberList.None);


      CreateMap<SubmitArtworkWithDetails, ArtWork>()
        .ForMember(a => a.AwardId, cfg => cfg.MapFrom(a => a.AwardId))
        .ForMember(a => a.ShowDescription, cfg => cfg.MapFrom(a => a.About))
        .ForMember(a => a.Production, cfg => cfg.MapFrom(a => a.Production))
        .ForMember(a => a.Director, cfg => cfg.MapFrom(a => a.Director))
        .ForMember(a => a.Writers, cfg => cfg.MapFrom(a => a.Writer))
        .ForMember(a => a.Crew, cfg => cfg.MapFrom(a => a.Crew))
        .ForMember(a => a.Stars, cfg => cfg.MapFrom(a => a.Stars))
        .ForMember(a => a.Payment, cfg => cfg.Ignore())
        .ValidateMemberList(MemberList.None);

      CreateMap<ArtWork, ArtworkViewDto>()
        .ForMember(a => a.About, cfg => cfg.MapFrom(a => a.ShowDescription))
        .ForMember(a => a.CanUploadFiles, cfg => cfg.MapFrom(a => a.AllowFileUpload))
        .IncludeAllDerived()
        .ValidateMemberList(MemberList.None);

      CreateMap<ArtWork, ArtworkViewWithFilesDto>()
        .ValidateMemberList(MemberList.None);

      CreateMap<MediaFile, ArtworkFileDto>()
        .ValidateMemberList(MemberList.None);

      CreateMap<ArtWorkPayment, PaymentWithStatusDto>()
        .ForMember(a => a.Status, cfg => cfg.MapFrom(a => a.PaymentStatus.ToString()))
        .ForMember(a => a.Amount, cfg => cfg.MapFrom((a => a.Amount)))
        .ForMember(a => a.Date, cfg => cfg.MapFrom((a => a.PaymentDate.LocalDateTime().ToString("dd-MM-yyyy"))))
        .ValidateMemberList(MemberList.None);

    }
  }


}
