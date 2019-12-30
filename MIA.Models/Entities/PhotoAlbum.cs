using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class PhotoAlbum : BaseEntity<string> {
    public string Title { get; set; }
    public string Body { get; set; }
    public int Order { get; set; }
    public HashSet<Image> Images { get; set; }
  }
}
