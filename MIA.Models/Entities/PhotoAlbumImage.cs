using MIA.Models.Entities;
using MIA.Models.Entities.Enums;
using System.Collections.Generic;

namespace MIA.Models.Entities { 
    public class PhotoAlbumImage : Image
    {
        public MediaType MediaType { get; set; }
        public int Order { get; set; }
        public string PhotoAlbumId { get; set; }
        public PhotoAlbum PhotoAlbum { get; set; } 
    }
}
