using MIA.Administration.Api.Base;

namespace MIA.Administration.Api {
  public class UpdateNewsDto : IUpdateDto {
    public string Id { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
  }

}