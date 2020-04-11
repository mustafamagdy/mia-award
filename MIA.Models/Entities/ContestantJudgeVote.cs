namespace MIA.Models.Entities
{
  public class ContestantJudgeVote : BaseJudgeVote {
    public ContestantVotingCriteria Criteria { get; set; }
    public string CriteriaId { get; set; }


    public Contestant Contestant { get; set; }
    public string ContestantId { get; set; }
  }
}