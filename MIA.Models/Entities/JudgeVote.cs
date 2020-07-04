namespace MIA.Models.Entities
{
  public class JudgeVote : BaseEntity<string> {
    public int? VotingValue { get; set; }

    public Judge Judge { get; set; }
    public string JudgeId { get; set; }

    public VotingCriteria Criteria { get; set; }
    public string CriteriaId { get; set; }


    public Artwork Artwork { get; set; }
    public string ArtworkId { get; set; }
  }
}