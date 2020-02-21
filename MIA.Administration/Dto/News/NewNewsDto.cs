using MIA.Models.Entities;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;

namespace MIA.Administration.Api {
  public class NewNewsDto { 
    public LocalizedData Title { get; set; }
    public LocalizedData Body { get; set; }
    public byte[] Poster { get; set; }
    public string PosterFileName { get; set; }
    public long Date { get; set; }
    public bool Outdated { get; set; }
  }

}