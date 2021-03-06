using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MIA.Api.Base {
  public interface IApiUrlHelper {
    string GetApiUrl();
  }

  public class ApiUrlHelper : IApiUrlHelper {
    private readonly IHttpContextAccessor _ctxAccessor;

    public ApiUrlHelper([FromServices] IHttpContextAccessor ctxAccessor) {
      this._ctxAccessor = ctxAccessor;
    }


    public string GetApiUrl() {
      var request = _ctxAccessor.HttpContext.Request;
      return string.Concat(request.Scheme,
          "://",
          request.Host.ToUriComponent(),
          request.PathBase.ToUriComponent());
    }
  }
}
