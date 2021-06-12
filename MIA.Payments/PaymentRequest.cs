namespace MIA.Payments {
  public class PaymentRequest {
    public int Amount { get; set; }
    public string Currency { get; set; }
    public bool DoThreeDS { get; set; }
    public string CardToken { get; set; }
    public bool Capture { get; set; } = false;
    public string Reference { get; set; }
    public string Last4Digits { get; set; }
    public string CardExpiresIn { get; set; }
    public string CardType { get; set; }
  }
}
