#if (Versioning)

namespace MIA.Extensions
{
  using Microsoft.Extensions.DependencyInjection;
  /// <summary>
  /// Extension methods to configure startup class
  /// </summary>
  public static partial class ServiceExtensions
  {

    /// <summary>
    /// Adds versioning with default version if not specified to 1.0
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddCustomApiVersioning(this IServiceCollection services) {
      return services.AddApiVersioning(options => {
        options.AssumeDefaultVersionWhenUnspecified = true;
        options.ReportApiVersions = true;
        options.DefaultApiVersion = new Microsoft.AspNetCore.Mvc.ApiVersion(1, 0);
      });
    }

  }
}
#endif
