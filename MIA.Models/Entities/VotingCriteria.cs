using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class VotingCriteria : BaseEntity<string> {
    public string Code { get; set; }
    public LocalizedData Name { get; set; }

    public decimal Weight { get; set; }
    public int Order { get; set; }

    public Award Award { get; set; }
    public string AwardId { get; set; }

    public HashSet<ArtworkJudgeVote> ArtworkVotes { get; set; }
    public HashSet<ContestantJudgeVote> ContestantVotes { get; set; }
  }
}