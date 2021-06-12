namespace MIA.Api
{
  public class BoothPurchaseDto {
    public string BoothCode { get; set; }
    
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

    public string CompanyLogoFileExt { get; set; }
    public byte[] CompanyLogo { get; set; }

    public PaymentDto Payment { get; set; }

  }
}