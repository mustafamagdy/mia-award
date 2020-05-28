namespace MIA.Models.Entities {
  public class BoothPurchase : BaseEntity<string> {
    public BoothPurchase() {
      CompanyLogo = S3File.FromKeyAndUrl("", "");
    }

    public Booth Booth { get; set; }
    public string BoothId { get; set; }

    public string CompanyName { get; set; }
    public string Nationality { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public string Fax { get; set; }
    public string WebsiteUrl { get; set; }
    public string ContactPersonName { get; set; }
    public string ContactPersonTitle { get; set; }
    public string CellPhone1 { get; set; }
    public string CellPhone2 { get; set; }
    public string Email { get; set; }

    //tafaseel el3ardeeen
    public string ExtraDetails { get; set; }
    public string CompanyFieldOfBusiness { get; set; }

    public bool ScreenOption { get; set; }
    public bool PrintingOption { get; set; }

    public S3File CompanyLogo { get; set; }

    public BoothPayment Payment { get; set; }
    public string PaymentId { get; set; }
  }

}