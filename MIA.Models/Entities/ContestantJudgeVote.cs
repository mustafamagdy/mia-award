namespace MIA.Models.Entities
{
  public class ContestantJudgeVote : BaseJudgeVote {
    public Contestant Contestant { get; set; }
    public string ContestantId { get; set; }
  }
}