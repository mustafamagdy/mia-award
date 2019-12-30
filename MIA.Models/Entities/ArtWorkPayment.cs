namespace MIA.Models.Entities {
  public class ArtWorkPayment : Payment {
    public ArtWork ArtWork { get; set; }
    public string ArtWorkId { get; set; }
  }

}