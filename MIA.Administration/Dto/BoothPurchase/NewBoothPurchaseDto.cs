using MIA.Administration.Dto.BoothPayment;

namespace MIA.Administration.Api
{
  public class NewBoothPurchaseDto
  {
    public string BoothId { get; set; }

    public string ContactName { get; set; }
    public string Phone1 { get; set; }
    public string Phone2 { get; set; }
    public string Email { get; set; }

    public NewBoothPaymentDto Payment { get; set; }
  }
}
 