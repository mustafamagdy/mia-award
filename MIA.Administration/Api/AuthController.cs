using AutoMapper;
using MIA.Infrastructure.Options;
using MIA.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MIA.Middlewares.Auth;
using MIA.Api.Base;
using MIA.Dto.Auth;
using System.Collections.Generic;
using System.Security.Claims;
using MIA.Authorization.Entities;
using MIA.ORMContext.Uow;
using MIA.Dto.Admin;

namespace MIA.Administration.Api {
  /// <summary>
  /// Authentication controller for different identity operations
  /// </summary>
#if (Versioning)
  [ApiVersion("1.0")]
#endif
  [Route("api/auth")]
  public class AuthController : BaseApiController<AuthController> {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="logger"></param>
    public AuthController(IMapper mapper, [FromServices] ILogger<AuthController> logger) : base(logger, mapper) { }

    /// <summary>
    /// Login using username and password
    /// </summary>
    /// <param name="userIp"></param>
    /// <param name="loginData">Login details</param>
    /// <param name="signInManager"></param>
    /// <param name="userManager"></param>
    /// <param name="jwtOptions"></param>
    /// <returns></returns>
    [HttpPost("login")]
    [SwaggerOperation("Login user using username and password")]
    public async Task<IActionResult> Login(
      [FromHeader] string userIp,
      [FromBody] LoginRequest loginData,
      [FromServices] SignInManager<AppUser> signInManager,
      [FromServices] UserManager<AppUser> userManager,
      [FromServices] IAppUnitOfWork db,
      [FromServices] IOptions<JwtOptions> jwtOptions,
      [FromServices] IUserClaimsPrincipalFactory<AppUser> claimFactory) {

      JwtOptions jwtConfig = jwtOptions?.Value;
      if (jwtConfig == null) {
        throw new ArgumentException("jwt not configured correctly", nameof(jwtOptions));
      }

      AppUser user = await userManager.FindByNameAsync(loginData.UserName);
      if (user == null) {
        return NotFound404("invalid credentials");
      }

      bool canSignIn = await signInManager.CanSignInAsync(user);
      if (!canSignIn) {
        return Forbid403("User cannot login");
      }

      Microsoft.AspNetCore.Identity.SignInResult signInResult = await signInManager.PasswordSignInAsync(user,
        loginData.Password,
        isPersistent: false,
        lockoutOnFailure: false);

      if (signInResult.IsLockedOut) {
        return Unauthorized401("User is locked");
      } else if (!signInResult.Succeeded) {
        return Forbid403("User is not allowed");
      }

      var roles = await userManager.GetRolesAsync(user);

      var modulePermissions = new Dictionary<string, string>();
      var userModules = string.Join(";",
        ((db.UserModules.FirstOrDefault(a => a.UserId == user.Id)
        ?? new UserModule(user.Id, SystemModules.None))
        .AllowedModules.ToString()).Split(","));


      var allRolePermissions = db.Roles
                              .Where(x => roles.Contains(x.Name))
                              .SelectMany(x => x.PermissionsInRole)
                              .AsEnumerable()
                              .MapTo<PermissionDto>();

      var rolePermissions = allRolePermissions
                              .GroupBy(a => a.SystemModule)
                              .ToDictionary(
                                  a => a.Key,
                                  b => string.Join(";", b.Select(a => string.Join('_', a.Name.ToLower().Split(' ')))))
                              .ToArray();


      ClaimsPrincipal res = await claimFactory.CreateAsync(user);
      var allClaims = new List<Claim>(res.Claims);

      allClaims.Add(new Claim("id", user.Id));
      allClaims.Add(new Claim("name", user.UserName));
      allClaims.Add(new Claim("username", user.UserName));
      allClaims.Add(new Claim("firstName", user.FirstName));
      allClaims.Add(new Claim("lastName", user.LastName));
      allClaims.Add(new Claim("roles", string.Join(",", roles)));
      allClaims.Add(new Claim("PermissionId", string.Join(",", userModules)));
      allClaims.Add(new Claim("PermessionModules", string.Join(",", rolePermissions)));

      SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.SecretKey));
      SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      JwtSecurityToken jwtToken = new JwtSecurityToken(
        jwtConfig.Issuer,
        jwtConfig.Audience,
        allClaims.ToArray(),
        expires: DateTime.Now.AddHours(Math.Abs(jwtConfig.ExpireInHours)),
        signingCredentials: credentials
      );

      string token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
      //we don't need to store token, we only store deactivated tokens

      return Ok(token);
    }

    /// <summary>
    /// Logout and deactivate user auth token
    /// </summary>
    /// <param name="authorization"></param>
    /// <param name="signinManager"></param>
    /// <param name="tokenManager"></param>
    /// <returns></returns>
    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout(
      [FromHeader] string authorization,
      [FromServices] SignInManager<AppUser> signinManager,
      [FromServices] IAuthTokenManager tokenManager) {

      if (string.IsNullOrEmpty(authorization)) {
        return ValidationError(new[] { new IdentityError { Code = "TOKEN_NOT_FOUND", Description = "No token provided" } });
      }

      await signinManager.SignOutAsync();
      await tokenManager.DeactivateAsync(authorization);

      return Ok();
    }

    /// <summary>
    /// Refresh token, and discard the old one
    /// </summary>
    /// <param name="tokenData"></param>
    /// <returns></returns>
    [HttpPost]
    [SwaggerOperation("Refresh token, and discard the old one")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest tokenData) {
      return await Task.FromResult(Ok("done bardo ya bashaah"));
    }

  }
}