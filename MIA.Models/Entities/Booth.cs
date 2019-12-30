using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class Booth : BaseEntity<string> {
    public string Code { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }


    public HashSet<BoothPurchase> Purchases { get; set; }
  }

}