using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class ArtworkVotingCriteria : BaseVotingCriteria {

    public ArtworkAward Award { get; set; }
    public string AwardId { get; set; }

    public HashSet<ArtworkJudgeVote> ArtworkVotes { get; set; }
  }
}