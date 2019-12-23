namespace MIA.Extensions {
  using Microsoft.Extensions.DependencyInjection;

  /// <summary>
  /// Extension methods to configure startup class
  /// </summary>
  public static partial class ServiceExtensions {

    /// <summary>
    /// Adds localization resource files and strategies
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddLocalization(this IServiceCollection services) {
      return services.AddLocalization(options => options.ResourcesPath = "Resources");
    }

  }
}