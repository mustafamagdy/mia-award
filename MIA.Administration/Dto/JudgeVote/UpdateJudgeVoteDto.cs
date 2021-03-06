
using MIA.Administration.Api.Base;
using System.Collections.Generic;
using MIA.Models.Entities;

namespace MIA.Administration.Api
{
  public class UpdateJudgeVoteDto : IUpdateDto
  {
    public string Id { get; set; }
    public string ArtWorkId { get; set; }
    public List<VotingCriteriaVoteDto> CriteriaValues { get; set; }

    public string JudgeId { get; set; }
    public JudgeLevel Level { get; set; }
  }
  public class VotingCriteriaVoteDto
  {
    public string Id { get; set; } 
    public decimal Weight { get; set; }
    public int Order { get; set; }
    public string Code { get; set; }
    public int JudgeValue { get; set; }
    public VotingCriteriasDto Criteria { get; set; }
  }
}