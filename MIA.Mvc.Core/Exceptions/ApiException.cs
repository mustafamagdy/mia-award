using System;
using System.Collections.Generic;
using System.Net;
using System.Reflection;

namespace MIA.Exceptions {
  public class ApiException : ApplicationException {
    private readonly ApiErrorType _apiError;
    public ApiException(string message) : this(message, null) { }
    public ApiException(string message, Exception exception) : this(message, exception, ApiErrorType.InternalError) { }
    public ApiException(ApiErrorType apiError) : this("", null, apiError) { }
    public ApiException(ApiErrorType apiError, string message) : this(message, null, apiError) { }
    public ApiException(ApiErrorType apiError, Exception ex) : this(ex?.Message, ex, apiError) { }
    public ApiException(string message, Exception exception, ApiErrorType apiError) : base(message, exception) {
      _apiError = apiError;
      SetException(message, exception);
    }
    public ApiException(ApiErrorType apiError, IEnumerable<ErrorResult> errors, IDataResult data = null)
     : base(null, null) {
      _apiError = apiError;
      Errors = errors;
      Result = data;
      SetException(null, null);
    }
    public ApiException(string message, Exception exception, ApiErrorType apiError, IEnumerable<ErrorResult> errors, IDataResult data = null) : base(message, exception) {
      _apiError = apiError;
      Errors = errors;
      Result = data;
      SetException(message, exception);
    }

    private void SetException(string message, Exception exception) {
      var attr = GetErrorAttribute(_apiError);
      ErrorCode = attr.Code;
      string _message = "";
      if (!string.IsNullOrEmpty(message)) {
        _message = message + "->";
      }

      if (!string.IsNullOrWhiteSpace(attr.Message)) {
        _message += attr.Message;
      } else {
        _message += Message;
      }

      _message = _message.TrimEnd("->".ToCharArray());
      ErrorMessage = _message;
      StatusCode = attr.StatusCode;
      Details = UnwrapException(exception);
    }

    private string UnwrapException(Exception exception) {
      if (exception == null) return "";
      string _details = exception?.Message;
      while (exception?.InnerException != null) {
        _details += "\r\n" + exception.Message;
        exception = exception.InnerException;
      }
      return _details;
    }

    public HttpStatusCode StatusCode { get; private set; }
    public string ErrorCode { get; private set; }
    public string ErrorMessage { get; private set; }
    public string Details { get; private set; }
    public IEnumerable<ErrorResult> Errors { get; set; }
    public IDataResult Result { get; set; }

    /// <summary>
    /// Helper function to get the Error attribute values from <see cref="ApiErrorType"/> enum
    /// </summary>
    /// <param name="type"></param>
    /// <returns></returns>
    public static ErrorAttribute GetErrorAttribute(ApiErrorType type) {
      //TODO: Cach...!
      var enumType = typeof(ApiErrorType);
      var memInfo = enumType.GetMember(type.ToString());
      var attr = memInfo[0].GetCustomAttribute<ErrorAttribute>(false);
      if (attr == null)
        throw new ApplicationException("ApiErrorType must be decorated with [Error] Attribute");
      return attr;
    }
  }

  public class ErrorResult {
    public ErrorResult() { }
    public ErrorResult(string propertyName, string errorMessage) {
      PropertyName = propertyName;
      ErrorMessage = errorMessage;
    }
    public string PropertyName { get; set; }
    public string ErrorMessage { get; set; }
  }

  public interface IDataResult {

  }

  public class LoginFaild : IDataResult {
    public LoginFaild() { }
    public LoginFaild(int loginCount, bool showRecaptcha) {
      LoginCount = loginCount;
      ShowRecaptcha = showRecaptcha;
    }

    public int LoginCount { get; set; }
    public bool ShowRecaptcha { get; set; }
  }

}