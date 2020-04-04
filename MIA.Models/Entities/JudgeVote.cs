using MIA.Models.Entities;

namespace MIA.Models.Entities {
  public abstract class BaseJudgeVote : BaseEntity<string> {
    public int VotingValue { get; set; }

    public VotingCriteria Criteria { get; set; }
    public string CriteriaId { get; set; }
    public Judge Judge { get; set; }
    public string JudgeId { get; set; }
    public bool JudgeComplete { get; set; }
  }
}
