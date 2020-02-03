using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class Award : BaseEntity<string> {
    public string Code { get; set; }
    public LocalizedData Title { get; set; }
    public LocalizedData Description { get; set; }
    public string TrophyImageKey { get; set; }
    public string TrophyImageUrl { get; set; }

    public Judge Manager { get; set; }
    public string ManagerId { get; set; }

    public HashSet<JudgeAward> JudgeAwards { get; set; }
    public HashSet<ArtWork> ArtWorks { get; set; }

  }
}
