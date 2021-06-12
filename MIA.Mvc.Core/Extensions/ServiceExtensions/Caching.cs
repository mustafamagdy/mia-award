namespace MIA.Extensions {
  using Microsoft.Extensions.Caching.Distributed;
  using Microsoft.Extensions.Caching.Memory;
  using Microsoft.Extensions.Configuration;
  using Microsoft.Extensions.DependencyInjection;
  /// <summary>
  /// Extension methods to configure startup class
  /// </summary>
  public static partial class ServiceExtensions {
    /// <summary>
    /// Configures caching for the application. Registers the <see cref="IDistributedCache"/> and
    /// <see cref="IMemoryCache"/> types with the services collection or IoC container. The
    /// <see cref="IDistributedCache"/> is intended to be used in cloud hosted scenarios where there is a shared
    /// cache, which is shared between multiple instances of the application. Use the <see cref="IMemoryCache"/>
    /// otherwise.
    /// </summary>
    public static IServiceCollection AddCustomCaching(this IServiceCollection services, IConfiguration configuration) {
      return services
      // Adds IMemoryCache which is a simple in-memory cache.
      .AddMemoryCache()
      // Adds IDistributedCache which is a distributed cache shared between multiple servers. This adds a
      // default implementation of IDistributedCache which is not distributed. See below:
      .AddDistributedMemoryCache()

       // Uncomment the following line to use the Redis implementation of IDistributedCache. This will
       // override any previously registered IDistributedCache service.
       // Redis is a very fast cache provider and the recommended distributed cache provider.
       .AddDistributedRedisCache(options => {
         options.Configuration = configuration.GetConnectionString("redis:connectionString");
         options.InstanceName = "master";
       });

      // Uncomment the following line to use the Microsoft SQL Server implementation of IDistributedCache.
      // Note that this would require setting up the session state database.
      // Redis is the preferred cache implementation but you can use SQL Server if you don't have an alternative.
      // .AddSqlServerCache(
      //     x =>
      //     {
      //         x.ConnectionString = "Server=.;Database=ASPNET5SessionState;Trusted_Connection=True;";
      //         x.SchemaName = "dbo";
      //         x.TableName = "Sessions";
      //     });
    }
  }
}