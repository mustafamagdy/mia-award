namespace MIA.Models.Entities {
  public class JudgeAward : BaseEntity<string> {
    public Judge Judge { get; set; }
    public string JudgeId { get; set; }
    public Award Award { get; set; }
    public string AwardId { get; set; }
    public JudgeLevel Level { get; set; }
  }
}