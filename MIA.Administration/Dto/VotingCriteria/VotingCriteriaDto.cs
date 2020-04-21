using MIA.Models.Entities;

namespace MIA.Administration.Api {
  public class VotingCriteriasDto {
    public string Id { get; set; }
    public LocalizedData Name { get; set; }
    public decimal Weight { get; set; }
    public int Order { get; set; }
    public string Code { get; set; }
  }

}