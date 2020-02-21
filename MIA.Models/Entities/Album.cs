using MIA.Models.Entities;
using MIA.Models.Entities.Enums;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class Album : BaseEntity<string> {
    public bool MainGallery { get; set; }
    public LocalizedData Title { get; set; } 
    public List<AlbumItem> MediaItems { get; set; }
  }

}
