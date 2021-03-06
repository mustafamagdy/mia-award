using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using MIA.Administration.MappingProfiles;
using MIA.Administration.Services;
using MIA.MappingProfiles;

namespace MIA.Administration.Extensions {
  /// <summary>
  /// Business extension methods for startup class configuration
  /// </summary>
  public static class BusinessExtensions {

    /// <summary>
    /// Adds mapper profile
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddProjectMappers(this IServiceCollection services) {
      services.AddAutoMapper(
        typeof(CommonProfile),
        typeof(ApiProfile) /*, .... add more assemblies here*/
        );
      return services;
    }

    /// <summary>
    /// Adds data access repositories
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddProjectRepositories(this IServiceCollection services) => services;

    /// <summary>
    /// Adds application services
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddProjectApplicationServices(this IServiceCollection services) =>
      services.AddScoped<IVotingCalculator, VotingCalculator>();


  }
}