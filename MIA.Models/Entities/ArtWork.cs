using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class ArtWork : BaseEntity<string> {
    public bool UploadComplete { get; set; }
    public Award Award { get; set; }
    public string AwardId { get; set; }
    public Nominee Nominee { get; set; }
    public string NomineeId { get; set; }
    public ArtWorkPayment Payment { get; set; }
    public string PaymentId { get; set; }
    public int FileCount { get; set; }
    public HashSet<MediaFile> MediaFiles { get; set; }
    public HashSet<JudgeVote> Votes { get; set; }
  }
}
