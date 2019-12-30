using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class AppUser : IdentityUser<string> {
    public string FirstName { get; set; }
    public string LastName { get; set; }


    public string FullName { get; private set; }
    public UserImage AvatarImage { get; set; }
  }

  public class ContentReviewer : AppUser { }

  //dont login to backend
  public class Nominee : AppUser {
    public HashSet<ArtWork> ArtWorks { get; set; }
    public HashSet<ArtWorkPayment> Payments { get; set; }
  }

  public class Judge : AppUser {
    public JudgeAward JudgeAwards { get; set; }
    public string JudgeAwardsId { get; set; }

    public HashSet<JudgeVote> Votings { get; set; }
    public HashSet<JudgeComment> Comments { get; set; }
  }
}