using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using RazorLight;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace MIA.TemplateParser {

  public class RazorTemplateParser : ITemplateParser {
    public RazorTemplateParser(IHostingEnvironment env, ILogger<RazorTemplateParser> logger) {
      this._env = env;
      this._logger = logger;
    }

    public async Task<string> LoadAndParse(string templateFileName, string locale, dynamic data) {
      try {
        var templatePath = Path.Combine(_env.WebRootPath, "emailTemplates", locale);
        var engine = new RazorLightEngineBuilder()
                 .SetOperatingAssembly(this.GetType().Assembly)
                 .UseFileSystemProject(templatePath)
                 .UseMemoryCachingProvider()
                 .Build();

        string result = await engine.CompileRenderAsync($"{templateFileName}.cshtml", data);
        return result;
      } catch (Exception ex) {
        _logger.LogError($"Failed to load and parse html template for file {templateFileName}\n\r" + ex.Message);
        throw;
      }

    }
    private readonly IHostingEnvironment _env;
    private readonly ILogger<RazorTemplateParser> _logger;
  }
}
