using Boxed.AspNetCore;
using MIA.Infrastructure.Options;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Serilog.Core;
using Serilog.Exceptions;
using Serilog.Exceptions.Core;
using Serilog.Exceptions.EntityFrameworkCore.Destructurers;
using Serilog.Sinks.File;
using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;

namespace MIA {
  /// <summary>
  /// 
  /// </summary>
  public sealed class Program {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="args"></param>
    /// <returns></returns>
    public static int Main(string[] args) {
      return LogAndRun(CreateWebHostBuilder(args).Build());
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="webHost"></param>
    /// <returns></returns>
    public static int LogAndRun(IWebHost webHost) {
      Log.Logger = BuildLogger(webHost);

      try {
        Log.Warning("Starting application");
        webHost.Run();
        Log.Warning("Stopped application");
        return 0;
      } catch (Exception exception) {
        Log.Fatal(exception, "Application terminated unexpectedly");
        return 1;
      } finally {
        Log.CloseAndFlush();
      }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="args"></param>
    /// <returns></returns>
    public static IWebHostBuilder CreateWebHostBuilder(string[] args) {
      return
        new WebHostBuilder()
        .UseIf(
            x => string.IsNullOrEmpty(x.GetSetting(WebHostDefaults.ContentRootKey)),
            x => x.UseContentRoot(Directory.GetCurrentDirectory()))
        .UseIf(
            args != null,
            x => x.UseConfiguration(new ConfigurationBuilder().AddCommandLine(args).Build()))
        .ConfigureAppConfiguration((hostingContext, config) =>
            AddConfiguration(config, hostingContext.HostingEnvironment, args))
        .UseSerilog()
        .CaptureStartupErrors(true)
        .UseDefaultServiceProvider((context, options) =>
            options.ValidateScopes = context.HostingEnvironment.IsDevelopment())
        .UseKestrel((builderContext, options) => {
          // Do not add the Server HTTP header.
          options.AddServerHeader = false;

          // Configure Kestrel from appsettings.json.
          options.Configure(builderContext.Configuration.GetSection(nameof(ApplicationOptions.Kestrel)));
          ConfigureKestrelServerLimits(builderContext, options);
        })
#if (Azure)
        .UseAzureAppServices()
#endif
        // Used for IIS and IIS Express for in-process hosting. Use UseIISIntegration for out-of-process hosting.      
        .UseIIS()
        .UseStartup<Startup>();
    }

    private static IConfigurationBuilder AddConfiguration(
      IConfigurationBuilder configurationBuilder,
      IHostingEnvironment hostingEnvironment,
      string[] args) {
      return configurationBuilder
        // Add configuration from the appsettings.json file.
        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
        // Add configuration from an optional appsettings.development.json, appsettings.staging.json or
        // appsettings.production.json file, depending on the environment. These settings override the ones in
        // the appsettings.json file.
        .AddJsonFile($"appsettings.{hostingEnvironment.EnvironmentName}.json", optional: true, reloadOnChange: true)
        // This reads the configuration keys from the secret store. This allows you to store connection strings
        // and other sensitive settings, so you don't have to check them into your source control provider.
        // Only use this in Development, it is not intended for Production use. See
        // http://docs.asp.net/en/latest/security/app-secrets.html
        .AddIf(hostingEnvironment.IsDevelopment(), x => x.AddUserSecrets(Assembly.GetExecutingAssembly(), optional: true))
        // Add configuration specific to the Development, Staging or Production environments. This config can
        // be stored on the machine being deployed to or if you are using Azure, in the cloud. These settings
        // override the ones in all of the above config files. See
        // http://docs.asp.net/en/latest/security/app-secrets.html
        .AddEnvironmentVariables()
#if (ApplicationInsights)
        // Push telemetry data through the Azure Application Insights pipeline faster in the development and
        // staging environments, allowing you to view results immediately.
        .AddApplicationInsightsSettings(developerMode: !hostingEnvironment.IsProduction())
#endif
        // Add command line options. These take the highest priority.
        .AddIf(args != null, x => x.AddCommandLine(args));
    }

    private static Logger BuildLogger(IWebHost webHost) {
      IHostingEnvironment env = webHost.Services.GetRequiredService<IHostingEnvironment>();
      var config = webHost.Services.GetRequiredService<IConfiguration>();

      string logsPath = env.WebRootPath; 
      var logConfig = new LoggerConfiguration();
      return logConfig
          .ReadFrom.Configuration(config)
          .Enrich.FromLogContext()
          .Enrich.WithExceptionDetails(
             new DestructuringOptionsBuilder()
                    .WithDefaultDestructurers()
                    .WithDestructurers(new[] {
                          new DbUpdateExceptionDestructurer()
                    }))
          .Enrich.WithProperty("ApplicationName", typeof(Program).Assembly.GetName().Name)
          .Enrich.WithProperty("Environment", env)
          .Enrich.WithMachineName()
          .Enrich.WithProcessId()
          .Enrich.WithEnvironmentUserName()
          .WriteTo.Async(a => a.File(Path.Combine(logsPath, "logs", "mia_.log"), rollingInterval: RollingInterval.Day))
#if DEBUG
          // Used to filter out potentially bad data due debugging.
          // Very useful when doing Seq dashboards and want to remove logs under debugging session.
          .Enrich.WithProperty("DebuggerAttached", Debugger.IsAttached)
#endif
        .CreateLogger();
    }

    /// <summary>
    /// Helper function to get assembly product name
    /// </summary>
    /// <returns></returns>
    private static string GetAssemblyProductName() {
      return Assembly.GetExecutingAssembly().GetCustomAttribute<AssemblyProductAttribute>().Product;
    }

    /// <summary>
    /// Configure Kestrel server limits from appsettings.json is not supported. So we manually copy them from config.
    /// See https://github.com/aspnet/KestrelHttpServer/issues/2216
    /// </summary>
    private static void ConfigureKestrelServerLimits(
        WebHostBuilderContext builderContext,
        KestrelServerOptions options) {
      KestrelServerOptions source = new KestrelServerOptions();
      builderContext.Configuration.GetSection(nameof(ApplicationOptions.Kestrel)).Bind(source);

      KestrelServerLimits limits = options.Limits;
      KestrelServerLimits sourceLimits = source.Limits;

      Http2Limits http2 = limits.Http2;
      Http2Limits sourceHttp2 = sourceLimits.Http2;

      http2.HeaderTableSize = sourceHttp2.HeaderTableSize;
      http2.InitialConnectionWindowSize = sourceHttp2.InitialConnectionWindowSize;
      http2.InitialStreamWindowSize = sourceHttp2.InitialStreamWindowSize;
      http2.MaxFrameSize = sourceHttp2.MaxFrameSize;
      http2.MaxRequestHeaderFieldSize = sourceHttp2.MaxRequestHeaderFieldSize;
      http2.MaxStreamsPerConnection = sourceHttp2.MaxStreamsPerConnection;

      limits.KeepAliveTimeout = sourceLimits.KeepAliveTimeout;
      limits.MaxConcurrentConnections = sourceLimits.MaxConcurrentConnections;
      limits.MaxConcurrentUpgradedConnections = sourceLimits.MaxConcurrentUpgradedConnections;
      limits.MaxRequestBodySize = sourceLimits.MaxRequestBodySize;
      limits.MaxRequestBufferSize = sourceLimits.MaxRequestBufferSize;
      limits.MaxRequestHeaderCount = sourceLimits.MaxRequestHeaderCount;
      limits.MaxRequestHeadersTotalSize = sourceLimits.MaxRequestHeadersTotalSize;
      limits.MaxRequestLineSize = sourceLimits.MaxRequestLineSize;
      limits.MaxResponseBufferSize = sourceLimits.MaxResponseBufferSize;
      limits.MinRequestBodyDataRate = sourceLimits.MinRequestBodyDataRate;
      limits.MinResponseDataRate = sourceLimits.MinResponseDataRate;
      limits.RequestHeadersTimeout = sourceLimits.RequestHeadersTimeout;
    }
  }
}
