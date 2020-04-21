namespace MIA.Models.Entities {
  public class ContestantPayment : Payment {
    public Contestant Contestant { get; set; }
    public string ContestantId { get; set; }
   
  }

}