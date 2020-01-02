using AutoMapper;
using MIA.Authorization.Entities;
using MIA.Dto.Admin;
using System;
using System.ComponentModel.DataAnnotations;

namespace MIA.Mvc.Core {
  public class PermissionTypeConverter : ITypeConverter<Permissions, PermissionDto> {
    public PermissionDto Convert(Permissions source, PermissionDto destination, ResolutionContext context) {
      var dto = new PermissionDto();
      dto.Id = (short)source;

      var displayAttribute = source.GetAttribute<DisplayAttribute>();
      if (displayAttribute != null) {
        dto.Name = displayAttribute.Name;
        dto.Group = displayAttribute.GroupName;
      } else {
        dto.Name = source.ToString();
        dto.Group = "";
      }

      return dto;
    }
  }

}
