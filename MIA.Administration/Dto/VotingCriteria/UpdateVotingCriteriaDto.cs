using MIA.Administration.Api.Base;
using MIA.Models.Entities;

namespace MIA.Administration.Api
{
  public class UpdateVotingCriteriasDto : IUpdateDto
  {
    public string Id { get; set; }
    public LocalizedData Name { get; set; }
    public decimal Weight { get; set; }
    public int Order { get; set; }
    public string Code { get; set; }
    public JudgeLevel Level { get; set; }
    public string AwardId { get; set; }

  }

}