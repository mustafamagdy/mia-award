namespace MIA.Models.Entities
{
  public class ArtworkReview : Comment {
    public string ArtworkId { get; set; }
    public ArtWork Artwork { get; set; }

    public bool IsApproved { get; set; }
  }
}