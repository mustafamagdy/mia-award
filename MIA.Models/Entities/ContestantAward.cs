using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Models.Entities {

  public class ContestantAward : BaseAward {
    public HashSet<Contestant> Contestants{ get; set; }
    public HashSet<ContestantVotingCriteria> VotingCriterias { get; set; }
    public HashSet<JudgeContestantAward> JudgeContestantAwards { get; set; }
    
    public Contestant FirstPlace { get; set; }
    public string FirstPlaceContestantId { get; set; }

    public Contestant SecondPlace { get; set; }
    public string SecondPlaceContestantId { get; set; }
  }
}
