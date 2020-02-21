
using MIA.Administration.Dto.User;
using MIA.Models.Entities;

namespace MIA.Administration.Dto.Award {
  public class AwardDto {
    public string Id { get; set; }
    public LocalizedData Title { get; set; }
    public LocalizedData Description { get; set; }

    // public TrophyImage Trophy { get; set; }
    public string TrophyId { get; set; }
    public JudgeDto Manager { get; set; }
    public string ManagerId { get; set; } 
  }
}
