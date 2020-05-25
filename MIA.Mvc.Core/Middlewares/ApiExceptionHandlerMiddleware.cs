using System;
using System.Collections.Generic;
using System.Net;
using System.Reflection;
using System.Threading.Tasks;
using MIA.Infrastructure.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using StackExchange.Redis;
using MIA.Exceptions;

namespace MIA.Middlewares {

  public class ApiExceptionHandlerMiddleware {
    private readonly RequestDelegate _next;
    private readonly IHostingEnvironment _env;
    private readonly ILogger<ApiExceptionHandlerMiddleware> _logger;
    private readonly JsonSerializerSettings _jsonSettings;

    public ApiExceptionHandlerMiddleware(RequestDelegate next, ILoggerFactory loggerFactory, IHostingEnvironment env) {
      _next = next ?? throw new ArgumentNullException(nameof(next));
      _env = env;
      _logger = loggerFactory?.CreateLogger<ApiExceptionHandlerMiddleware>() ?? throw new ArgumentNullException(nameof(loggerFactory));

      _jsonSettings = ConfigureJsonSettings();
    }

    protected virtual JsonSerializerSettings ConfigureJsonSettings() {
      var jsonResolver = new PropertyRenameAndIgnoreSerializerContractResolver();
      jsonResolver.IgnoreProperty(typeof(Exception), "message");
      jsonResolver.IgnoreProperty(typeof(Exception), "data");
      jsonResolver.IgnoreProperty(typeof(Exception), "source");
      jsonResolver.IgnoreProperty(typeof(Exception), "hResult");

      //hide senstive information in production
      if (_env.IsProduction()) {
        jsonResolver.IgnoreProperty(typeof(Exception), "stackTrace");
        jsonResolver.IgnoreProperty(typeof(Exception), "innerException");
      }

      var _jsonSettings = new JsonSerializerSettings {
        NullValueHandling = NullValueHandling.Ignore
      };
      _jsonSettings.ContractResolver = jsonResolver;
      return _jsonSettings;
    }

    public async Task Invoke(HttpContext context) {
      try {
        await _next(context);
      } catch (ValidationException ex) {
        var e = new ApiException(ex.Message, ex, ApiErrorType.BadRequest, ex.Errors);
        context.Response.Clear();
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)e.StatusCode;
        var json = JsonConvert.SerializeObject(e, _jsonSettings);
        await context.Response.WriteAsync(json);

        _logger.LogError(ex, "Api error");
        return;
      } catch (ApiException ex) {
        if (context.Response.HasStarted) {
          _logger.LogWarning("The response has already started, the http status code middleware will not be executed.");
          throw;
        }

        context.Response.Clear();
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)ex.StatusCode;
        var json = JsonConvert.SerializeObject(ex, _jsonSettings);
        await context.Response.WriteAsync(json);

        _logger.LogError(ex, "Api error");

        return;
      } catch (Exception ex) {
        context.Response.Clear();
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        context.Response.ContentType = context.Request.ContentType;
        if (_env.IsDevelopment()) {
          await context.Response.WriteAsync(ex.Message);
        } else {
          await context.Response.WriteAsync("Failed to complete request, please report this to system administrator");
        }

        _logger.LogError(ex, "Unhandled error");

        return;
      }
    }
  }
}