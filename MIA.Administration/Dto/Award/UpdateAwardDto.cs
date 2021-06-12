using MIA.Administration.Api.Base;
using MIA.Administration.Dto.User;
using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Administration.Api {
  public class UpdateAwardDto : IUpdateDto {
    public string Id { get; set; }

    public string ManagerId { get; set; }
    public LocalizedData Title { get; set; }
    public LocalizedData Description { get; set; }

    public string[] AddLevel1Judges { get; set; }
    public string[] AddLevel2Judges { get; set; }
     
    public string[] RemoveLevel1Judges { get; set; }
    public string[] RemoveLevel2Judges { get; set; }
  }

}