using MIA.Infrastructure.Options;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace MIA.Extensions {
  public class SMTPEmailSender : IEmailSender {
    private readonly SMTPEmailSenderOptions _options;
    private readonly ILogger<SMTPEmailSender> _logger;

    public SMTPEmailSender(IOptions<SMTPEmailSenderOptions> optionsAccessor, ILogger<SMTPEmailSender> logger) {
      this._options = optionsAccessor.Value;
      this._logger = logger;
    }


    public async Task SendEmailAsync(string email, string subject, string htmlMessage) {
      var mSmtpClient = new SmtpClient();
      MailMessage mMailMessage = new MailMessage();
      _logger.LogInformation("Sending email to " + email + " using " + _options.HostName + ":" + _options.Port);
      mMailMessage.To.Add(new MailAddress(email));
      mMailMessage.Subject = subject;
      mMailMessage.Body = htmlMessage;
      mMailMessage.IsBodyHtml = true;
      mMailMessage.From = new MailAddress(_options.SenderEmail, _options.SenderDisplayName);
      mMailMessage.Priority = MailPriority.Normal;
      mSmtpClient.Host = _options.HostName;
      mSmtpClient.Port = _options.Port;

      await mSmtpClient.SendMailAsync(mMailMessage);
      mSmtpClient.Dispose();
    }
  }
}
