using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class Contestant : BaseContestant {
    //todo add extra details

    public int YearOfExpereince { get; set; }
    public ContestantRole Role { get; set; }


    public ContestantPayment Payment { get; set; }
    public string PaymentId { get; set; }
    public ContestantAward Award { get; set; }
    public string AwardId { get; set; }

    public HashSet<ContestantJudgeVote> Votes { get; set; }

    public ContestantAward WinnerAwardFirstPlace { get; set; }
    public string WinnerAwardFirstPlaceId { get; set; }
    public ContestantAward WinnerAwardSecondPlace { get; set; }
    public string WinnerAwardSecondPlaceId { get; set; }
  }
}