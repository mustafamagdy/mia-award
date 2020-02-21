using MIA.Models.Entities;

namespace MIA.Administration.Api {
  public class BoothsDto {
    public string Id { get; set; }
    public LocalizedData Description { get; set; }
    public string Code { get; set; }
    public decimal Price { get; set; }
  }

}