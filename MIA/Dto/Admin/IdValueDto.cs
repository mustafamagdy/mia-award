using System;
using MIA.Dto.Base;

namespace MIA.Dto.Admin
{
  public class IdValueDto<T> : BaseResponse  where T: IEquatable<T> {
    public string Name { get; set; }
    public T Id { get; set; }
  }

  public class PermissionDto : BaseResponse { 
    public short Id { get; set; }
    public string Group { get; set; }
    public string Name { get; set; }
  }
}