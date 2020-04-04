namespace MIA.Models.Entities
{
  public class ArtworkJudgeVote : BaseJudgeVote {
    public ArtWork ArtWork { get; set; }
    public string ArtworkId { get; set; }
  }
}