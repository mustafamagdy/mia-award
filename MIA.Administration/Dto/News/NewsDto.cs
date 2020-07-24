using System;
using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Administration.Api {
  public class NewsDto {
    public string Id { get; set; }
    public LocalizedData Title { get; set; }
    public LocalizedData Body { get; set; }
    public string PosterUrl { get; set; }

    public DateTime Date { get; set; }
    public bool Featured { get; set; }
    public string Category { get; set; }
    public string Keywords { get; set; }
  }

}