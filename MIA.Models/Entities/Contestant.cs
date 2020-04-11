using System.Collections.Generic;

namespace MIA.Models.Entities
{
  public class Contestant : BaseContestant {
    //todo add extra details

    public ContestantAward Award { get; set; }
    public string AwardId { get; set; }

    public HashSet<ContestantJudgeVote> Votes { get; set; }

    public ContestantAward WinnerAwardFirstPlace { get; set; }
    public string WinnerAwardFirstPlaceId { get; set; }
    public ContestantAward WinnerAwardSecondPlace { get; set; }
    public string WinnerAwardSecondPlaceId { get; set; }
  }
}