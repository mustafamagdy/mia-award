using MIA.Dto.Base;

namespace MIA.Dto.Auth
{
  /// <summary>
  /// Refresh token request
  /// </summary>
  public class RefreshTokenRequest : BaseRequest
  {
    /// <summary>
    /// Old authentication token
    /// </summary>
    public string AuthToken { get; set; }
  }
}
