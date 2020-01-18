namespace MIA.Extensions {
  using MIA.Mvc.Core;
  using Microsoft.Extensions.DependencyInjection;

  public static partial class ServiceExtensions {
    public static IServiceCollection AddAws(this IServiceCollection services) {
      return services.AddTransient<IS3FileManager, S3FileManager>();
    }

  }
}