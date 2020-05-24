using Microsoft.AspNetCore.Http;
using MIA.Dto.Base;

namespace MIA.Dto.Auth {
  /// <summary>
  /// User details dto
  /// </summary>
  public class UserDetailsDto : UserDataDto {
    /// <summary>
    /// 
    /// </summary>
    /// <value></value>
    public string UserName { get; set; }
  }

  public class UserProfileDto : BaseResponse {
    public string FullName { get; set; }
    public string JobTitle { get; set; }
    public string AvatarImageUrl { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
  }

  public class UpdateUserProfileDto : BaseRequest {
    public IFormFile Avatar { get; set; }
    public string JobTitle { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
  }

  public class UpdateUserAvatarDto : BaseRequest {
    public IFormFile Avatar { get; set; }
  }

}
