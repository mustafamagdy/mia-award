namespace MIA.Models.Entities
{
  public class Image : BaseEntity<string> {
    public byte[] Data { get; set; }
    public string Imageurl => $"/r/{Id}";//?w={100}&h={200}&mode=stretch
  }

}