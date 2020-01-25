using MIA.Administration.Api.Base;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace MIA.Administration.Api
{
    public class UpdateNewsDto : IUpdateDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        //public Dictionary<string, string> Title { get; set; }
        //public Dictionary<string, string> Body { get; set; }
        public IFormFile Poster { get; set; }

        public long Date { get; set; }
        public bool Outdated { get; set; }
    }

}