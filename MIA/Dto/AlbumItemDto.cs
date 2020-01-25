namespace MIA.Api {
  public class AlbumItemDto : BaseDto {
    public string Url { get; set; }
    public int Order { get; set; }
    public AlbumItemType Type { get; set; }
  }
}