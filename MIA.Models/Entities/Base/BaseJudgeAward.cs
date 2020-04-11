namespace MIA.Models.Entities
{
  public abstract class BaseJudgeAward : BaseEntity<string> {
    public Judge Judge { get; set; }
    public string JudgeId { get; set; }
  }
}