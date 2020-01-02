namespace MIA {
  using System.Threading.Tasks;
  using MIA.ORMContext;
  using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
  using Microsoft.AspNetCore.Mvc.ModelBinding;

  /// <summary>
  /// Provider for Requested Page model binder
  /// </summary>
  public class RequestedPageHeaderModelBinderProvider : IModelBinderProvider {

    /// <summary>
    /// Validate if the model binder is suitable or not
    /// </summary>
    /// <param name="Context"></param>
    /// <returns></returns>
    public IModelBinder GetBinder (ModelBinderProviderContext Context) {
      if (Context.Metadata.ModelType == typeof (RequestedPage)) {
        if (Context.BindingInfo.BindingSource == BindingSource.Header) {
          return new BinderTypeModelBinder (typeof (RequestedPageHeaderModelBinder));
        }
      }
      return null;
    }
  }

  /// <summary>
  /// RequestedPage model binder to convert header json to RequestedPage instance
  /// </summary>
  public class RequestedPageHeaderModelBinder : IModelBinder {

    /// <summary>
    /// Try to bind RequestedPage instance from headers json
    /// </summary>
    /// <param name="BindingContext"></param>
    /// <returns></returns>
    public async Task BindModelAsync (ModelBindingContext BindingContext) {
      // Read HTTP header.
      string headerName = BindingContext.FieldName;
      if (BindingContext.HttpContext.Request.Headers.ContainsKey (headerName)) {
        var requestedPage = Newtonsoft.Json.JsonConvert.DeserializeObject<RequestedPage> (BindingContext.HttpContext.Request.Headers[headerName]);
        if (requestedPage == null) {
          // Value not found in HTTP header.  Substitute empty RequestedPage.
          // BindingContext.ModelState.SetModelValue (BindingContext.FieldName, requestedPage, null);
          BindingContext.Result = ModelBindingResult.Success (new RequestedPage ());
        } else {
          // Value found in HTTP header.
          BindingContext.ModelState.SetModelValue (BindingContext.FieldName, requestedPage, "");
          // Parse RequestedPage.
          BindingContext.Result = ModelBindingResult.Success (requestedPage);
        }
      } else {
        // HTTP header not found.
        BindingContext.Result = ModelBindingResult.Failed ();
      }
      await Task.FromResult (default (object));
    }
  }
}