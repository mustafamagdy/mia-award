namespace MIA.Models.Entities {
  public abstract class Payment : BaseEntity<string> {
    public Payment() {
      Receipt = S3File.FromKeyAndUrl("", ""); 
    }
    public string TransactionNumber { get; set; }
    public decimal Amount { get; set; }
    public long PaymentDate { get; set; }

    public string PaymentId { get; set; }
    public string Last4Digits { get; set; }
    public string CardHolderName { get; set; }
    public string CardType { get; set; }

    public PaymentStatus PaymentStatus { get; set; }
    public S3File Receipt { get; set; }
    public bool IsOffline { get; set; }
  }

}