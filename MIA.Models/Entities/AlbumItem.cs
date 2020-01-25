using MIA.Models.Entities;
using MIA.Models.Entities.Enums;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class AlbumItem : BaseEntity<string> {
    public string FileKey { get; set; }
    public string FileUrl { get; set; }
    public MediaType MediaType { get; set; }
    public int Order { get; set; }
    public string AlbumId { get; set; }
    public Album Album { get; set; }
  }
}
