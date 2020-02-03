using MIA.Models.Entities;

namespace MIA.Api {
  public class RecentShowsDto : BaseDto {
    public string Id { get; set; }
    public LocalizedData Title { get; set; }
    public double Rating { get; set; }
    public string PosterUrl { get; set; }
    public string PostedDate { get; set; }
    public string DateOfRelease { get; set; }
  }
}