using System.Threading.Tasks;

namespace MIA.TemplateParser {
  public interface ITemplateParser {
    Task<string> LoadAndParse(string templateFileName, string locale, dynamic data);
  }
}
