using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class News : BaseEntity<string> {
    public LocalizedData Title { get; set; }
    public LocalizedData Body { get; set; }
    public long Date { get; set; }
    public bool Outdated { get; set; }
    public bool Featured { get; set; }
    public string Category { get; set; }

    public string PosterId { get; set; }
    public string PosterUrl { get; set; }

    public HashSet<NewsComment> Comments { get; set; }
  }
}
