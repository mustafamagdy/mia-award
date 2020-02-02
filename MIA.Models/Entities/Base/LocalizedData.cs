using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

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
