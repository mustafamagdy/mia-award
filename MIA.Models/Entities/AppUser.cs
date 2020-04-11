﻿using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class AppUser : IdentityUser<string> {
    public string FullName { get; set; }
    public string Address { get; set; }
    public UserImage AvatarImage { get; set; }
  }

  public class ContentReviewer : AppUser { }

  //dont login to backend
  public class Nominee : AppUser {
    public string JobTitle { get; set; }
    public string CompanyName { get; set; }
    public HashSet<ArtWork> ArtWorks { get; set; }
    public Contestant Contestant { get; set; }
    public string ContestantId { get; set; }
  }

  public class Judge : AppUser {
    public HashSet<JudgeArtworkAward> JudgeArtworkAwards { get; set; }
    public HashSet<JudgeContestantAward> JudgeContestantAwards { get; set; }
    public HashSet<ArtworkJudgeVote> ArtworkVotes { get; set; }
    public HashSet<ContestantJudgeVote> ContestantVotes { get; set; }
    public HashSet<JudgeComment> Comments { get; set; }
  }
}