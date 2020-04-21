namespace MIA.Models.Entities {
  public abstract class BaseVotingCriteria : BaseEntity<string> {
    public string Code { get; set; }
    public LocalizedData Name { get; set; }
    public VotingLevel Level { get; set; }
    public decimal Weight { get; set; }
    public int Order { get; set; }
  }
}