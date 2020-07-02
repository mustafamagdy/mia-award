using System.Globalization;
using Microsoft.Extensions.Localization;

namespace System
{
  public static class ResourceExtension
  {
    public static string Get(this IStringLocalizer localizer, string culture, string key)
    {
      return localizer.WithCulture(new CultureInfo(name: culture))[key];
    }
  }
}