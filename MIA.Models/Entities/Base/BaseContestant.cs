using System.Collections.Generic;

namespace MIA.Models.Entities
{
  public abstract class BaseContestant : BaseEntity<string>
  {
    public Award Award { get; set; }
    public string AwardId { get; set; }
    public Nominee Nominee { get; set; }
    public string NomineeId { get; set; }

    public Award WinnerAwardFirstPlace { get; set; }
    public string WinnerAwardFirstPlaceId { get; set; }
    public Award WinnerAwardSecondPlace { get; set; }
    public string WinnerAwardSecondPlaceId { get; set; }


  }
}