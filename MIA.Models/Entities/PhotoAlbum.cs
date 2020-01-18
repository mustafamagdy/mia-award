using MIA.Models.Entities;
using MIA.Models.Entities.Enums;
using System.Collections.Generic;

namespace MIA.Models.Entities
{
    public class PhotoAlbum : BaseEntity<string>
    {
        public string Title { get; set; }
        public HashSet<PhotoAlbumImage> Images { get; set; }
    }

}
