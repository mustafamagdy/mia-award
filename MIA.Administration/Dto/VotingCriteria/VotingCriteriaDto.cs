using MIA.Models.Entities;
using MIA.ORMContext;

namespace MIA.Administration.Api {
  public class VotingCriteriasDto {
    public string Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public JudgeLevel Level { get; set; }
    public int LevelNumber { get; set; }
    public decimal Weight { get; set; }
    public int Order { get; set; }
    public string AwardId { get; set; }
  }

  public class JudgeVoteCriteriaWithValueDto : VotingCriteriasDto {
    public int JudgeValue { get; set; }
  }

  public class VotingCriteriaSearchDto : IPagedData {
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public string AwardId { get; set; }
    public JudgeLevel? Level { get; set; }
  }
}