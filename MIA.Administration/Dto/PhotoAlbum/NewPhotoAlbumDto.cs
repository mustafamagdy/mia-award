using MIA.Models.Entities;
using MIA.Models.Entities.Enums;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace MIA.Administration.Api
{
  public class NewPhotoAlbumDto
  {
    public IEnumerable<NewMediasDto> Files { get; set; }
    public LocalizedData Title { get; set; }

  }
  public class NewMediasDto
  {
    public LocalizedData Title { get; set; }
    public string MediaFileName { get; set; }
    public byte[] Media { get; set; }
    public bool Featured { get; set; }
    public MediaType MediaType { get; set; }
    //public string AlbumId { get; set; }
    public string PosterFileName { get; set; }
    public byte[] Poster { get; set; }

    public string FileKey { get; set; }
    public string FileUrl { get; set; }

  }
}