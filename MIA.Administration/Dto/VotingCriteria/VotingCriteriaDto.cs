using MIA.Administration.Dto.Award;
using MIA.Models.Entities;

namespace MIA.Administration.Api {
  public class VotingCriteriasDto {
    public string Id { get; set; }
    public decimal Weight { get; set; }
    public int Order { get; set; }
    public string Code { get; set; }
    public JudgeLevel Level { get; set; }
    public AwardDto Award { get; set; }
    public string AwardId { get; set; }
  }

  public class JudgeVoteCriteriaWithValueDto : VotingCriteriasDto {
    public int JudgeValue { get; set; }
  }
}