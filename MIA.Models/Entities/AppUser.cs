using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.AspNetCore.Identity;
namespace MIA.Models.Entities {
  public class AppUser : IdentityUser<string> {
    public string FirstName { get; set; }
    public string LastName { get; set; }

    /// <summary>
    /// Computed property for fullname
    /// </summary>
    public string FullName { get; private set; }

    public UserImage AvatarImage { get; set; }

  } 
}