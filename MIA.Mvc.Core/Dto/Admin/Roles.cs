using MIA.Dto.Base;

namespace MIA.Dto.Admin {
  public class RoleDto : BaseResponse {
    public string Name { get; set; }
    public string Id { get; set; }
    public bool SystemRole { get; set; }
  }

}
