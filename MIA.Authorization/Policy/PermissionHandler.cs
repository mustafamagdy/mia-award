using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace MIA.Authorization.Policy {

  public class PermissionHandler : AuthorizationHandler<PermissionRequirement> {
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement) {
      var permissionsClaim =
        context.User.Claims.SingleOrDefault(c => c.Type == PermissionConstants.PackedPermissionClaimType);
      // If user does not have the scope claim, get out of here
      if (permissionsClaim == null) {
        return Task.CompletedTask;
      }

      if (permissionsClaim.Value.ThisPermissionIsAllowed(requirement.PermissionNames.Split(","))) {
        context.Succeed(requirement);
      }

      return Task.CompletedTask;
    }
  }
}