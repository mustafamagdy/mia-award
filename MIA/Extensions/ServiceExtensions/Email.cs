using AWJ.EmailProviders;
using MIA.Infrastructure.Options;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MIA.Providers;

namespace MIA.Extensions
{
  /// <summary>
  /// Extension methods to configure startup class
  /// </summary>
  public static partial class ServiceExtensions
  {
#if (EmailSendGrid)
    /// <summary>
    /// Add send grid email provider as default email sender
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    /// <returns></returns>
    public static IServiceCollection AddSendGrid(this IServiceCollection services, IConfiguration configuration) {
      return services
              .AddSingleton<IEmailSender, SendGridEmailSender>()
              .AddSingleton<ICultureEmailTemplateProvider, LocalEmailTemplateProvider>()
              .Configure<SendGridEmailSenderOptions>(configuration.GetSection("SendGrid"));
    }

#elif (GmailSender)
    /// <summary>
    /// Add gmail email provider as default email sender
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    /// <returns></returns>
    public static IServiceCollection AddGmail(this IServiceCollection services, IConfiguration configuration) {
      return services
              .AddSingleton<IEmailSender, GmailEmailSender>()
              .AddSingleton<ICultureEmailTemplateProvider, LocalEmailTemplateProvider>()
              .Configure<GmailEmailSenderOptions>(configuration.GetSection("GmailConfig"));
    }
#elif (SMTPSender)
    /// <summary>
    /// Add SMTP email provider as default email sender
    /// </summary>
    /// <param name="services"></param>
    /// <param name="configuration"></param>
    /// <returns></returns>
    public static IServiceCollection AddSMTPEmailSender(this IServiceCollection services, IConfiguration configuration) {
      return services
              .AddSingleton<IEmailSender,SMTPEmailSender>()
              .AddSingleton<ICultureEmailTemplateProvider, LocalEmailTemplateProvider>()
              .Configure<SMTPEmailSenderOptions>(configuration.GetSection("SMTPConfig"));
    }

#endif
  }
}
