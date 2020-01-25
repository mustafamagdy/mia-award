namespace MIA.Api {
  public class AwardDto : BaseDto {
    public string Id { get; set; }
    public string Title { get; set; }
    public string TrophyUrl { get; set; }
    public int Order { get; set; }
  }
}