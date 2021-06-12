namespace MIA.Extensions {
  using Microsoft.Extensions.Caching.Distributed;
  using Microsoft.Extensions.Caching.Memory;
  using Microsoft.Extensions.Configuration;
  using Microsoft.Extensions.DependencyInjection;
  using Serilog;

  public static partial class ServiceExtensions {

    public static IServiceCollection AddSeriLogging(this IServiceCollection services) {
      return
        services.AddLogging(loggingBuilder =>
                            loggingBuilder.AddSerilog(dispose: true));
    }
  }
}