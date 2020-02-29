using AutoMapper;
using Boxed.AspNetCore;
using MIA.Authorization.Entities;
using MIA.Models.Entities;
using MIA.ORMContext;
using MIA.ORMContext.Seed;
using MIA.ORMContext.Uow;
using MIA.Payments;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Text.Encodings.Web;
using System.Text.Unicode;
using MIA.Api.Base;
using MIA.Constants;
using MIA.Extensions;
using MIA.Middlewares;
using MIA.Middlewares.Auth;
using Microsoft.AspNetCore.HttpOverrides;
using MIA.Infrastructure;

namespace MIA
{
  /// <summary>
  /// Startup class for asp.net core Api
  /// </summary>
  public class Startup
  {
    private readonly IConfiguration configuration;
    private readonly IHostingEnvironment env;

    /// <summary>
    /// Constructor for startup class, to inject required dependencies
    /// </summary>
    /// <param name="configuration">Used to read configuration from appsettings.json</param>
    /// <param name="hostingEnvironment">Used to configure hosting environment</param>
    public Startup(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
    {
      this.configuration = configuration;
      this.env = hostingEnvironment;
    }

    /// <summary>
    /// Register different services in asp.net core dependency container
    /// </summary>
    /// <param name="services">service collection to add to</param>
    /// <returns></returns>
    public IServiceProvider ConfigureServices(IServiceCollection services)
    {
      IServiceProvider provider = services
        .AddSeriLogging()
#if (ApplicationInsights)
        // Add Azure Application Insights data collection services to the services container.
        .AddApplicationInsightsTelemetry(this.configuration)
#endif
#if (CorrelationId)
        .AddCorrelationIdFluent ()
#endif
        .AddCustomCaching(this.configuration)
        .AddCustomOptions(this.configuration)
        .AddCustomRouting()
        .AddTemplateParser()
#if (ResponseCaching)
        .AddResponseCaching()
#endif
#if (ResponseCompression)
        .AddCustomResponseCompression()
#endif
#if (HttpsEverywhere)
        .AddCustomStrictTransportSecurity()
#endif
#if (HealthCheck)
        .AddCustomHealthChecks()
#endif
#if (Swagger)
        .AddCustomSwagger(this.GetType())
#endif
        .AddHttpContextAccessor()
        // Add useful interface for accessing the ActionContext outside a controller.
        .AddSingleton<IActionContextAccessor, ActionContextAccessor>()
        //access current username, and userid for audit purpose
        .AddSingleton<IUserResolver, UserResolver>()
        //.AddSingleton<IBookingManager, BookingManagerClient>()
        //.AddSingleton<ISessionManager, SessionManagerClient>()
        .AddScoped(x => x
         .GetRequiredService<IUrlHelperFactory>()
         .GetUrlHelper(x.GetRequiredService<IActionContextAccessor>().ActionContext))
        //url helper to get current api url
        .AddScoped<IApiUrlHelper, ApiUrlHelper>()
        .AddSingleton<HtmlEncoder>(
          HtmlEncoder.Create(allowedRanges: new[] {
            UnicodeRanges.BasicLatin,
            UnicodeRanges.Arabic
          }))
#if (Versioning)
        .AddCustomApiVersioning()
#endif
#if (Swagger && Versioning)
        .AddVersionedApiExplorer(x => x.GroupNameFormat = "'v'VVV") // Version format: 'v'major[.minor][-status]
#endif
        //.AddSingleton<IBookingManager, BookingManagerClient>()
        //.AddSingleton<ISessionManager, SessionManagerClient>()
        .AddMvcWithOptions()
        .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
        .AddApiExplorer()
        .AddAuthorization()
        .AddDataAnnotations()
        .AddJsonFormatters()
        .AddCustomJsonOptions(this.env)

#if (CORS)
        .AddCustomCors()
#endif
#if (DataContractSerializer)
        // Adds the XML input and output formatter using the DataContractSerializer.
        .AddXmlDataContractSerializerFormatters ()
#elif (XmlSerializer)
        // Adds the XML input and output formatter using the XmlSerializer.
        .AddXmlSerializerFormatters ()
#endif
        .AddCustomMvcOptions(this.env)

        .Services
        // Add payment gateway with configuration
        .AddPaymentGatewayWithConfiguration(configuration)
        //
#if (EmailSendGrid)
        .AddSendGrid (this.configuration)
#elif (GmailSender)
        .AddGmail(this.configuration)
#elif (SMTPSender)
        .AddSMTPEmailSender(this.configuration)
#endif
        .AddSpaFiles(this.env)
        .AddAppDbContext(this.configuration)
        .AddSingleton<IHttpContextAccessor, HttpContextAccessor>()
        .AddIdentityWithJwt(this.env)
        .AddPermissions()
        .AddRedis(this.configuration)
        .AddProjectMappers()
        .AddProjectRepositories()
        .AddAws()
        .AddProjectApplicationServices()
        .BuildServiceProvider();

      //static DI 
      BaseDtoExtensions.Configure(provider.GetService<IMapper>());

      return provider;
    }

    /// <summary>
    /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    /// </summary>
    /// <param name="app"></param>
    /// <param name="userManager"></param>
    /// <param name="roleManager"></param>
    /// <param name="db"></param>
    public void Configure(IApplicationBuilder app,
      UserManager<AppUser> userManager,
      RoleManager<AppRole> roleManager,
      IS3FileManager fileManager,
      IAppUnitOfWork db,
      HtmlEncoder encoder)
    {
      app
        //Run pending db migrations
        .UpdateDatabase()

        //#if (ForwardedHeaders)
        .UseIf(!this.env.IsDevelopment(),
          x => x.UseForwardedHeaders(new ForwardedHeadersOptions
          {
            ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
          }))
        //#elif (HostFiltering)
#if (HostFiltering)
        .UseHostFiltering ()
#endif

        .UseAuthentication()

#if (ResponseCaching)
        .UseResponseCaching()
#endif
#if (ResponseCompression)
        .UseResponseCompression()
#endif
#if (CORS)
        .UseCors(CorsPolicyName.AllowAll)
#endif
//#if (HttpsEverywhere)
//                .UseIf(!this.env.IsDevelopment(), x => x.UseHsts())
//                .UseIf(!this.env.IsDevelopment(), x => x.UseHttpsRedirection())
//#endif
        .UseIf(this.env.IsDevelopment(), x => x.UseDeveloperErrorPages())
        .UseCustomExceptionHandler()
        .UseMiddleware<ImageProxyMiddleware>()
#if (HealthCheck)
        .UseHealthChecks("/status")
        .UseHealthChecks("/status/self", new HealthCheckOptions() { Predicate = _ => false })
#endif
#if (Swagger)
        .UseSwagger()
        .UseCustomSwaggerUI(this.GetType())
#endif

        .UseMiddleware<AuthTokenManagerMiddleware>()
        .UseMvc(routes =>
        {
          routes.MapRoute(
              name: "default",
              template: "api/{culture::regex(^[a-z]{{2}}-[A-Za-z]{{4}}$)}/{controller}/{id?}");
          routes.MapRoute(
              name: "default",
              template: "api/{controller}/{id?}");
        })
        //route url culture provider
        .UseRouteUrlCultureProvider()

        .UseStaticFilesWithCacheControl()
        .UseSpaFiles()
        .UseSpa(spa =>
        {
          spa.Options.SourcePath = env.IsProduction() ? "wwwroot" : "ClientApp";


          if (env.IsDevelopment())
          {
            spa.UseReactDevelopmentServer(npmScript: "start");
          }
        });

      //seed default data
      DbInitializer.SeedDbAsync(userManager, roleManager, fileManager, db, encoder).Wait();
    }

  }
}