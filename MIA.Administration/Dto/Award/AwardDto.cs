using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIA.Administration.Dto.Award {
  public class AwardDto {
    public string Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }

    // public TrophyImage Trophy { get; set; }
    public string TrophyId { get; set; }
    // public Judge Manager { get; set; }
    public string ManagerId { get; set; }

    //public HashSet<JudgeAward> JudgeAwards { get; set; }
    //public HashSet<ArtWork> ArtWorks { get; set; }
  }
}
