using MIA.Administration.Api.Base;
using MIA.Models.Entities.Enums;
using Microsoft.AspNetCore.Http;

namespace MIA.Administration.Api {
  public class UpdatePhotoAlbumDto : IUpdateDto {
    public string Id { get; set; }
    public string Title { get; set; }
    public IFormFile Poster { get; set; }

    public IFormFile[] NewFiles { get; set; }
    public string[] DeleteFiles { get; set; }
  }

}