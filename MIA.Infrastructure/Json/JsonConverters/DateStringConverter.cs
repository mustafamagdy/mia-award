using System;
using Newtonsoft.Json;

namespace MIA.Infrastructure.Json {
  public class DateStringConverter : JsonConverter<DateTime> {
    public override bool CanRead => false;

    public override DateTime ReadJson(JsonReader reader, Type objectType, DateTime existingValue, bool hasExistingValue, JsonSerializer serializer) {
      throw new NotImplementedException();
    }

    public override void WriteJson(JsonWriter writer, DateTime value, JsonSerializer serializer) {
      writer.WriteValue(value.ToString("yyyy-MM-dd"));
    }

  }
}