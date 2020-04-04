using System;
using MIA.Authorization.Entities;
using MIA.Dto.Base;

namespace MIA.Dto.Admin
{
  public class IdValueDto<T> : BaseResponse  where T: IEquatable<T> {
    public string Name { get; set; }
    public T Id { get; set; }
  }
}