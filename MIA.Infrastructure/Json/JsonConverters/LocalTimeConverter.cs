using System;
using Newtonsoft.Json;

namespace MIA.Infrastructure.Json {
  public class LocalTimeConverter : JsonConverter<long> {
    public override bool CanRead => false;

    public override long ReadJson(JsonReader reader, Type objectType, long existingValue, bool hasExistingValue, JsonSerializer serializer) {
      throw new NotImplementedException();
    }

    public override void WriteJson(JsonWriter writer, long value, JsonSerializer serializer) {
      var date = value.LocalDateTime();
      writer.WriteValue(date.ToString("yyyy-MM-dd"));
    }

  }
}