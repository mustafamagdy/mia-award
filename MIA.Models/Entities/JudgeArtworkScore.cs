namespace MIA.Models.Entities
{
  public class JudgeArtworkScore : BaseEntity<string>
  {
    public Artwork Artwork { get; set; }
    public string ArtworkId { get; set; }
    public Judge Judge { get; set; }
    public string JudgeId { get; set; }

    public JudgeLevel Level { get; set; }
    public decimal Score { get; set; }
    public decimal ScoreTotal { get; set; }
    public decimal Percentage { get; set; }
    public string FinalThoughts { get; set; }
  }
}