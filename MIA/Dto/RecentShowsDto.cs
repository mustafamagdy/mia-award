namespace MIA.Api {
  public class RecentShowsDto : BaseDto {
    public string Id { get; set; }
    public string Title { get; set; }
    public int Rating { get; set; }
    public string PosterUrl { get; set; }
  }
}