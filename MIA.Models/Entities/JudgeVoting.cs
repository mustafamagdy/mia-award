namespace MIA.Models.Entities {
  public class JudgeVoting : BaseEntity<string> {
    public Media Media { get; set; }
    public string MediaId { get; set; }

    public VotingCriteria Criteria { get; set; }
    public string CriteriaId { get; set; }

    public string MediaTime { get; set; }
    public int VotingValue { get; set; }
    public string Comments { get; set; }
  }

}