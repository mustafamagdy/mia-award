
using MIA.Administration.Api.Base;

namespace MIA.Administration.Api {
  public class UpdateJudgeVoteDto : IUpdateDto {
    public string Id { get; set; }
    public int VotingValue { get; set; } 
    public string ArtWorkId { get; set; } 
    public string CriteriaId { get; set; } 
    public string JudgeId { get; set; }
  }

}