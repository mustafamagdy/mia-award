using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Administration.Api
{
    public class NewsDto
    {
        public string Id { get; set; }
        //public Dictionary<string, string> Title { get; set; }
        //public Dictionary<string, string> Body { get; set; }


        public LocalizedData Title { get; set; }
        public LocalizedData Body { get; set; }
        public string PosterUrl { get; set; }

        public long Date { get; set; }
        public bool Outdated { get; set; }
    }

}