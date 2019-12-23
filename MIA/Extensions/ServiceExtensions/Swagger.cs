using Boxed.AspNetCore.Swagger;
using Boxed.AspNetCore.Swagger.OperationFilters;
using Boxed.AspNetCore.Swagger.SchemaFilters;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using System.Reflection;
using MIA.OperationFilters;

namespace MIA.Extensions
{
  /// <summary>
  /// Extension methods to configure startup class
  /// </summary>
  public static partial class ServiceExtensions
  {
#if (Swagger)
    /// <summary>
    /// Adds Swagger services and configures the Swagger services.
    /// </summary>
    public static IServiceCollection AddCustomSwagger(this IServiceCollection services) {
      return services.AddSwaggerGen(options => {
        Assembly assembly = typeof(Startup).Assembly;
        string assemblyProduct = assembly.GetCustomAttribute<AssemblyProductAttribute>().Product;
        string assemblyDescription = assembly.GetCustomAttribute<AssemblyDescriptionAttribute>().Description;

        options.DescribeAllEnumsAsStrings();
        options.DescribeAllParametersInCamelCase();
        options.DescribeStringEnumsInCamelCase();
        options.EnableAnnotations();

        // Add the XML comment file for this assembly, so its contents can be displayed.
        options.IncludeXmlCommentsIfExists(assembly);

#if (Versioning)
        options.OperationFilter<ApiVersionOperationFilter>();
#endif
        options.OperationFilter<ForbiddenResponseOperationFilter>();
        options.OperationFilter<UnauthorizedResponseOperationFilter>();

        // Show an example model for JsonPatchDocument<T>.
        options.SchemaFilter<JsonPatchDocumentSchemaFilter>();

#if (Versioning)
        IApiVersionDescriptionProvider provider = services.BuildServiceProvider().GetRequiredService<IApiVersionDescriptionProvider>();
        foreach (ApiVersionDescription apiVersionDescription in provider.ApiVersionDescriptions) {
          Info info = new Info() {
            Title = assemblyProduct,

            Description = apiVersionDescription.IsDeprecated
            ? $"{assemblyDescription} This API version has been deprecated."
            : assemblyDescription,

            Version = apiVersionDescription.ApiVersion.ToString(),
          };
          options.SwaggerDoc(apiVersionDescription.GroupName, info);
        }
#else
                    var info = new Info()
                    {
                        Title = assemblyProduct,
                        Description = assemblyDescription,
                        Version = "v1"
                    };
                    options.SwaggerDoc("v1", info);
#endif
      });
    }

#endif
  }
}