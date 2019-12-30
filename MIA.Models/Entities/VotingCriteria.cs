using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class VotingCriteria : BaseEntity<string> {
    public string Code { get; set; }
    public string Name { get; set; }

    public decimal Weight { get; set; }
    public int Order { get; set; }

    public HashSet<JudgeVote> Votes { get; set; }
  }

}