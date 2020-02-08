using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using Newtonsoft.Json.Linq;

namespace MIA.Models.Entities {
  public class LocalizedDataDto : Dictionary<string, string> { }

  public class LocalizedData : Dictionary<string, string>, IEquatable<LocalizedData> {
    public static readonly string Arabic = "ar";
    public static readonly string English = "en";

    public static LocalizedData FromArabic(string data) {
      return new LocalizedData { { Arabic, data } };
    }

    public static LocalizedData FromEnglish(string data) {
      return new LocalizedData { { English, data } };
    }

    public static LocalizedData FromBoth(string arabic, string english) {
      return new LocalizedData { { Arabic, arabic }, { English, english } };
    }

    public bool ArabicContains(string query) {
      return this[Arabic].Contains(query);
    }

    public bool EnglishContains(string query) {
      return this[English].Contains(query);
    }

    public string InEnglish() {
      return this[English];
    }
    public string InArabic() {
      return this[Arabic];
    }

    public bool Equals(LocalizedData other) {
      return
        (!this.InArabic().IsNullOrEmpty() && !other.InArabic().IsNullOrEmpty() && this.InArabic() == other.InArabic()) ||
        (!this.InEnglish().IsNullOrEmpty() && !other.InEnglish().IsNullOrEmpty() && this.InEnglish() == other.InEnglish());
    }

    public static LocalizedData FromDictionary(Dictionary<string, string> source) {
      var result = new LocalizedData();
      if (source != null) {
        if (source.ContainsKey(Arabic)) {
          result[Arabic] = source[Arabic];
        }
        if (source.ContainsKey(English)) {
          result[English] = source[English];
        }
      }

      return result;
    }


    public static LocalizedData FromDictionary(JObject source) {
      return FromDictionary(
        ((IDictionary<string, JToken>)source).ToDictionary(pair => pair.Key, pair => (string)pair.Value));
    }
  }

  //public class LocalizedDataTypeConverter : ITypeConverter<Dictionary<string, string>, LocalizedData> {
  //  public LocalizedData Convert(Dictionary<string, string> source, LocalizedData destination, ResolutionContext context) {
  //    return LocalizedData.FromDictionary(source);
  //  }
  //}

  public static class EntityConvensions {
    public static readonly JsonSerializerSettings Settings;

    static EntityConvensions() {
      Settings = new JsonSerializerSettings {
        NullValueHandling = NullValueHandling.Ignore
      };
    }
  }
}
