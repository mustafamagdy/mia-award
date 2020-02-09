using MIA.Administration.Dto.User;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace MIA.Administration.Api {
  public class NewAwardDto {

    public JudgeDto Manager { get; set; }
    public string ManagerId { get; set; }

    public HashSet<JudgeAwardDto> JudgeAwards { get; set; }
    public HashSet<ArtWorkDto> ArtWorks { get; set; }

  }

}