namespace MIA.Models.Entities
{
  public class Content : BaseEntity<string>
  {
    public string Data { get; set; }
    public ContentType ContentType { get; set; }
  }
}