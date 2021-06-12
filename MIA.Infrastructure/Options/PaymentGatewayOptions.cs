namespace MIA.Infrastructure.Options {
  public class PaymentGatewayOptions {

    public string SuccessRoute { get; set; }
    public string FailRoute { get; set; }
    public bool UseSandbox { get; set; }
    public string SecretKey { get; set; }
    public string PublicKey { get; set; }
  }
}