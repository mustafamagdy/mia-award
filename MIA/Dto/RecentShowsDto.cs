using MIA.Models.Entities;

namespace MIA.Api {
  public class RecentShowsDto : BaseDto {
    public string Id { get; set; }
    public LocalizedData ProjectName { get; set; }
    public string PosterUrl { get; set; }
    public string PostedDate { get; set; }
    public string DateOfRelease { get; set; }
  }

  public class FullArtworkWithCommentsDto
  {
    public string Id { get; set; }
    public LocalizedData ProjectName { get; set; }
    public bool Featured { get; set; }

    public string PosterUrl { get; set; }
    public string TrailerUrl { get; set; }
    public string CoverUrl { get; set; }

    public long PostedDate { get; set; }
    public string DateOfRelease { get; set; }
    public string Country { get; set; }
    public LocalizedData Description { get; set; }
    public string Director { get; set; }
    public string Production { get; set; }
    public string Writers { get; set; }
    public string Story { get; set; }
    public string Stars { get; set; }
    public string Crew { get; set; }
    public double Rate { get; set; }
    public UserCommentDto[] Reviews { get; set; }

  }
}