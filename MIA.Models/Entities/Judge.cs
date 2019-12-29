using System.Collections.Generic;
namespace MIA.Models.Entities {
  public class Judge : AppUser {
    public Committie Committie { get; set; }
    public string CommettieId { get; set; }

    public HashSet<JudgeVoting> Votings { get; set; }

  }

}