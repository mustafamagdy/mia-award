using MIA.Administration.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIA.Administration.Dto.User {
  public class UserDto {
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public string FullName { get; private set; }
    public string AvatarImage { get; set; }
  }
  public class ContentReviewerDto : UserDto {

  }
  public class NomineeDto : UserDto {
    // public HashSet<ArtWorkDto> ArtWorks { get; set; }
  }
  public class JudgeDto : UserDto {
  }
}
