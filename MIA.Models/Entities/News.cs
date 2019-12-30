using MIA.Models.Entities;

namespace MIA.Models.Entities {
  public class News : BaseEntity<string> {
    public string Title { get; set; }
    public string Body { get; set; }
    public long Date { get; set; }
    public bool Outdated { get; set; }

    public Image Image { get; set; }
    public string ImageId { get; set; }
  }
}
