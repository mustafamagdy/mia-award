namespace MIA.Infrastructure.Options {
  public class GDSOptions {

    public string OtaAccountNumber { get; set; }
    public bool LogAPICalls { get; set; }
    public string ApiUrl { get; set; }
    public string LookupsApiUrl { get; set; }
    public string OtaApiUrl { get; set; }
    public string MohApiUrl { get; set; }
    public string AuthToken { get; set; }
    public string OTAAuthToken { get; set; }
    public string MetadataApiUrl { get; set; }

    public string Cert_FriendlyName { get; set; }
    public string Cert_StoreName { get; set; }
    public string Cert_StoreLocation { get; set; }

    public decimal GDS_Fees { get; set; }
    public decimal Hotel_Default_Markup { get; set; }
    public decimal VisaFees { get; set; }
    public decimal VisaInsurance { get; set; }
    public string HotelProviders { get; set; }
    public string GroundServiceProviders { get; set; }
    public string TransportationProviders { get; set; }
  }
}