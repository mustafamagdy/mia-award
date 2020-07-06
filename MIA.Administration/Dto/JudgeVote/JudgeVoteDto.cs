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

}