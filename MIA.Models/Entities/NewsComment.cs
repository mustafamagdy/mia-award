namespace MIA.Models.Entities {
  public class NewsComment : Comment {
    public string NewsId { get; set; }
    public News News { get; set; }

    public bool IsApproved { get; set; }
  }
}
