using MIA.Administration.Api.Base;
using MIA.Administration.Dto.User;
using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Administration.Api {
  public class UpdateAwardDto : IUpdateDto {
    public string Id { get; set; }

    public JudgeDto Manager { get; set; }
    public string ManagerId { get; set; }

    public LocalizedData Title { get; set; }
    public LocalizedData Description { get; set; }

    //public HashSet<JudgeAwardDto> JudgeAwards { get; set; }
    public HashSet<JudgeAwardDto> Level1Judges { get; set; }
    public HashSet<JudgeAwardDto> Level2Judges { get; set; }


    public HashSet<JudgeAwardDto>? AddLevel1Judges { get; set; }
    public HashSet<JudgeAwardDto>? AddLevel2Judges { get; set; }
     
    public HashSet<JudgeAwardDto>? RemoveLevel1Judges { get; set; }
    public HashSet<JudgeAwardDto>? RemoveLevel2Judges { get; set; }

    public HashSet<ArtWorkDto> ArtWorks { get; set; }
  }

}