using MIA.Administration.Api.Base;
using MIA.Models.Entities;
using MIA.Models.Entities.Enums;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace MIA.Administration.Api {
  public class UpdatePhotoAlbumDto : IUpdateDto {
    public string Id { get; set; }
    public LocalizedData Title { get; set; } 
     
    public string[] DeleteFiles { get; set; }
    public IEnumerable<NewMediasDto> NewFiles { get; set; }

  } 
}