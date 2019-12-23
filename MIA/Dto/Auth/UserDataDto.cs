﻿using Microsoft.AspNetCore.Http;
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
    public string FirstName { get; set; }
    public string LastName{ get; set; }
    public string AvatarImageUrl { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
  }

  public class UpdateUserProfileDto: BaseRequest {
    public IFormFile Avatar { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
  }
}
