
namespace MIA.Api {
  public class SubmitUserComment : GoogleReCaptchaModelBase {
    public string Name { get; set; }
    public string Email { get; set; }
    public string Title { get; set; }
    public string Comment { get; set; }
  }


}