using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Encodings.Web;
using AutoMapper;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace MIA.Models.Entities {

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

    public static LocalizedData Same(string value)
    {
      return new LocalizedData { { Arabic, value }, { English, value } };
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
    public static LocalizedData HtmlFromDictionary(JObject source, HtmlEncoder encoder) {
      return FromDictionary(
        ((IDictionary<string, JToken>)source).ToDictionary(pair => pair.Key, pair => encoder.Encode((string)pair.Value)));
    }
  }

  //public class LocalizedDataTypeConverter : ITypeConverter<Dictionary<string, string>, LocalizedData> {
  //  public LocalizedData Convert(Dictionary<string, string> source, LocalizedData destination, ResolutionContext context) {
  //    return LocalizedData.FromDictionary(source);
  //  }
  //}

  public static class EntityConventions {
    public static readonly JsonSerializerSettings Settings;

    static EntityConventions() {
      Settings = new JsonSerializerSettings {
        NullValueHandling = NullValueHandling.Ignore
      };
    }
  }

}
