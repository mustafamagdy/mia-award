using System.Collections.Generic;

namespace MIA.Models.Entities
{
  public abstract class BaseContestant : BaseEntity<string>
  {
    public LocalizedData Title { get; set; }
    public LocalizedData Description { get; set; }
    public string SiteUrl { get; set; }
    public int ProductionYear { get; set; }
    public int BroadcastYear { get; set; }
    public string TvChannels { get; set; }
    public string OnlineChannels { get; set; }
    public string ProductionLicenseNumber { get; set; }
    public string ProductionLicenseAgency { get; set; }

    public Nominee Nominee { get; set; }
    public string NomineeId { get; set; }
  }
}