using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class News : BaseEntity<string> {
    public News() {
      Poster = S3File.FromKeyAndUrl("", "");
    }
    
    public LocalizedData Title { get; set; }
    public LocalizedData Body { get; set; }
    public long Date { get; set; }
    public bool Outdated { get; set; }
    public bool Featured { get; set; }
    public string Category { get; set; }

    public string Keywords { get; set; }

    public S3File Poster { get; set; }

    public HashSet<NewsComment> Comments { get; set; }
  }
}
