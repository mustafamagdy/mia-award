using System.Runtime.Serialization;

namespace MIA.Models.Entities {
  public enum PurchaseStatus {
    [EnumMember(Value = "Waiting")]
    Waiting = 0,
    [EnumMember(Value = "Confirmed")]
    Confirmed = 1,
    [EnumMember(Value = "Cancelled")]
    Cancelled = 2
  }

}