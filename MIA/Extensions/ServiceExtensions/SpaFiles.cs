namespace MIA.Extensions {
  using Microsoft.AspNetCore.Builder;
  using Microsoft.AspNetCore.Hosting;
  using Microsoft.Extensions.DependencyInjection;

  /// <summary>
  /// Extension methods to configure startup class
  /// </summary>
  public static partial class ServiceExtensions {
    /// <summary>
    /// Adds single page application files (react front-end application)
    /// </summary>
    /// <param name="services"></param>
    /// <param name="env"></param>
    public static IServiceCollection AddSpaFiles (this IServiceCollection services, IHostingEnvironment env) {

      // The React files will be served from this directory
      services.AddSpaStaticFiles (configuration => {
        configuration.RootPath = env.IsProduction () ? "wwwroot" : "ClientApp";
      });

      return services;
    }

    /// <summary>
    /// Helper function to add SPA static files 
    /// </summary>
    /// <param name="app">IApplicationBuilder instance </param>
    /// <returns></returns>
    public static IApplicationBuilder UseSpaFiles (this IApplicationBuilder app) {
      app.UseSpaStaticFiles ();
      return app;
    }
  }
}