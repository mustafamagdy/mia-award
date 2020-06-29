using AutoMapper;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using MIA.Dto.Admin;
using System;
using System.ComponentModel.DataAnnotations;
using MIA.Authorization;

namespace MIA.Mvc.Core {
  public class PermissionTypeConverter : ITypeConverter<Permissions, PermissionDto> {
    public PermissionDto Convert(Permissions source, PermissionDto destination, ResolutionContext context) {
      var dto = new PermissionDto();
      dto.Id = (short)source;

      var moduleAttribute = source.GetAttribute<PermissionDescriptorAttribute>();
      if (moduleAttribute != null) {
        dto.Name = moduleAttribute.Name;
        dto.SystemModule = moduleAttribute.SystemModule;
        dto.Description = moduleAttribute.Description;
      } else {
        dto.Name = source.ToString();
        dto.SystemModule = SystemModules.Dashboard;
        dto.Description = "";
      }

      return dto;
    }
  }


}
