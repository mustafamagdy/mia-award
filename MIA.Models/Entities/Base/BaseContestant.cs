using System.Collections.Generic;

namespace MIA.Models.Entities
{
  public abstract class BaseContestant : BaseEntity<string>
  {
    public Nominee Nominee { get; set; }
    public string NomineeId { get; set; }
  }
}