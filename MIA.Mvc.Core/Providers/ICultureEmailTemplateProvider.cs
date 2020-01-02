using System.Collections.Generic;
using System.Threading.Tasks;
using AWJ.EmailProviders;

namespace MIA.Providers {

  /// <summary>
  /// Culture aware email template to load email template according to provided culture code
  /// </summary>
  public interface ICultureEmailTemplateProvider : IEmailTemplateProvider {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="cultureCode"></param>
    /// <param name="name"></param>
    /// <returns></returns>
    Task<string> GetEmailTemplateAsync (string cultureCode, string name);
    /// <summary>
    /// 
    /// </summary>
    /// <param name="cultureCode"></param>
    /// <param name="name"></param>
    /// <param name="keyValuePairs"></param>
    /// <returns></returns>
    Task<string> GetHtmlMessageAsync (string cultureCode, string name, IDictionary<string, string> keyValuePairs);

  }
}