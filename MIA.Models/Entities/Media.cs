namespace MIA.Models.Entities {
  public class Media : BaseEntity<string> {
    public Award Award { get; set; }
    public string AwardId { get; set; }

    public AwardSubmission AwardSubmission { get; set; }
    public string AwardSubmissionId { get; set; }
    public long UploadDate { get; set; }
  }

}