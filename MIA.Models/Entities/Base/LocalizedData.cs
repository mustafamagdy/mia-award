using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace MIA.Models.Entities {
  public class LocalizedData : Dictionary<string, string> {
    public static readonly string Arabic = "ar";
    public static readonly string English = "en";

    public static LocalizedData FromArabic(string data) {
      return new LocalizedData { { Arabic, data } };
    }

    public static LocalizedData FromEnglish(string data) {
      return new LocalizedData { { English, data } };
    }

    public bool ArabicContains(string query) {
      return this[Arabic].Contains(query);
    }

    public bool EnglishContains(string query) {
      return this[English].Contains(query);
    }

    public static KeyValuePair<string, string> WithArabic(string value) {
      return new KeyValuePair<string, string>(Arabic, value);
    }
    public static KeyValuePair<string, string> WithEnglish(string value) {
      return new KeyValuePair<string, string>(English, value);
    }
  }

  public static class EntityConvensions {
    public static readonly JsonSerializerSettings Settings;

    static EntityConvensions() {
      Settings = new JsonSerializerSettings {
        NullValueHandling = NullValueHandling.Ignore
      };
    }
  }
}
