#if (ResponseCompression)
namespace MIA.Extensions
{
  using MIA.Infrastructure.Options;
  using Microsoft.AspNetCore.Builder;
  using Microsoft.AspNetCore.ResponseCompression;
  using Microsoft.Extensions.DependencyInjection;
  using System.IO.Compression;
  using System.Linq;

  /// <summary>
  /// Extension methods to configure startup class
  /// </summary>
  public static partial class ServiceExtensions
  {
    /// <summary>
    /// Adds dynamic response compression to enable GZIP compression of responses. This is turned off for HTTPS
    /// requests by default to avoid the BREACH security vulnerability.
    /// </summary>
    public static IServiceCollection AddCustomResponseCompression(this IServiceCollection services) {
      return services
        .Configure<BrotliCompressionProviderOptions>(options => options.Level = CompressionLevel.Optimal)
        .Configure<GzipCompressionProviderOptions>(options => options.Level = CompressionLevel.Optimal)
        .AddResponseCompression(options => {
          // Add additional MIME types (other than the built in defaults) to enable GZIP compression for.
          System.Collections.Generic.IEnumerable<string> customMimeTypes = services
          .BuildServiceProvider()
          .GetRequiredService<CompressionOptions>()
          .MimeTypes ?? Enumerable.Empty<string>();
          options.MimeTypes = customMimeTypes.Concat(ResponseCompressionDefaults.MimeTypes);

          options.Providers.Add<BrotliCompressionProvider>();
          options.Providers.Add<GzipCompressionProvider>();
        });
    }


  }
}
#endif