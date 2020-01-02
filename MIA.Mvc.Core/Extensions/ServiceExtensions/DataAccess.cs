namespace MIA.Extensions
{
  using MIA.ORMContext;
  using MIA.ORMContext.Uow;
  using Microsoft.AspNetCore.Builder;
  using Microsoft.EntityFrameworkCore;
  using Microsoft.Extensions.Configuration;
  using Microsoft.Extensions.DependencyInjection;

  /// <summary>
  /// Extension methods to configure startup class
  /// </summary>
  public static partial class ServiceExtensions
  {

    /// <summary>
    /// Adds unit of work service to DI
    /// </summary>
    /// <typeparam name="T">DbContext type</typeparam>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddUnitOfWork<T>(this IServiceCollection services) where T : DbContext {
      return services
          .AddScoped<IAppUnitOfWork, AppUnitOfWork>()
          .AddScoped<IUnitOfWork>(provider => provider.GetService<IAppUnitOfWork>());
    }

    /// <summary>
    /// Adds DbContext with default configuration, this also configured for dev/test/production environments
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    /// <returns></returns>
    public static IServiceCollection AddAppDbContext(this IServiceCollection services, IConfiguration configuration) {
      return services.AddDbContext<AppDbContext>(options => {
        options.UseSqlServer(configuration.GetConnectionString("DbConnection"));
      }).AddUnitOfWork<AppDbContext>();
    }


    /// <summary>
    /// Update the database by running pending migrations
    /// </summary>
    /// <param name="app"></param>
    /// <returns></returns>
    public static IApplicationBuilder UpdateDatabase(this IApplicationBuilder app) {
      using (IServiceScope serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope()) {
        using (AppDbContext context = serviceScope.ServiceProvider.GetService<AppDbContext>()) {
          context.Database.Migrate();
        }

        return app;
      }
    }
  }
}