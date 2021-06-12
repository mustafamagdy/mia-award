using System;
using MIA.Authorization.Entities;

namespace MIA.Authorization.Attributes {

  /// <summary>
  /// Used to link permission to a module for better organizing in UI
  /// </summary>
  [AttributeUsage(AttributeTargets.Field)]
  public class PermissionDescriptorAttribute : Attribute {
    public SystemModules SystemModule { get; private set; }
    public string Name { get; private set; }
    public string Description { get; private set; }

    public PermissionDescriptorAttribute(SystemModules systemModule, string name, string description) {
      SystemModule = systemModule;
      Name = name;
      Description = description;
    }
  }
}