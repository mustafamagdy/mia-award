using MIA.Administration.Api.Base;
using MIA.Administration.Dto.User; 
using System.Collections.Generic;

namespace MIA.Administration.Api {
  public class UpdateAwardDto : IUpdateDto {
    public string Id { get; set; }

    public JudgeDto Manager { get; set; }
    public string ManagerId { get; set; }

    public HashSet<JudgeAwardDto> JudgeAwards { get; set; }
    public HashSet<ArtWorkDto> ArtWorks { get; set; }
  }

}