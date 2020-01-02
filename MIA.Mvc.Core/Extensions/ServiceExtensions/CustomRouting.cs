namespace MIA.Extensions
{
  using Microsoft.Extensions.DependencyInjection;
  /// <summary>
  /// Extension methods to configure startup class
  /// </summary>
  public static partial class ServiceExtensions
  {
    /// <summary>
    /// Add custom routing settings which determines how URL's are generated.
    /// </summary>
    public static IServiceCollection AddCustomRouting(this IServiceCollection services) {
      return services.AddRouting(options => {
        // All generated URL's should be lower-case.
        options.LowercaseUrls = true;
      });
    }
  }
}