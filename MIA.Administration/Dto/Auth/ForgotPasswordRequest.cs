using MIA.Dto.Base;

namespace MIA.Administration.Dto.Auth
{
  /// <summary>
  /// Request for password reset
  /// </summary>
  public class ForgotPasswordRequest : BaseRequest
  {
    /// <summary>
    /// user email to send password link to
    /// </summary>
    public string Email { get; set; }
  }

  /// <summary>
  /// Request for reset password with token
  /// </summary>
  public class ResetPasswordRequest: BaseRequest {

    /// <summary>
    /// Email for the user to reset password
    /// </summary>
    public string UserId { get; set; }
    /// <summary>
    /// token send to user reset password for
    /// </summary>
    public string Code { get; set; }

    /// <summary>
    /// New password to reset the old password with
    /// </summary>
    public string NewPassword { get; set; }

    /// <summary>
    /// Confirm new password
    /// </summary>
    public string ConfirmPassword { get; set; }
  }

  public class ChangePasswordRequest : BaseRequest {

    public string CurrentPassword { get; set; }

    /// <summary>
    /// New password to reset the old password with
    /// </summary>
    public string NewPassword { get; set; }

    /// <summary>
    /// Confirm new password
    /// </summary>
    public string ConfirmPassword { get; set; }
  }
}
