using MIA.Models.Entities;
using MIA.Models.Entities.Enums;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class Album : BaseEntity<string> {
    public bool MainGallery { get; set; }
    public string Title { get; set; }
    public string PosterId { get; set; }
    public string PosterUrl { get; set; }
    public HashSet<AlbumItem> MediaItems { get; set; }
  }

}
