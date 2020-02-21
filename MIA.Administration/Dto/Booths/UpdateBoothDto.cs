using MIA.Administration.Api.Base;
using MIA.Models.Entities;
using Microsoft.AspNetCore.Http;

namespace MIA.Administration.Api
{
  public class UpdateBoothsDto : IUpdateDto
  {
    public string Id { get; set; }
    public LocalizedData Description { get; set; }
    public string Code { get; set; }
    public decimal Price { get; set; }
    public string Area { get; set; }
  }

}