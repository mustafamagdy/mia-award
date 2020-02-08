using MIA.Models.Entities;

namespace MIA.Api {
  public class AwardDto : BaseDto {
    public string Id { get; set; }
    public string Code { get; set; }
    public LocalizedData Title { get; set; }
    public string TrophyUrl { get; set; }
    public int Order { get; set; }
    public LocalizedData Description { get; set; }
    public decimal ArtworkFee { get; set; }
  }
}