
using MIA.Administration.Dto.User;
using MIA.Models.Entities;

namespace MIA.Administration.Dto.Award {
  public class AwardDto {
    public AwardDto() {
      Trophy = S3File.FromKeyAndUrl("", "");
    }
    public string Id { get; set; }
    public LocalizedData Title { get; set; }
    public LocalizedData Description { get; set; }
    public AwardType AwardType { get; set; }
    public S3File Trophy { get; set; }
    public string TrophyUrl { get; set; }
    // public TrophyImage Trophy { get; set; }
    //public string TrophyId { get; set; }
    public JudgeDto Manager { get; set; }
    public string ManagerId { get; set; }
  }

  public class AwardMinimumDto {
    public string Id { get; set; }
    public LocalizedData Title { get; set; }
  }
}
