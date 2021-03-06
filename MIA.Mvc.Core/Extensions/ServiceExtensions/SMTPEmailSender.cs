using System;
using MIA.Infrastructure.Options;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
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
      var mSmtpClient = new System.Net.Mail.SmtpClient();
      try {
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
        mSmtpClient.Credentials = new System.Net.NetworkCredential(_options.UserName, _options.Password);
        mSmtpClient.EnableSsl = _options.SSLRequired;

        await mSmtpClient.SendMailAsync(mMailMessage);

      } catch (Exception e) {
        _logger.LogError(e.Message);
      } finally {
        mSmtpClient.Dispose();
      }

    }
  }
}
