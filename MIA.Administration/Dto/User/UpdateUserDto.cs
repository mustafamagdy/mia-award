using MIA.Administration.Api.Base;
using Microsoft.AspNetCore.Http;

namespace MIA.Administration.Api
{
    public class UpdateUserDto : IUpdateDto
    { 
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public string FullName { get; private set; }
    public string AvatarImage { get; set; }
  }

}