using MIA.Models.Entities;

namespace MIA.Models.Entities {
  public class MediaFile : BaseEntity<string> {
    public long UploadDate { get; set; }
    public string Description { get; set; }

    public ArtWork ArtWork { get; set; }
    public string ArtWorkId { get; set; }
  }
}
