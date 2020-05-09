namespace MIA.Models.Entities {
  public class ArtworkPayment : Payment {
    public Artwork Artwork { get; set; }
    public string ArtworkId { get; set; }
   
  }

}