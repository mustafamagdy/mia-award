
using MIA.Models.Entities;

namespace MIA.Administration.Api
{
  public class NewVotingCriteriasDto
  {
    public LocalizedData Name { get; set; }
    public decimal Weight { get; set; }
    public int Order { get; set; }
    public string Code { get; set; }
    public VotingLevel Level { get; set; }

  }

}