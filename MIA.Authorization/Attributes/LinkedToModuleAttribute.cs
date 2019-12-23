using System;
using MIA.Authorization.Entities;

namespace MIA.Authorization.Attributes {

  /// <summary>
  /// Used to link permission to a module for better organizing in UI
  /// </summary>
  [AttributeUsage(AttributeTargets.Field)]
  public class LinkedToModuleAttribute : Attribute {
    public SystemModules SystemModule { get; private set; }

    public LinkedToModuleAttribute(SystemModules systemModule) {
      SystemModule = systemModule;
    }
  }
}