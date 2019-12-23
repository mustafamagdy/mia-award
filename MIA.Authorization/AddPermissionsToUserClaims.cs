using System.Security.Claims;
using System.Threading.Tasks;
using MIA.Authorization.Context;
using MIA.Authorization.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace MIA.Authorization {

  public class AddPermissionsToUserClaims<TUser> : UserClaimsPrincipalFactory<TUser> where TUser: IdentityUser<string> {
    private readonly IPermissionsDbContext<string, IdentityUserRole<string>, AppRole> _extraAuthDbContext;

    public AddPermissionsToUserClaims(UserManager<TUser> userManager, IOptions<IdentityOptions> optionsAccessor,
      IPermissionsDbContext<string, IdentityUserRole<string>, AppRole> extraAuthDbContext)
      : base(userManager, optionsAccessor) {
      _extraAuthDbContext = extraAuthDbContext;
    }

    protected override async Task<ClaimsIdentity> GenerateClaimsAsync(TUser user) {
      var identity = await base.GenerateClaimsAsync(user);
      var userId = identity.Claims.GetUserIdFromClaims();

      var rtoPCalcer = new CalcAllowedPermissions(_extraAuthDbContext);
      identity.AddClaim(new Claim(PermissionConstants.PackedPermissionClaimType, rtoPCalcer.CalcPermissionsForUserAsync(userId)));
      return identity;
    }
  }
}
