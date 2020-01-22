using AutoMapper;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using MIA.Dto.Admin;
using System;
using System.ComponentModel.DataAnnotations;

namespace MIA.Mvc.Core {
  public class PermissionTypeConverter : ITypeConverter<Permissions, PermissionDto> {
    public PermissionDto Convert(Permissions source, PermissionDto destination, ResolutionContext context) {
      var dto = new PermissionDto();
      dto.Id = (short)source;

      var moduleAttribute = source.GetAttribute<PermissionDescriptorAttribute>();
      if (moduleAttribute != null) {
        dto.Name = moduleAttribute.Name;
        dto.SystemModule = moduleAttribute.SystemModule;
      } else {
        dto.Name = source.ToString();
        dto.SystemModule = SystemModules.Dashboard;
      }

      return dto;
    }
  }

}
