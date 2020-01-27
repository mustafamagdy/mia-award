using System.Runtime.Serialization;

namespace MIA.Models.Entities.Enums {
  public enum NewsCategory {
    [EnumMember(Value = "Sports")]
    Sports,
    [EnumMember(Value = "Drama")]
    Drama,
    [EnumMember(Value = "Political")]
    Political,
    [EnumMember(Value = "Documental")]
    Documental
  }
}