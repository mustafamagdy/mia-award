using MIA.Models.Entities;

namespace MIA.Api {
  public class LocalizedLookupDto {
    public string Id { get; set; }
    public string Code { get; set; }
    public LocalizedData Name { get; set; }
  }


}