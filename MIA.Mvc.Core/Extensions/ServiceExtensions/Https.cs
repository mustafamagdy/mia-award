#if (HttpsEverywhere)
namespace MIA.Extensions
{
  using Microsoft.AspNetCore.Builder;
  using Microsoft.Extensions.DependencyInjection;
  using System;

  /// <summary>
  /// Extension methods to configure startup class
  /// </summary>
  public static partial class ServiceExtensions
  {

    /// <summary>
    /// Adds the Strict-Transport-Security HTTP header to responses. This HTTP header is only relevant if you are
    /// using TLS. It ensures that content is loaded over HTTPS and refuses to connect in case of certificate
    /// errors and warnings.
    /// See https://developer.mozilla.org/en-US/docs/Web/Security/HTTP_strict_transport_security and
    /// http://www.troyhunt.com/2015/06/understanding-http-strict-transport.html
    /// Note: Including subdomains and a minimum maxage of 18 weeks is required for preloading.
    /// Note: You can refer to the following article to clear the HSTS cache in your browser:
    /// http://classically.me/blogs/how-clear-hsts-settings-major-browsers
    /// </summary>
    public static IServiceCollection AddCustomStrictTransportSecurity(this IServiceCollection services) {
      return services;

//      return services
//          .AddHsts(options => {
//                  // Preload the HSTS HTTP header for better security. See https://hstspreload.org/
//#if (HstsPreload)
//                  options.IncludeSubDomains = true;
//                  options.MaxAge = TimeSpan.FromSeconds(31536000); // 1 Year
//                  options.Preload = true;
//#else
//                    // options.IncludeSubDomains = true;
//                    // options.MaxAge = TimeSpan.FromSeconds(31536000); // 1 Year
//                    // options.Preload = true;
//#endif
//                });
    }


  }
}
#endif