namespace MIA.Extensions {
  using Boxed.AspNetCore;
  using MIA.Infrastructure.Options;
  using Microsoft.AspNetCore.Builder;
#if (!ForwardedHeaders && HostFiltering)
    using Microsoft.AspNetCore.HostFiltering;
#endif

  using Microsoft.Extensions.Configuration;
  using Microsoft.Extensions.DependencyInjection;
  /// <summary>
  /// Extension methods to configure startup class
  /// </summary>
  public static partial class ServiceExtensions {

    /// <summary>
    /// Adds custom application options from appsettings.json
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    /// <returns></returns>
    public static IServiceCollection AddCustomOptions(this IServiceCollection services, IConfiguration configuration) {
      return services
// ConfigureSingleton registers IOptions<T> and also T as a singleton to the services collection.
.ConfigureAndValidateSingleton<ApplicationOptions>(configuration)
#if (ResponseCompression)
       .ConfigureAndValidateSingleton<CompressionOptions>(configuration.GetSection(nameof(ApplicationOptions.Compression)))
#endif
#if (ForwardedHeaders)
       .ConfigureAndValidateSingleton<ForwardedHeadersOptions>(configuration.GetSection(nameof(ApplicationOptions.ForwardedHeaders)))
#elif (HostFiltering)
       .ConfigureAndValidateSingleton<HostFilteringOptions>(configuration.GetSection(nameof(ApplicationOptions.HostFiltering)))
#endif
       .ConfigureAndValidateSingleton<CacheProfileOptions>(configuration.GetSection(nameof(ApplicationOptions.CacheProfiles)))
       .ConfigureAndValidateSingleton<JwtOptions>(configuration.GetSection(nameof(ApplicationOptions.Jwt)))
       .ConfigureAndValidateSingleton<GDSOptions>(configuration.GetSection(nameof(ApplicationOptions.GDSOptions)))
       .ConfigureAndValidateSingleton<PaymentGatewayOptions>(configuration.GetSection(nameof(ApplicationOptions.PaymentGatewayOptions)))
       .ConfigureAndValidateSingleton<NavitaireOptions>(configuration.GetSection(nameof(ApplicationOptions.NavitaireOptions)))
       .ConfigureAndValidateSingleton<UploadLimits>(configuration.GetSection(nameof(ApplicationOptions.UploadLimits)));


    }

  }
}