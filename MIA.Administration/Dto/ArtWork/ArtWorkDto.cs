using MIA.Administration.Dto.ArtWorkPayment;
using MIA.Administration.Dto.Award;
using MIA.Administration.Dto.User;
using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Administration.Api {
  public class ArtWorkDto {
    public string Id { get; set; }

    public LocalizedData ProjectName { get; set; }
    public LocalizedData Description { get; set; }
    public string PosterUrl { get; set; }
    public string TrailerUrl { get; set; }
    public string CoverUrl { get; set; }
    public string TrailerPosterUrl { get; set; }
    public bool UploadComplete { get; set; }
    public bool AllowFileUpload { get; set; }
    public bool Featured { get; set; }
    public AwardDto Award { get; set; }
    public string AwardId { get; set; }
    //   public NomineeDto Nominee { get; set; }
    public string NomineeId { get; set; }
    public string PaymentId { get; set; }
    public ArtWorkPaymentDto Payment { get; set; }
    public bool? IllegibleForJudge { get; set; }

    public string SiteUrl { get; set; }
    public int ProductionYear { get; set; }
    public int BroadcastYear { get; set; }
    public string TvChannels { get; set; }
    public string OnlineChannels { get; set; }
    public string ProductionLicenseNumber { get; set; }
    public string ProductionLicenseAgency { get; set; }

    public int FileCount { get; set; }
    // public HashSet<MediaFileDto> MediaFiles { get; set; }
    //public HashSet<JudgeVoteDto> Votes { get; set; }
    //public AwardDto WinnerAwardFirstPlace { get; set; }
    //public string WinnerAwardFirstPlaceId { get; set; }
    //public AwardDto WinnerAwardSecondPlace { get; set; }
    //public string WinnerAwardSecondPlaceId { get; set; }

    public S3File Resume { get; set; }
    public S3File File1 { get; set; }
    public S3File File2 { get; set; }
    public S3File File3 { get; set; }
  }


  public class ArtworkForJudgingDto {
    public string Id { get; set; }

    public LocalizedData ProjectName { get; set; }
    public LocalizedData Description { get; set; }
    public string PosterUrl { get; set; }
    public string TrailerUrl { get; set; }
    public string CoverUrl { get; set; }
    public LocalizedData AwardName { get; set; }
    public string AwardId { get; set; }

    public string SiteUrl { get; set; }
    public int ProductionYear { get; set; }
    public int BroadcastYear { get; set; }
    public string TvChannels { get; set; }
    public string OnlineChannels { get; set; }
    public string ProductionLicenseNumber { get; set; }
    public string ProductionLicenseAgency { get; set; }

    public JudgeArtworkScoreViewDto[] Scores { get; set; }
    //just for UI don't use
    public int LevelNumber { get; set; }

  }

  public class JudgeArtworkScoreViewDto {
    public string ArtworkId { get; set; }
    public LocalizedData ProjectName { get; set; }
    public string JudgeId { get; set; }
    public string FullName { get; set; }
    public JudgeLevel Level { get; set; }
    public int LevelNumber { get; set; }
    public decimal Score { get; set; }
    public decimal ScoreTotal { get; set; }
    public decimal Percentage { get; set; }
    public string FinalThoughts { get; set; }
  }


  public class ArtworkWithFilesDto : ArtWorkDto {
    public BasicMediaFileDto[] Files { get; set; }
  }

  public class ArtworkWithFilesAndScoresDto : ArtworkWithFilesDto {
    public JudgeArtworkScoreViewDto[] Scores { get; set; }
  }

  public class ArtworkMinimumDto {
    public string Id { get; set; }
    public LocalizedData ProjectName { get; set; }
  }
}