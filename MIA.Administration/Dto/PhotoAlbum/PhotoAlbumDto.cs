using MIA.Models.Entities.Enums;
using System.Collections.Generic;

namespace MIA.Administration.Api
{
    public class PhotoAlbumDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public List<PhotoAlbumFileDto> Files { get; set; }
    }

    public class PhotoAlbumFileDto
    {
        public MediaType MediaType { get; set; }
        public int Order { get; set; }
        public string ImageUrl { get; set; }
    }
}