namespace MIA.Models.Entities
{
  public class JudgeArtworkAward : BaseJudgeAward {
    public ArtworkAward Award { get; set; }
    public string AwardId { get; set; }
  }
}