using MIA.Administration.Api.Base; 
using MIA.Models.Entities; 

namespace MIA.Administration.Dto.Award {
  public class AwardFilterDto : BaseSearchDto
  {  
    public AwardType AwardType { get; set; } 
  }
}
