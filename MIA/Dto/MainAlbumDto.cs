namespace MIA.Api {
  public class MainAlbumDto : BaseDto {
    public string Description { get; set; }
    public AlbumItemDto[] Items { get; set; }
  }
}