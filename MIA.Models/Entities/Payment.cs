namespace MIA.Models.Entities {
  public class Payment : BaseEntity<string> {
    public AppUser User { get; set; }
    public string UserId { get; set; }

    public string TransactionNumber { get; set; }
    public decimal Amount { get; set; }
    public long PaymentDate { get; set; }
  }

}