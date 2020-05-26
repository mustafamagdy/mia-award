using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class VotingCriteria :  BaseEntity<string> {
 public string Code { get; set; }
    public LocalizedData Name { get; set; }
    public VotingLevel Level { get; set; }
    public decimal Weight { get; set; }
    public int Order { get; set; }

    //awatd is optional for general voting criteria
    public Award Award { get; set; }
    public string AwardId { get; set; }

    public HashSet<JudgeVote> ArtworkVotes { get; set; }
  }
}