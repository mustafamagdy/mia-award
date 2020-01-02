using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.DependencyInjection;
using MIA.Filters;

namespace MIA.Extensions {
  /// <summary>
  /// Extension methods to configure startup class
  /// </summary>
  public static partial class ServiceExtensions {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IMvcCoreBuilder AddMvcWithOptions(this IServiceCollection services) {
      return services
        .AddMvcCore(options => {
          options.Filters.Add<UnitOfWorkTransactionFilter>();
        })
        .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
        .AddDataAnnotationsLocalization();
    }
  }
}