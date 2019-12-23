using Administration.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.DependencyInjection;

namespace Administration.Extensions {
  /// <summary>
  /// Extension methods to configure startup class
  /// </summary>
  public static partial class ServiceExtensions {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static void AddMvcWithOptions(this IServiceCollection services) {
      services

        .AddMvc(options => {
          options.Filters.Add<UnitOfWorkTransactionFilter>();
        })
       .AddDataAnnotationsLocalization()
       .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
       .AddCookieTempDataProvider();

      //.AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
      //.AddDataAnnotationsLocalization();
    }
  }
}