﻿using System.Collections.Generic;

namespace MIA.Administration.Api {
  public class BoothsDto {
    public string Id { get; set; }
    public string Description { get; set; }
    public string Code { get; set; }
    public decimal Price { get; set; }
    public List<BoothPurchaseDto> BoothPurchase { get; set; }
  }

}