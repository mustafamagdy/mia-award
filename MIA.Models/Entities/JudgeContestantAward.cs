using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class JudgeContestantAward : BaseJudgeAward {
    public ContestantAward Award { get; set; }
    public string AwardId { get; set; }
  }
}
