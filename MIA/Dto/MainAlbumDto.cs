using MIA.Models.Entities;

namespace MIA.Api {
  public class MainAlbumDto : BaseDto {
    public LocalizedData Title { get; set; }
    public AlbumItemDto[] Items { get; set; }
  }
}