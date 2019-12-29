namespace MIA.Models.Entities {
  public class AwardSubmission : BaseEntity<string> {
    public Subscriber Producer { get; set; }
    public string ProducerId { get; set; }

    public Committie Committie { get; set; }
    public string CommittieId { get; set; }

    public bool UploadComplete { get; set; }
  }

}