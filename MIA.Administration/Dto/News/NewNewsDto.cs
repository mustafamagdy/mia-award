using Microsoft.AspNetCore.Http;

namespace MIA.Administration.Api {
  public class NewNewsDto {
    public IFormFile Poster { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
  }

}