namespace MIA.Models.Entities {
  public abstract class Payment : BaseEntity<string> {
    public string TransactionNumber { get; set; }
    public decimal Amount { get; set; }
    public long PaymentDate { get; set; }
  }

}