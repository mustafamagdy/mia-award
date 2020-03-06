using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIA.Infrastructure.Options
{
  public class SMTPEmailSenderOptions
  {
    public string HostName { get; set; }
    public string UserName { get; set; }

    public string Password { get; set; }
    public string SenderEmail { get; set; }
    public string SenderDisplayName { get; set; }
    public int Port { get; set; }
    public bool SSLRequired { get; set; }

  }
}
