namespace MIA.Models.Entities {
  public abstract class Comment : BaseEntity<string> {
    public string Name { get; set; }
    public string Email { get; set; }
    public string Title { get; set; }
    public long Date { get; set; }
    public string Comments { get; set; }
  }
}
