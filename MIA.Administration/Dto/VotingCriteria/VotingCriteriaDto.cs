using MIA.Models.Entities;

namespace MIA.Administration.Api {
  public class VotingCriteriasDto {
    public string Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public JudgeLevel Level { get; set; }
    public decimal Weight { get; set; }
    public int Order { get; set; }
  }

  public class JudgeVoteCriteriaWithValueDto : VotingCriteriasDto {
    public int JudgeValue { get; set; }
  }
}