
using MIA.Administration.Api;
using MIA.Administration.Dto.User;
using System.Collections.Generic;

namespace MIA.Administration.Dto.Award {
  public class AwardDetailsDto {
    public string Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }

    // public TrophyImage Trophy { get; set; }
    public string TrophyId { get; set; }
    public JudgeDto Manager { get; set; }
    public string ManagerId { get; set; }

    public List<JudgeAwardDto> JudgeAwards { get; set; }
    //public HashSet<ArtWork> ArtWorks { get; set; }
  }
}
