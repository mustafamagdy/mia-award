using Microsoft.AspNetCore.Hosting;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace MIA.Providers {
  /// <summary>
  /// Provider for email templates that are loaded from local drive
  /// </summary>
  public class LocalEmailTemplateProvider : ICultureEmailTemplateProvider
  {
    private readonly IHostingEnvironment _env;
    private readonly DirectoryInfo _cwd;
    private const string DEFAULT_DIR = "emailTemplates";

    /// <summary>
    /// 
    /// </summary>
    /// <param name="env"></param>
    public LocalEmailTemplateProvider(IHostingEnvironment env) {
      this._env = env;
      this._cwd = new DirectoryInfo(this._env.WebRootPath);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="cultureCode"></param>
    /// <param name="name"></param>
    /// <returns></returns>
    public async Task<string> GetEmailTemplateAsync(string cultureCode, string name) {
      string templateFileName = Path.Combine(this._cwd.FullName, DEFAULT_DIR, cultureCode, name);
      if (File.Exists(templateFileName)) {
        string template = await File.ReadAllTextAsync(templateFileName);
        return template;
      } else {
        return "";
      }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="name"></param>
    /// <returns></returns>
    public async Task<string> GetEmailTemplateAsync(string name) {
      return await GetEmailTemplateAsync("en", name);
    }

    /// <summary>
    /// Performs the keyword replacement on the provide email template.
    /// </summary>
    /// <remarks>
    /// Values written to the email template are Html encoded.
    /// </remarks>
    /// <param name="template"></param>
    /// <param name="keyValuePairs"></param>
    /// <returns></returns>
    private string Replace(string template, IDictionary<string, string> keyValuePairs) {
      return keyValuePairs.Aggregate(template, (current, value) =>
          current.Replace($"{{{value.Key}}}", HtmlEncoder.Default.Encode(value.Value)));
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="name"></param>
    /// <param name="keyValuePairs"></param>
    /// <returns></returns>
    public async Task<string> GetHtmlMessageAsync(string name, IDictionary<string, string> keyValuePairs) {
      return await GetHtmlMessageAsync("en", name, keyValuePairs);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="cultureCode"></param>
    /// <param name="name"></param>
    /// <param name="keyValuePairs"></param>
    /// <returns></returns>
    public async Task<string> GetHtmlMessageAsync(string cultureCode, string name, IDictionary<string, string> keyValuePairs) {
      cultureCode = cultureCode ?? "en";
      string template = await GetEmailTemplateAsync(cultureCode, name);
      string output = Replace(template, keyValuePairs);
      return output;
    }
  }
}
