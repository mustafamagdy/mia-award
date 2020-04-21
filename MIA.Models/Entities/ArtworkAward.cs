using System.Collections.Generic;

namespace MIA.Models.Entities
{
  public class ArtworkAward : BaseAward {
    public HashSet<JudgeArtworkAward> Level1Judges { get; set; }
    public HashSet<JudgeArtworkAward> Level2Judges { get; set; }
    public HashSet<ArtWork> ArtWorks { get; set; }
    public HashSet<ArtworkVotingCriteria> VotingCriterias { get; set; }

    public ArtWork FirstPlace { get; set; }
    public string FirstPlaceArtworkId { get; set; }

    public ArtWork SecondPlace { get; set; }
    public string SecondPlaceArtworkId { get; set; }

  }
}