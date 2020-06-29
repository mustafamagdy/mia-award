using MIA.Models.Entities;
using MIA.Models.Entities.Enums;

namespace MIA.Administration.Api {
  public class ProfileDto : BaseDto {
  //  public string UserId { get; set; }
    public string  Id { get; set; }
    public string FullName { get; set; }
    public string UserName { get; set; }
    public string Email{ get; set; }
    public PhoneNumber MobileNumber { get; set; }
    public Gender Gender { get; set; }
    public string ImageUrl { get; set; }
  }
}