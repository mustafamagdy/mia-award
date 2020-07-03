using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class AppUser : IdentityUser<string> {
    public string FullName { get; set; }
    public string Address { get; set; }
    public UserImage AvatarImage { get; set; }
  }

  //dont login to backend
  public class Nominee : AppUser {
    public string JobTitle { get; set; }
    public string CompanyName { get; set; }
    public HashSet<Artwork> Artworks { get; set; }
   
  }

  public class Judge : AppUser {
    public HashSet<JudgeAward> JudgeAwards { get; set; }
    public HashSet<JudgeVote> JudgeVotes { get; set; }
    public HashSet<JudgeComment> Comments { get; set; }
  }
}