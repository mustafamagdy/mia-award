namespace MIA.Models.Entities
{
  public class ArtworkReview : Comment {
    public string ArtworkId { get; set; }
    public Artwork Artwork { get; set; }

    public bool IsApproved { get; set; }
  }
}