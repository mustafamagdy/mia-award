using System;
using System.Collections.Generic;
using System.Text;

namespace MIA.Models.Entities {
  public class AuthToken : BaseEntity<string> {
    public string Token { get; private set; }
    public DateTime Expires { get; private set; }
    public string UserId { get; private set; }
    public AppUser User { get; private set; }
    public bool Active => DateTime.UtcNow <= Expires;
    public string RemoteIpAddress { get; private set; }

    public AuthToken(string token, DateTime expires, string userId, string remoteIpAddress) {
      Token = token;
      Expires = expires;
      UserId = userId;
      RemoteIpAddress = remoteIpAddress;
    }
  }
}
