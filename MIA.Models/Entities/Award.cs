namespace MIA.Models.Entities {
  public class Award : BaseEntity<string> {
    public string Title { get; set; }
    public string Description { get; set; }
    public AwardImage AwardImage { get; set; }
    public string AwardImageId { get; set; }
  }

}