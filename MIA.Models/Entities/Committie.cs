using System.Collections.Generic;
namespace MIA.Models.Entities {
  public class Committie : BaseEntity<string> {
    public Judge Manager { get; set; }
    public HashSet<Judge> Judges { get; set; }

    public HashSet<AwardSubmission> Submissions { get; set; }
  }
}