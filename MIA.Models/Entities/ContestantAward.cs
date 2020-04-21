using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Models.Entities {

  public class ContestantAward : BaseAward {
    public HashSet<JudgeContestantAward> Level1Judges { get; set; }
    public HashSet<JudgeContestantAward> Level2Judges { get; set; }

    public HashSet<Contestant> Contestants{ get; set; }
    public HashSet<ContestantVotingCriteria> VotingCriterias { get; set; }
    
    public Contestant FirstPlace { get; set; }
    public string FirstPlaceContestantId { get; set; }

    public Contestant SecondPlace { get; set; }
    public string SecondPlaceContestantId { get; set; }
  }
}
