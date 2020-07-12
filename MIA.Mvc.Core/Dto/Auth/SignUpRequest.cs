using MIA.Dto.Base;

namespace MIA.Dto.Auth {
  /// <summary>
  /// abstract class for user data dto
  /// </summary>
  public abstract class UserDataDto : BaseRequest {
    public string FullName { get; set; }
  }

  public class UserDataWithAvatar : UpdateUserAvatarDto {
    public string FullName { get; set; }
  }
  /// <summary>
  /// Signup using email and password
  /// </summary>
  public class SignUpByEmailRequest : UserDataWithAvatar {
    public string CompanyName { get; set; }
    public string JobTitle { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string UserType { get; set; }

  }

  /// <summary>
  /// Token verification request
  /// </summary>
  public class UserVerificationRequest : BaseRequest {
    /// <summary>
    /// UserId to get validate
    /// </summary>
    public string UserId { get; set; }
    /// <summary>
    /// Token to use for verification
    /// </summary>
    public string Code { get; set; }
  }

  /// <summary>
  /// Signup using mobile number
  /// </summary>
  public class SignUpByMobileRequest {
    /// <summary>
    /// Country code for user mobile number
    /// </summary>
    public string CountryCode { get; set; }
    /// <summary>
    /// User mobile number to validate
    /// </summary>
    public string MobileNumber { get; set; }
  }

  /// <summary>
  /// Verify user mobile number by sending verification code t it
  /// </summary>
  public class SignUpByMobileVerifyRequest {
    /// <summary>
    /// Verification code sent to user to validate his mobile number
    /// </summary>
    public string VerificationCode { get; set; }
  }

  /// <summary>
  /// Complete user verification to signup user
  /// </summary>
  public class SignUpByMobileCompleteRequest : UserDataDto {

  }
}
