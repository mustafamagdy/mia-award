namespace MIA.Models.Entities {
  public abstract class Payment : BaseEntity<string> {
    public string TransactionNumber { get; set; }
    public decimal Amount { get; set; }
    public long PaymentDate { get; set; }

    public string PaymentId { get; set; }
    public string PaymentStatus { get; set; }
    public string Last4Digits { get; set; }
    public string CardHolderName { get; set; }
    public string CardType { get; set; }
  }

}