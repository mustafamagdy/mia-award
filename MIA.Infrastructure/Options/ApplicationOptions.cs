namespace MIA.Infrastructure.Options {
  using System.ComponentModel.DataAnnotations;
#if (ForwardedHeaders)
  using Microsoft.AspNetCore.Builder;
#elif (HostFiltering)
    using Microsoft.AspNetCore.HostFiltering;
#endif
  using Microsoft.AspNetCore.Server.Kestrel.Core;

  /// <summary>
  /// All options for the application.
  /// </summary>
  public class ApplicationOptions {
    [Required]
    public CacheProfileOptions CacheProfiles { get; set; }

#if (ResponseCompression)
    [Required]
    public CompressionOptions Compression { get; set; }

#endif
#if (ForwardedHeaders)
    [Required]
    public ForwardedHeadersOptions ForwardedHeaders { get; set; }

#elif (HostFiltering)
    [Required]
    public HostFilteringOptions HostFiltering { get; set; }
#endif

    [Required]
    public KestrelServerOptions Kestrel { get; set; }

    [Required]
    public JwtOptions Jwt { get; set; }

    [Required]
    public GDSOptions GDSOptions { get; set; }
    [Required]
    public PaymentGatewayOptions PaymentGatewayOptions { get; set; }
    [Required]
    public NavitaireOptions NavitaireOptions { get; set; }
     [Required]
    public UploadLimits UploadLimits { get; set; }
    
  }
}
