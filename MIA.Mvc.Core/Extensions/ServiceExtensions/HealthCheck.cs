#if (HealthCheck)
namespace MIA.Extensions
{
  using Microsoft.Extensions.DependencyInjection;
  /// <summary>
  /// Extension methods to configure startup class
  /// </summary>
  public static partial class ServiceExtensions
  {
    /// <summary>
    /// Adds health check endpoint for different services (asp.net, sql, ...)
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddCustomHealthChecks(this IServiceCollection services) {
      return services
          .AddHealthChecks()
          // Add health checks for external dependencies here. See https://github.com/Xabaril/AspNetCore.Diagnostics.HealthChecks
          .Services;
    }
  }
}
#endif