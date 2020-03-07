using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Administration.Api {
  public class BoothsDto {
    public string Id { get; set; }
    public LocalizedData Description { get; set; }
    public string Code { get; set; }
    public decimal Price { get; set; }
    public string Area { get; set; }
    public bool HasConfirmedPayment { get; set; }
    public List<BoothPurchaseDto> BoothPurchase { get; set; }
  }

}