namespace MIA.Models.Entities
{
  public abstract class BaseAward : BaseEntity<string> {
    public string Code { get; set; }
    public LocalizedData Title { get; set; }
    public LocalizedData Description { get; set; }
    public decimal ArtworkFee { get; set; }
    public string TrophyImageKey { get; set; }
    public string TrophyImageUrl { get; set; }

    public AwardType AwardType { get; set; }

    public Judge Manager { get; set; }
    public string ManagerId { get; set; }
  }
}