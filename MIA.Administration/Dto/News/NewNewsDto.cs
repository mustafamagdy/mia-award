using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;

namespace MIA.Administration.Api
{
    public class NewNewsDto
    {
        //public IFormFile Poster { get; set; }
         public string Title { get; set; }
        public string Body { get; set; }


       // public Dictionary<string, string> Title { get; set; }
        //public Dictionary<string, string> Body { get; set; }
        public IFormFile Poster { get; set; } 
        public long Date { get; set; }
        public bool Outdated { get; set; }
    }

}