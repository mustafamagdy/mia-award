using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace MIA.Administration.Middlewares.Auth
{
  /// <summary>
  /// 
  /// </summary>
  public class AuthTokenManagerMiddleware : IMiddleware {
    private readonly IAuthTokenManager _tokenManager;
    /// <summary>
    /// constructor
    /// </summary>
    /// <param name="tokenManager"></param>
    public AuthTokenManagerMiddleware (IAuthTokenManager tokenManager) {
      this._tokenManager = tokenManager;
    }

    /// <summary>
    /// Validate user has access token
    /// </summary>
    /// <param name="context"></param>
    /// <param name="next"></param>
    /// <returns></returns>
    public async Task InvokeAsync (HttpContext context, RequestDelegate next) {
      if (await _tokenManager.IsCurrentActiveToken ()) {
        await next (context);
        return;
      }
      context.Response.StatusCode = (int) HttpStatusCode.Unauthorized;
    }
  }
}