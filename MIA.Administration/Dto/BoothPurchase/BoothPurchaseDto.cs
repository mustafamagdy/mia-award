using MIA.Administration.Dto.BoothPayment;
using MIA.Models.Entities;

namespace MIA.Administration.Api
{
  public class BoothPurchaseDto
  {
    public string Id { get; set; }
    public string CompanyName { get; set; }
    public string Nationality { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public string Fax { get; set; }
    public string WebsiteUrl { get; set; }
    public string ContactPersonName { get; set; }
    public string ContactPersonTitle { get; set; }
    public string CellPhone1 { get; set; }
    public string CellPhone2 { get; set; }
    public string Email { get; set; }

    public string ExtraDetails { get; set; }
    public string CompanyFieldOfBusiness { get; set; }

    public bool ScreenOption { get; set; }
    public bool PrintingOption { get; set; }

    public S3File CompanyLogo { get; set; }

    public BoothPaymentDto Payment { get; set; }
    public string PaymentId { get; set; }

    public PaymentStatus PaymentStatus { get; set; }
    public string TransactionNumber { get; set; }
    public decimal Amount { get; set; }
    public long PaymentDate { get; set; }
  }

}