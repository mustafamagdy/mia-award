using MIA.Administration.Api;
using MIA.Models.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIA.Administration.Dto.ArtWorkPayment
{
    public class ArtWorkPaymentDto
    {
    public string Id { get; set; }
    public ArtWorkDto ArtWork { get; set; }
    public string ArtWorkId { get; set; }
    public PaymentStatus PaymentStatus { get; set; }
    public string ReceiptUrl { get; set; }

    public string TransactionNumber { get; set; }
    public decimal Amount { get; set; }
    public long PaymentDate { get; set; }
  }
}
