using System.Runtime.Serialization;

namespace MIA.Models.Entities {
  public enum JudgeLevel {
    [EnumMember(Value = "Level1")]
    Level1,
    [EnumMember(Value = "Level2")]
    Level2
  }
}