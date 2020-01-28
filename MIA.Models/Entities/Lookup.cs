namespace MIA.Models.Entities {
  public abstract class Lookup : BaseEntity<string> {
    public string Code { get; set; }
    public LocalizedData Name { get; set; }
  }
}