using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class JudgeAward : BaseEntity<string> {
    public HashSet<Judge> Judges { get; set; }
    public HashSet<Award> Awards { get; set; }
  }
}
