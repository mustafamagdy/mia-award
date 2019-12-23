using MIA.Dto.Base;

namespace MIA.Dto.Auth
{
  /// <summary>
  /// Login request dto for authenticating users
  /// </summary>
  public class LoginRequest : BaseRequest
  {
    /// <summary>
    /// Username for login user
    /// </summary>
    public string UserName { get; set; }

    /// <summary>
    /// Password for login user
    /// </summary>
    public string Password { get; set; }
  }
}
