using MIA.Administration.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MIA.Dto.Admin;
using MIA.Models.Entities;

namespace MIA.Administration.Dto.User {
  public class UserDto {
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public string FullName { get; set; }
    public string AvatarImage { get; set; }
  }
  public class ContentReviewerDto : UserDto {

  }
  public class NomineeDto : UserDto {
    // public HashSet<ArtWorkDto> ArtWorks { get; set; }
  }
  public class JudgeDto : UserDto {
    //public string Id { get; set; }
    //public string FirstName { get; set; }
    //public string LastName { get; set; }
  }

  public class UserBasicDataDto {
    public string Id { get; set; }
    public string FullName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string JobTitle { get; set; }
    public S3File ProfileImage { get; set; }
  }

  public class UserIdFullNameDto
  {
    public string Id { get; set; }
    public string FullName { get; set; }
  }

  public class UserUpdateDto : UserBasicDataDto {
    public string Password { get; set; }
  }

  public class UserWithRolesDto : UserBasicDataDto {
    public string[] Roles { get; set; }
  }
}
