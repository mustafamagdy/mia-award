namespace MIA.Administration.Api {
  public class PhoneNumber {
    public string CountryCode { get; set; }
    public string Number { get; set; }

    public override string ToString() {
      return string.Format("{0}{1}", CountryCode, Number);
    }
  }
}