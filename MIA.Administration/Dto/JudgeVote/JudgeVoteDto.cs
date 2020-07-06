using MIA.Administration.Dto.Award;
using MIA.Administration.Dto.User;
using MIA.Models.Entities;
using MIA.ORMContext;

namespace MIA.Administration.Api {
  public class JudgeVoteDto {
    public string Id { get; set; }
    public int VotingValue { get; set; }
    public ArtWorkDto ArtWork { get; set; }
    public string ArtWorkId { get; set; }
    public VotingCriteriasDto Criteria { get; set; }
    public string CriteriaId { get; set; }
    public JudgeDto Judge { get; set; }
    public string JudgeId { get; set; }
  }

  public class JudgeCompleteWithFinalThoughtDto {
    public string ArtworkId { get; set; }
    public JudgeLevel Level { get; set; }
    public string FinalThoughts { get; set; }
  }

  public class JudgeStatisticsFilter {
    public JudgeLevel? Level { get; set; }
    public string AwardId { get; set; }
  }

  public class ArtworkStatisticsFilter : IPagedData {
    public string AwardId { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
  }

  public class CriteriaVoteWithValue {
    public string CriteriaName { get; set; }
    public decimal Weight { get; set; }
    public int VotedValue { get; set; }
    public decimal WeightedValue { get; set; }
    public int LevelNumber { get; set; }
  }

  public class ArtworkVotingDetails {
    public string Id { get; set; }
    public LocalizedData ProjectName { get; set; }
    public LocalizedData Description { get; set; }
    public string PosterUrl { get; set; }
    public string TrailerUrl { get; set; }
    public string CoverUrl { get; set; }
    public bool UploadComplete { get; set; }
    public string SiteUrl { get; set; }
    public int ProductionYear { get; set; }
    public int BroadcastYear { get; set; }
    public string TvChannels { get; set; }
    public string OnlineChannels { get; set; }
    public string ProductionLicenseNumber { get; set; }
    public string ProductionLicenseAgency { get; set; }

    public CriteriaVoteWithValue[] Votes { get; set; }
  }
}