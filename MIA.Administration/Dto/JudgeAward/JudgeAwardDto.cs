using MIA.Administration.Dto.Award;
using MIA.Administration.Dto.User;
using MIA.Models.Entities;

namespace MIA.Administration.Api
{
  public class JudgeAwardDto
  {
    public string Id { get; set; }
    //public JudgeDto Judge { get; set; }
    public string JudgeId { get; set; }
    //  public AwardDto Award { get; set; }
    public string AwardId { get; set; }
    public JudgeLevel Level{ get; set; }
  }

}