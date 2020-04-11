namespace MIA.Models.Entities
{
  public class ArtworkJudgeVote : BaseJudgeVote {
    public ArtworkVotingCriteria Criteria { get; set; }
    public string CriteriaId { get; set; }


    public ArtWork ArtWork { get; set; }
    public string ArtworkId { get; set; }
  }
}