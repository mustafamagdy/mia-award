namespace MIA.Models.Entities {
  public class ArtWorkPayment : Payment {
    public Nominee Nominee { get; set; }
    public string NomineeId { get; set; }

    public ArtWork ArtWork { get; set; }
    public string ArtWorkId { get; set; }
  }

}