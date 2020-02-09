﻿
using MIA.Administration.Dto.User;

namespace MIA.Administration.Dto.Award {
  public class AwardDto {
    public string Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }

    // public TrophyImage Trophy { get; set; }
    public string TrophyId { get; set; }
    public JudgeDto Manager { get; set; }
    public string ManagerId { get; set; } 
  }
}
