using System.Collections.Generic;
namespace MIA.Models.Entities {
  public class Subscriber : AppUser {
    public HashSet<Award> SubscibedAwards { get; set; }
    public HashSet<Media> Medias { get; set; }
  }

}