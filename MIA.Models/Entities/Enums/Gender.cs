using System.Runtime.Serialization;

namespace MIA.Models.Entities.Enums {
  public enum Gender {
    [EnumMember(Value = "Male")]
    Male,
    [EnumMember(Value = "Female")]
    Female
  }
}