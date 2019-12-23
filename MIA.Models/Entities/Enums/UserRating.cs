using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace MIA.Models.Entities.Enums
{
    public enum UserRating
    {
      [EnumMember(Value = "Good")]
      Good,
      [EnumMember(Value = "Very Good")]
      VeryGood
    }
}
