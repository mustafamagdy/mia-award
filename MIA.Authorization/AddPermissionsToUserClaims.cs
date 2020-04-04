using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MIA.Authorization.Context;
using MIA.Authorization.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace MIA.Authorization {

  public class AddPermissionsToUserClaims<TUser> : UserClaimsPrincipalFactory<TUser> where TUser : IdentityUser<string> {
    private readonly IPermissionsDbContext<string, IdentityUserRole<string>, AppRole> _extraAuthDbContext;
    private readonly IMapper _mapper;
    private readonly UserManager<TUser> _userManager;
    public AddPermissionsToUserClaims(
      UserManager<TUser> userManager,
      IOptions<IdentityOptions> optionsAccessor,
      IPermissionsDbContext<string, IdentityUserRole<string>, AppRole> extraAuthDbContext,
      IMapper mapper)
      : base(userManager, optionsAccessor) {
      _extraAuthDbContext = extraAuthDbContext;
      _mapper = mapper;
      _userManager = userManager;
    }

    protected override async Task<ClaimsIdentity> GenerateClaimsAsync(TUser user) {
      var identity = await base.GenerateClaimsAsync(user);
      var userId = identity.Claims.GetUserIdFromClaims();

      var roles = string.Join(";", await _userManager.GetRolesAsync(user));

      var userModules = string.Join(";",
        ((_extraAuthDbContext.UserModules.FirstOrDefault(a => a.UserId == user.Id)
          ?? new UserModule(user.Id, SystemModules.Dashboard))
          .AllowedModules.ToString()).Split(","));

      var allRolePermissions = _extraAuthDbContext.Roles
        .Where(x => roles.Contains(x.Name))
        .SelectMany(x => x.PermissionsInRole)
        .AsEnumerable()
        .Select(a => _mapper.Map<PermissionDto>(a));

      var roleGroupedPermissions = allRolePermissions
        .GroupBy(a => a.SystemModule)
        .ToDictionary(a => a.Key, b => b.Select(a => string.Join('_', a.Name.ToLower().Split(' '))).ToArray());

      var rolePermissions = allRolePermissions
        .Select(a => a.SystemModule + "." + string.Join('_', a.Name.ToLower().Split(' ')))
        .ToArray();

      identity.AddClaim(new Claim("id", user.Id));
      identity.AddClaim(new Claim("name", user.UserName));
      identity.AddClaim(new Claim("username", user.UserName));
      identity.AddClaim(new Claim("roles", roles));
      identity.AddClaim(new Claim("userModules", userModules));
      //identity.AddClaim(new Claim("userPermissions", JsonConvert.SerializeObject(roleGroupedPermissions)));
      identity.AddClaim(new Claim("userPermissions", JsonConvert.SerializeObject(rolePermissions)));

      var permCalc = new CalcAllowedPermissions(_extraAuthDbContext);
      var permissions = permCalc.CalcPermissionsForUserAsync(userId);
      identity.AddClaim(new Claim(PermissionConstants.PackedPermissionClaimType, permissions));
      return identity;
    }
  }
}
