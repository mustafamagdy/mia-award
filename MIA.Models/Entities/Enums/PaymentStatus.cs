using System.Runtime.Serialization;

namespace MIA.Models.Entities
{
  public enum PaymentStatus
  {
    [EnumMember(Value = "Waiting")]
    Waiting = 0,
    [EnumMember(Value = "Confirmed")]
    Confirmed = 1,
    [EnumMember(Value = "Rejected")]
    Rejected = 2
  }

}