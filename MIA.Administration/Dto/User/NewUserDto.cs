using Microsoft.AspNetCore.Http;

namespace MIA.Administration.Api
{
    public class NewUserDto {
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public string FullName { get; private set; }
    public string AvatarImage { get; set; }
  }

}