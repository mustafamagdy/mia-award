namespace MIA.Payments {
  public class PaymentStatus {
    public bool IsApproved { get; set; }
    public string PaymentId { get; set; }
    public string Status { get; set; }
    public bool IsPending { get; set; }
    public string ThreeDsUrl { get; set; }
    public string ThreeDsTitle { get; set; }
    public string ResponseCode { get; set; }
  }
}
