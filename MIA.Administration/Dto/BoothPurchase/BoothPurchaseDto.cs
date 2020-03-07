using MIA.Administration.Dto.BoothPayment;
using MIA.Models.Entities;

namespace MIA.Administration.Api
{
  public class BoothPurchaseDto
  {
    public string Id { get; set; }
    public BoothsDto Booth { get; set; }
    public string BoothId { get; set; }

    public string ContactName { get; set; }
    public string Phone1 { get; set; }
    public string Phone2 { get; set; }
    public string Email { get; set; }
    public string EmailVerified { get; set; }
    public PurchaseStatus Status { get; set; }

    public BoothPaymentDto Payment { get; set; }
    public string PaymentId { get; set; }
  }

}