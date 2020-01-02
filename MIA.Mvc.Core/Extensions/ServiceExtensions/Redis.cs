using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIA.Extensions {
  /// <summary>
  /// 
  /// </summary>
  public static partial class ServiceExtensions {
    /// <summary>
    /// Add redis cache support, will be used for jwt tokens, and 2nd level cache for EF
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    /// <returns></returns>
    public static IServiceCollection AddRedis(this IServiceCollection services, IConfiguration configuration) {
      return services.AddDistributedRedisCache(r => { r.Configuration = configuration["redis:connectionString"]; });
    }
  }
}
