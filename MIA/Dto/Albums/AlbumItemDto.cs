using MIA.Models.Entities;
using MIA.Models.Entities.Enums;

namespace MIA.Api {
  public class AlbumItemDto : BaseDto {
    public string Id { get; set; }
    public string FileUrl { get; set; }
    public int Order { get; set; }
    public MediaType MediaType { get; set; }
    public bool Featured { get; set; }
    public string DateCreated { get; set; }
    public LocalizedData Title { get; set; }
  }
}