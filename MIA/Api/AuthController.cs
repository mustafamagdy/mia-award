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
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using MIA.Api.Base;
using MIA.Dto.Auth;
using MIA.Middlewares.Auth;
using MIA.ORMContext.Uow;
using Newtonsoft.Json;
using MIA.Exceptions;

namespace MIA.Api {
#if (Versioning)
  [ApiVersion("1.0")]
#endif
  [Route("api/auth")]
  public class AuthController : BaseApiController<AuthController> {

    public AuthController(IMapper mapper, [FromServices] ILogger<AuthController> logger) : base(logger, mapper) { }

    [HttpPost("login-nominee")]
    [SwaggerOperation("Login user using username and password")]
    public async Task<IActionResult> Login(
      [FromHeader] string userIp,
      [FromBody] LoginRequest loginData,
      [FromServices] IAppUnitOfWork db,
      [FromServices] SignInManager<AppUser> signInManager,
      [FromServices] UserManager<AppUser> userManager,
      [FromServices] IOptions<JwtOptions> jwtOptions,
      [FromServices] IUserClaimsPrincipalFactory<AppUser> claimFactory) {

      JwtOptions jwtConfig = jwtOptions?.Value;
      if (jwtConfig == null) {
        throw new ArgumentException("jwt not configured correctly", nameof(jwtOptions));
      }

      AppUser user = await userManager.FindByNameAsync(loginData.UserName);
      if (user == null) {
        throw new ApiException(ApiErrorType.NotFound, "invalid credentials");
      }

      bool canSignIn = await signInManager.CanSignInAsync(user);
      if (!canSignIn || !user.Active) {
        throw new ApiException(ApiErrorType.Forbidden, "User cannot login");
      }

      var nominee = await db.Nominees.FindAsync(user.Id);
      if (nominee == null) {
        throw new ApiException(ApiErrorType.NotFound, "user is not nominee, or not allowed");
      }

      Microsoft.AspNetCore.Identity.SignInResult signInResult = await signInManager.PasswordSignInAsync(user,
        loginData.Password,
        isPersistent: false,
        lockoutOnFailure: false);

      if (signInResult.IsLockedOut) {
        throw new ApiException(ApiErrorType.Unauthorized, "User is locked");
      } else if (!signInResult.Succeeded) {
        throw new ApiException(ApiErrorType.Forbidden, "User is not allowed");
      }

      ClaimsPrincipal res = await claimFactory.CreateAsync(user);
      var allClaims = new List<Claim>(res.Claims);

      allClaims.Add(new Claim("id", user.Id));
      allClaims.Add(new Claim("name", user.UserName));
      allClaims.Add(new Claim("username", user.UserName));
      allClaims.Add(new Claim("fullName", user.FullName));
      allClaims.Add(new Claim("jobTitle", nominee.JobTitle ?? ""));
      allClaims.Add(new Claim("address", nominee.Address ?? ""));
      allClaims.Add(new Claim("avatarImageUrl", $"{nominee.ProfileImage.FileUrl}?w=114&h=114&mode=stretch"));

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

      return Ok(token);
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout(
      [FromHeader] string authorization,
      [FromServices] SignInManager<AppUser> signinManager,
      [FromServices] IAuthTokenManager tokenManager) {

      if (string.IsNullOrEmpty(authorization)) {
        throw new ApiException(ApiErrorType.BadRequest, "No token provided");
      }

      await signinManager.SignOutAsync();
      await tokenManager.DeactivateAsync(authorization);

      return Ok();
    }

    [HttpPost]
    [SwaggerOperation("Refresh token, and discard the old one")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest tokenData) {
      return await Task.FromResult(Ok("done bardo ya bashaah"));
    }

  }
}