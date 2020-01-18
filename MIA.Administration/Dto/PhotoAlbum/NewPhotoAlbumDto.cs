using MIA.Models.Entities.Enums;
using Microsoft.AspNetCore.Http;

namespace MIA.Administration.Api
{
    public class NewPhotoAlbumDto
    {
        public IFormFile Poster { get; set; }
        public MediaType MediaType { get; set; }
        public int Order { get; set; }
    }

}