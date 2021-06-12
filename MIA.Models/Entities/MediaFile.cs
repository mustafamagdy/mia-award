using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class MediaFile : BaseEntity<string> {
    public MediaFile() {
      File = S3File.FromKeyAndUrl("", "");
    }
    
    public long UploadDate { get; set; }
    public string Description { get; set; }

    public S3File File { get; set; }

    public Artwork ArtWork { get; set; }
    public string ArtWorkId { get; set; }

    public HashSet<JudgeComment> Comments { get; set; }
  }
}
