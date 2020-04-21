using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class ContestantVotingCriteria : BaseVotingCriteria {

    //awatd is optional for general voting criteria
    public ContestantAward Award { get; set; }
    public string AwardId { get; set; }

    public HashSet<ContestantJudgeVote> ContestantVotes { get; set; }
  }
}