namespace MIA.Models.Entities
{
  public class Image : BaseEntity<string> {
    public byte[] Data { get; set; }
    /// <summary>
    /// Foreign key id for the referenced enityt, as this is a base class for all images
    /// </summary>
    public string RefId { get; set; }
    public string Imageurl => $"/r/{Id}";//?w={100}&h={200}&mode=stretch
  }

}