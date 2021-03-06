
using System.Collections.Generic;

namespace MIA.Administration.Api {
  public class NewJudgeVoteDto { 
    public int VotingValue { get; set; } 
    public string ArtWorkId { get; set; } 
    public string CriteriaId { get; set; }
    public List<int> CriteriaValues { get; set; }
    public string JudgeId { get; set; }
  }

}