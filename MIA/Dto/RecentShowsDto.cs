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
    public LocalizedData Description { get; set; }
    public bool Featured { get; set; }

    public string PosterUrl { get; set; }
    public string TrailerUrl { get; set; }
    public string CoverUrl { get; set; }

    public string SiteUrl { get; set; }
    public int ProductionYear { get; set; }
    public int BroadcastYear { get; set; }
    public string TvChannels { get; set; }
    public string OnlineChannels { get; set; }
    public string ProductionLicenseNumber { get; set; }
    public string ProductionLicenseAgency { get; set; }
    
    public UserCommentDto[] Reviews { get; set; }

  }
}