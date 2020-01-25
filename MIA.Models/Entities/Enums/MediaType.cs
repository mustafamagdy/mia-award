using System.Runtime.Serialization;

namespace MIA.Models.Entities.Enums {
  public enum MediaType {
    [EnumMember(Value = "Video")]
    Video,
    [EnumMember(Value = "Image")]
    Image
  }
}