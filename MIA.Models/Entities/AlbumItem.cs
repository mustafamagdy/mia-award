using MIA.Models.Entities;
using MIA.Models.Entities.Enums;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class AlbumItem : BaseEntity<string> {
    public AlbumItem() {
      File = S3File.FromKeyAndUrl("", "");
      Poster = S3File.FromKeyAndUrl("", "");
    }

    public LocalizedData Title { get; set; }
    public long DateCreated { get; set; }
    public bool Featured { get; set; }
    public S3File File { get; set; }
    public S3File Poster { get; set; }

    public MediaType MediaType { get; set; }
    public int Order { get; set; }
    public string AlbumId { get; set; }
    public Album Album { get; set; }
  }
}
