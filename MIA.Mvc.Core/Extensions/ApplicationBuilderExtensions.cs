namespace MIA.Extensions {
  using System;
  using System.Collections.Generic;
  using System.Globalization;
  using System.Linq;
#if (Versioning)
  using System.Reflection;
#endif
  using Boxed.AspNetCore;
  using MIA.Infrastructure.Options;
  using Microsoft.AspNetCore.Builder;
  using Microsoft.AspNetCore.Localization;
#if (Versioning)
  using Microsoft.AspNetCore.Mvc.ApiExplorer;
#endif
  using Microsoft.Extensions.DependencyInjection;
  using MIA.Constants;
    using MIA.Middlewares;
    using MIA.Providers;

    /// <summary>
    /// 
    /// </summary>
    public static partial class ApplicationBuilderExtensions {
    /// <summary>
    /// Adds developer friendly error pages for the application which contain extra debug and exception information.
    /// Note: It is unsafe to use this in production.
    /// </summary>
    public static IApplicationBuilder UseDeveloperErrorPages(this IApplicationBuilder application) {
      return application
        // When a database error occurs, displays a detailed error page with full diagnostic information. It is
        // unsafe to use this in production. Uncomment this if using a database.
        .UseDatabaseErrorPage()
        // When an error occurs, displays a detailed error page with full diagnostic information.
        // See http://docs.asp.net/en/latest/fundamentals/diagnostics.html
        .UseDeveloperExceptionPage();
    }

    /// <summary>
    /// Use exceotion middleware
    /// </summary>
    /// <param name="application"></param>
    /// <returns></returns>
    public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder application) {
      return application.UseMiddleware<ApiExceptionHandlerMiddleware>();
       //.UseExceptionHandler(a => {
       //  a.UseMiddleware<ApiExceptionHandlerMiddleware>();
       //});
    }
    /// <summary>
    /// Uses the static files middleware to serve static files. Also adds the Cache-Control and Pragma HTTP
    /// headers. The cache duration is controlled from configuration.
    /// See http://andrewlock.net/adding-cache-control-headers-to-static-files-in-asp-net-core/.
    /// </summary>
    public static IApplicationBuilder UseStaticFilesWithCacheControl(this IApplicationBuilder application) {
      Microsoft.AspNetCore.Mvc.CacheProfile cacheProfile = application
          .ApplicationServices
          .GetRequiredService<CacheProfileOptions>()
          .Where(x => string.Equals(x.Key, CacheProfileName.StaticFiles, StringComparison.Ordinal))
          .Select(x => x.Value)
          .SingleOrDefault();
      return application
          .UseStaticFiles(
              new StaticFileOptions() {
                OnPrepareResponse = context => {
                  context.Context.ApplyCacheProfile(cacheProfile);
                },
              });
    }

#if (Swagger)

    /// <summary>
    /// 
    /// </summary>
    /// <param name="application"></param>
    /// <returns></returns>
    public static IApplicationBuilder UseCustomSwaggerUI(this IApplicationBuilder application, Type startupClass) {
      return application.UseSwaggerUI(options => {
        // Set the Swagger UI browser document title.
        options.DocumentTitle = startupClass
            .Assembly
            .GetCustomAttribute<AssemblyProductAttribute>()
            .Product;
        // Set the Swagger UI to render at '/'.        
        options.RoutePrefix = "swagger";
        // Show the request duration in Swagger UI.
        options.DisplayRequestDuration();

#if (Versioning)
        IApiVersionDescriptionProvider provider = application.ApplicationServices.GetService<IApiVersionDescriptionProvider>();
        foreach (ApiVersionDescription apiVersionDescription in provider.ApiVersionDescriptions.OrderByDescending(x => x.ApiVersion)) {
          options.SwaggerEndpoint(
          $"/swagger/{apiVersionDescription.GroupName}/swagger.json",
          $"Version {apiVersionDescription.ApiVersion}");
        }
#else
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Version 1");
#endif
      });
    }
#endif

    /// <summary>
    /// Add supported locales, and middleware to determine the approperiate locale according to route url
    /// </summary>
    /// <param name="application"></param>
    /// <returns></returns>
    public static IApplicationBuilder UseRouteUrlCultureProvider(this IApplicationBuilder application) {
      var localizationOptions = new RequestLocalizationOptions {
        SupportedCultures = new List<CultureInfo>    {
        new CultureInfo("de-DE"),
        new CultureInfo("en-US"),
        new CultureInfo("en-GB")
        },
        SupportedUICultures = new List<CultureInfo>    {
        new CultureInfo("de-DE"),
        new CultureInfo("en-US"),
        new CultureInfo("en-GB")
        },
        DefaultRequestCulture = new RequestCulture("en-US")
      };

      // Adding our UrlRequestCultureProvider as first object in the list
      localizationOptions.RequestCultureProviders.Insert(0, new UrlRequestCultureProvider {
        Options = localizationOptions
      });

      return application.UseRequestLocalization(localizationOptions);
    }
  }
}
