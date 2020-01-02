namespace MIA.Extensions {
  using MIA.TemplateParser;
  using Microsoft.Extensions.DependencyInjection;

  public static partial class ServiceExtensions {
    public static IServiceCollection AddTemplateParser(this IServiceCollection services) {
      return services.AddSingleton<ITemplateParser, RazorTemplateParser>();
    }
  }
}