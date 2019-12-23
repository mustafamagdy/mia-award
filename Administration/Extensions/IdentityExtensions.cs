using System.Linq;
using System.Security.Claims;

namespace Administration {
  public static class IdentityExtensions {
    public static string RoleName(this ClaimsPrincipal principal) {
      return (principal.Claims
        .Where(c => c.Type == ClaimTypes.Role)
        .Select(c => c.Value).FirstOrDefault() ?? "").ToUpper();
    }
  }
}
