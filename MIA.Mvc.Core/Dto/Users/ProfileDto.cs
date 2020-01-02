using MIA.Models.Entities;
using MIA.Models.Entities.Enums;

namespace MIA.Administration.Api {
  public class ProfileDto : BaseDto {
    public string UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public PhoneNumber MobileNumber { get; set; }
    public Gender Gender { get; set; }
    public string ImageUrl { get; set; }
  }
}