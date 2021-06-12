using MIA.Administration.Api.Base;
using MIA.Models.Entities;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace MIA.Administration.Api
{
  public class UpdateNewsDto : IUpdateDto
  {
    public UpdateNewsDto()
    {
      Poster = S3File.FromKeyAndUrl("", "");
    }
    public string Id { get; set; }
    public LocalizedData Title { get; set; }
    public LocalizedData Body { get; set; }
    public byte[] PosterByte { get; set; }
    public string PosterFileName { get; set; }

    public long Date { get; set; }
    public bool Featured { get; set; }
    public string Keywords { get; set; }
    public string Category { get; set; }
    public S3File Poster  { get; set; }
  }

}