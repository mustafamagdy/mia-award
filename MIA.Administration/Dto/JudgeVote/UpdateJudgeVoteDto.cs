
using MIA.Administration.Api.Base;
using System.Collections.Generic;

namespace MIA.Administration.Api {
  public class UpdateJudgeVoteDto : IUpdateDto {
    public string Id { get; set; }
    public int VotingValue { get; set; } 
    public string ArtWorkId { get; set; }
  public List<VotingCriteriasDto> CriteriaValues { get; set; }
    // public Dictionary<string, string> CriteriaValues { get; set; }

    public string JudgeId { get; set; }
  }

}