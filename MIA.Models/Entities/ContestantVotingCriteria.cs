using System.Collections.Generic;

namespace MIA.Models.Entities
{
  public class ContestantVotingCriteria : BaseVotingCriteria {

    public ContestantAward Award { get; set; }
    public string AwardId { get; set; }

    public HashSet<ContestantJudgeVote> ContestantVotes { get; set; }
  }
}