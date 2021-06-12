using MIA.Authorization;
using MIA.Authorization.Context;
using MIA.Authorization.Entities;
using MIA.Authorization.Policy;
using MIA.Models.Entities;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Authorization;

namespace MIA.Extensions {
  using Microsoft.AspNetCore.Identity;
  using Microsoft.Extensions.DependencyInjection;

  /// <summary>
  /// Extension methods to configure startup class
  /// </summary>
  public static partial class ServiceExtensions {
    /// <summary>
    /// Adds asp.net core Identity with default configuration with jwt
    /// </summary>
    /// <param name="services"></param>
    /// <param name="env"></param>
    /// <returns></returns>
    public static IServiceCollection AddPermissions(this IServiceCollection services) {

      services.AddScoped<IUserClaimsPrincipalFactory<AppUser>, AddPermissionsToUserClaims<AppUser>>();

      //Register the Permission policy handlers
      services.AddSingleton<IAuthorizationPolicyProvider, AuthorizationPolicyProvider>();
      services.AddSingleton<IAuthorizationHandler, PermissionHandler>();
      services.AddScoped<IPermissionsDbContext<string, IdentityUserRole<string>, AppRole>, AppUnitOfWork>();

      return services;
    }

  }
}