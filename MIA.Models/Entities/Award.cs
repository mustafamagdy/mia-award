using System.Collections.Generic;

namespace MIA.Models.Entities
{
  public class Award : BaseEntity<string> {
    public string Code { get; set; }
    public LocalizedData Title { get; set; }
    public LocalizedData Description { get; set; }
    public decimal ArtworkFee { get; set; }
    public string TrophyImageKey { get; set; }
    public string TrophyImageUrl { get; set; }

    public AwardType AwardType { get; set; }

    public Judge Manager { get; set; }
    public string ManagerId { get; set; }

    public HashSet<JudgeAward> Level1Judges { get; set; }
    public HashSet<JudgeAward> Level2Judges { get; set; }
    public HashSet<Artwork> Artworks { get; set; }
    public HashSet<VotingCriteria> VotingCriterias { get; set; }

    public Artwork FirstPlace { get; set; }
    public string FirstPlaceId { get; set; }

    public Artwork SecondPlace { get; set; }
    public string SecondPlaceId { get; set; }

  }
}