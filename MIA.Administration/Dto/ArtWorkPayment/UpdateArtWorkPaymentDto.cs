using MIA.Administration.Api;
using MIA.Models.Entities;

namespace MIA.Administration.Dto.ArtWorkPayment
{
  public class UpdateArtWorkPaymentDto {
    public string Id { get; set; }
    public ArtWorkDto ArtWork { get; set; }
    public string ArtWorkId { get; set; }
    public PaymentStatus PaymentStatus { get; set; }
    public byte[] Receipt { get; set; }
    public string ReceiptFileName { get; set; }
    public string TransactionNumber { get; set; }
    public decimal Amount { get; set; }
    public long PaymentDate { get; set; }
  }
}
