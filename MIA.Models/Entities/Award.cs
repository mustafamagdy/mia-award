using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class Award : BaseEntity<string> {
    public string Title { get; set; }
    public string Description { get; set; }

    public TrophyImage Trophy { get; set; }
    public string TrophyId { get; set; }
    public JudgeAward JudgeAward { get; set; }
    public string JudgeAwardId { get; set; }
    public Judge Manager { get; set; }
    public string ManagerId { get; set; }

    public HashSet<ArtWork> ArtWorks { get; set; }

  }
}
