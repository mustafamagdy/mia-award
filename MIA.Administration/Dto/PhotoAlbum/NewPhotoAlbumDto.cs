using MIA.Models.Entities.Enums;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace MIA.Administration.Api {
  public class NewPhotoAlbumDto {
    public IEnumerable<IFormFile> Files { get; set; }
    public string Title { get; set; }
    public IFormFile Poster { get; set; }

  }

}