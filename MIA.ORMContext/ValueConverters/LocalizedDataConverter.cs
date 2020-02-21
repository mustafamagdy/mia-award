using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using MIA.Models.Entities;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;

namespace MIA.ORMContext.ValueConverters {
  /// <summary>
  /// custom value converter to convert localized data to json string that should be stored in the store
  /// and reconvert json string to LocalizedData model when getting from store
  /// </summary>
  public class LocalizedDataConverter : ValueConverter<LocalizedData, string> {
    public LocalizedDataConverter() : base(ToStoreExpr, FromStoreExpr) {

    }

    static Expression<Func<LocalizedData, string>> ToStoreExpr = x => JsonConvert.SerializeObject(x, EntityConventions.Settings);

    static Expression<Func<string, LocalizedData>> FromStoreExpr = x => ConvertToLocalizedData(x);


    private static LocalizedData ConvertToLocalizedData(string data) {
      try {
        // try to deserialize to LocalizedData
        return JsonConvert.DeserializeObject<LocalizedData>(data, EntityConventions.Settings);
      } catch (Exception) {
        return new LocalizedData();
      }
    }


  }
}
