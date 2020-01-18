using MIA.Administration.Api.Base;
using MIA.Models.Entities.Enums;
using Microsoft.AspNetCore.Http;

namespace MIA.Administration.Api
{
    public class UpdatePhotoAlbumDto : IUpdateDto
    {
        public string Id { get; set; }
        public MediaType MediaType { get; set; }
        public int Order { get; set; }
        public IFormFile Poster { get; set; }
    }

}