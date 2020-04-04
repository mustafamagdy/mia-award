using System.Collections.Generic;

namespace MIA.Models.Entities
{
  public class Contestant : BaseContestant {
    //todo add extra details

    public HashSet<ContestantJudgeVote> Votes { get; set; }

  }
}