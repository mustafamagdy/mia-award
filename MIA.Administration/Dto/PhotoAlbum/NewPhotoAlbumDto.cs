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
    public string MediaFileName { get; set; }
    public byte[] Media { get; set; }
    public bool Featured { get; set; }
    public MediaType MediaType { get; set; }
    public string AlbumId { get; set; }

  }
}