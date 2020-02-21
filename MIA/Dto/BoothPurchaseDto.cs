namespace MIA.Api
{
  public class BoothPurchaseDto {
    public string BoothCode { get; set; }
    public string ContactName { get; set; }
    public string Phone1 { get; set; }
    public string Phone2 { get; set; }
    public string Email { get; set; }

    public PaymentDto Payment { get; set; }

  }
}