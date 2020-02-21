using MIA.Models.Entities;
using MIA.Models.Entities.Enums;
using System.Collections.Generic;

namespace MIA.Administration.Api {
  public class PhotoAlbumDto {
    public string Id { get; set; }
    public LocalizedData Title { get; set; }
    public bool MainGallery { get; set; }

    public List<PhotoAlbumFileDto> MediaItems { get; set; }
  }

  public class PhotoAlbumFileDto {
    public string  Id { get; set; }
    public MediaType MediaType { get; set; }
    public int Order { get; set; }
    public string FileKey { get; set; }
    public string FileUrl { get; set; }
    public bool Featured { get; set; }
  }
}