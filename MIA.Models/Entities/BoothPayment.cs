namespace MIA.Models.Entities {
  public class BoothPayment : Payment {
    public BoothPurchase BoothPurchase { get; set; }
    public string BoothPurchaseId { get; set; }
  }

}