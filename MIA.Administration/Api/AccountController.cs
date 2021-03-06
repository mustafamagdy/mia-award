using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MIA.Infrastructure.Options;
using MIA.Models.Entities;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Annotations;
using MIA.Providers;
using X.PagedList;
using MIA.Administration.Middlewares;
using MIA.Api.Base;
using MIA.Authorization.Entities;
using MIA.Dto.Auth;
using MIA.Exceptions;
using MIA.Infrastructure;

namespace MIA.Administration.Api {
  /// <summary>
  /// User account operations controller
  /// </summary>
#if (Versioning)
  [ApiVersion("1.0")]
#endif
  [Route("api/user")]
  [Authorize]
  public class AccountController : BaseApiController<AccountController> {
    private readonly IStringLocalizer<AccountController> _Locale;

    /// <summary>
    /// 
    /// </summary>
    /// <param name="mapper"></param>
    /// <param name="logger"></param>
    /// <param name="_locale"></param>
    public AccountController(
      IMapper mapper,
      ILogger<AccountController> logger,
      IStringLocalizer<AccountController> _locale
    ) : base(logger, mapper) {
      this._Locale = _locale;
    }

    /// <summary>
    /// SignUp using email and password
    /// </summary>
    /// <param name="culture"></param>
    /// <param name="signupData"></param>
    /// <param name="userManager"></param>
    /// <param name="emailSender"></param>
    /// <param name="emailTemplateProvider"></param>
    /// <param name="urlHelper"></param>
    /// <returns></returns>
    [HttpPost("CreateByEmail")]
    [SwaggerOperation("SignUp using email and password")]
    public async Task<IActionResult> CreateByEmail(
      [FromHeader] string culture,
      [FromBody] SignUpByEmailRequest signupData,
      [FromServices] UserManager<AppUser> userManager,
      [FromServices] IEmailSender emailSender,
      [FromServices] ICultureEmailTemplateProvider emailTemplateProvider,
      [FromServices] IApiUrlHelper urlHelper) {

      AppUser user = null;
      IdentityResult result = null;
      if (string.IsNullOrEmpty(signupData.UserType)
          || (signupData.UserType.ToLower() != PredefinedRoles.Judge.ToString().ToLower()
          && signupData.UserType.ToLower() != PredefinedRoles.Nominee.ToString().ToLower())) {
        user = signupData.MapTo<AppUser>();
        user.ProfileImage = S3File.FromKeyAndUrl("", "");
        result = await userManager.CreateAsync(user, signupData.Password);
      } else if (signupData.UserType.ToLower() == PredefinedRoles.Judge.ToString().ToLower()) {
        var judge = signupData.MapTo<Judge>();
        judge.ProfileImage = S3File.FromKeyAndUrl("", "");
        result = await userManager.CreateAsync(judge, signupData.Password);
        user = judge;
      } else if (signupData.UserType.ToLower() == PredefinedRoles.Nominee.ToString().ToLower()) {
        var nominee = signupData.MapTo<Nominee>();
        nominee.ProfileImage = S3File.FromKeyAndUrl("", "");
        result = await userManager.CreateAsync(nominee, signupData.Password);
        user = nominee;
      }

      if (result.Succeeded) {
        _logger.LogInformation("User created a new account with password.");
        string token = await userManager.GenerateEmailConfirmationTokenAsync(user);
        string url = urlHelper.GetApiUrl();
        string callbackUrl = QueryHelpers.AddQueryString($"{url}/account/confirm",
          new Dictionary<string, string>() { { "userId", user.Id }, { "code", token }
          });

        string htmlMessage = await emailTemplateProvider
          .GetHtmlMessageAsync(culture,
            "verifyEmail.html",
            new Dictionary<string, string> { { "token_link", callbackUrl },
              { "fullName", user.FullName}
            });

        // await emailSender.SendEmailAsync(user.Email, _Locale.Get(culture,"email_confirm_subject"), htmlMessage);
        return Ok(user);

      } else {
        _logger.LogError("Failed to create user ", string.Join(',', result.Errors.Select(x => x.Description)));
        throw new ApiException(ApiErrorType.BadRequest, result.Errors.MapTo<ErrorResult>());
      }
    }

    /// <summary>
    /// SignUp using email and password
    /// </summary>
    /// <param name="mobileRequestData"></param>
    /// <returns></returns>
    [HttpPost("mobile")]
    [SwaggerOperation("SignUp using email and password")]
    public async Task<IActionResult> CreateUserByMobile([FromBody] SignUpByMobileRequest mobileRequestData) {
      return Ok(await Task.FromResult("hab3tlk ya m3lm 3la " + mobileRequestData.MobileNumber));
    }

    /// <summary>
    /// Verify user email using the verification token sent by email
    /// </summary>
    /// <param name="culture"></param>
    /// <param name="userRequest"></param>
    /// <param name="userManager"></param>
    /// <param name="emailSender"></param>
    /// <param name="emailTemplateProvider"></param>
    /// <returns></returns>
    public async Task<IActionResult> VerifyEmail(
      [FromHeader] string culture,
      [FromBody] UserVerificationRequest userRequest,
      [FromServices] UserManager<AppUser> userManager,
      [FromServices] IEmailSender emailSender,
      [FromServices] ICultureEmailTemplateProvider emailTemplateProvider
    ) {

      AppUser user = await userManager.FindByIdAsync(userRequest.UserId);
      if (user != null) {
        IdentityResult result = await userManager.ConfirmEmailAsync(user, userRequest.Code);
        if (result.Succeeded) {
          //todo: send welcome email

          //todo: should we sign in here ?
          return Ok(user.Id);
        } else {
          throw new ApiException(ApiErrorType.BadRequest, result.Errors.MapTo<ErrorResult>());
        }
      } else {
        return NotFound(user);
      }
    }

    /// <summary>
    /// Reset password reset email with token
    /// </summary>
    /// <param name="culture"></param>
    /// <param name="forgotPass"></param>
    /// <param name="userManager"></param>
    /// <param name="emailSender"></param>
    /// <param name="emailTemplateProvider"></param>
    /// <param name="urlHelper"></param>
    /// <returns></returns>
    public async Task<IActionResult> ForgotPassword(
      [FromHeader] string culture,
      [FromBody] ForgotPasswordRequest forgotPass,
      [FromServices] UserManager<AppUser> userManager,
      [FromServices] IEmailSender emailSender,
      [FromServices] ICultureEmailTemplateProvider emailTemplateProvider,
      [FromServices] IApiUrlHelper urlHelper) {

      AppUser user = await userManager.FindByEmailAsync(forgotPass.Email);
      if (user != null) {
        _logger.LogInformation($"User with email {forgotPass.Email } request password reset.");
        string token = await userManager.GeneratePasswordResetTokenAsync(user);
        string url = urlHelper.GetApiUrl();
        string callbackUrl = QueryHelpers.AddQueryString($"{url}/account/resetPassword",
          new Dictionary<string, string>() { { "userId", user.Id }, { "code", token }
          });

        string htmlMessage = await emailTemplateProvider
          .GetHtmlMessageAsync(culture,
            "forgotPassword.html",
            new Dictionary<string, string> { { "token_link", callbackUrl },
              { "fullName", user.FullName}
            });

        await emailSender.SendEmailAsync(user.Email, _Locale.Get(culture, "reset_password_request_subject"), htmlMessage);
        return Ok();
      } else {
        throw new ApiException(ApiErrorType.NotFound, "User doesn't exist");
      }
    }

    /// <summary>
    /// Reset password for user using token
    /// </summary>
    /// <param name="culture"></param>
    /// <param name="resetPassword"></param>
    /// <param name="userManager"></param>
    /// <param name="emailSender"></param>
    /// <param name="emailTemplateProvider"></param>
    /// <returns></returns>
    public async Task<IActionResult> ResetPassword(
      [FromHeader] string culture,
      [FromBody] ResetPasswordRequest resetPassword,
      [FromServices] UserManager<AppUser> userManager,
      [FromServices] IEmailSender emailSender,
      [FromServices] ICultureEmailTemplateProvider emailTemplateProvider) {

      AppUser user = await userManager.FindByIdAsync(resetPassword.UserId);
      if (user != null) {
        _logger.LogInformation($"Password has been reset for user {user.UserName}.");
        var result = await userManager.ResetPasswordAsync(user, resetPassword.Code, resetPassword.NewPassword);
        if (result.Succeeded) {

          string htmlMessage = await emailTemplateProvider
            .GetHtmlMessageAsync(culture,
              "passwordResetComplete.html",
              new Dictionary<string, string> { { "fullName", user.FullName }
              });

          await emailSender.SendEmailAsync(user.Email, _Locale.Get(culture, "your_password_reset_subject"), htmlMessage);
          return Ok();
        } else {
          throw new ApiException(ApiErrorType.BadRequest, result.Errors.MapTo<ErrorResult>());
        }
      } else {
        return NotFound();
      }
    }



    [HttpPost("change-password")]
    [Authorize]
    public async Task<IActionResult> ChangePassword(
      [FromHeader] string culture,
      [FromServices] IHttpContextAccessor context,
      [FromBody] ChangePasswordRequest dto,
      [FromServices] UserManager<AppUser> userManager,
      [FromServices] IEmailSender emailSender,
      [FromServices] ICultureEmailTemplateProvider emailTemplateProvider) {

      var username = context.HttpContext?.User?.Identity?.Name;
      if (username == null) {
        throw new ApiException(ApiErrorType.Unauthorized, "Username not found");
      }

      var user = await userManager.FindByNameAsync(username);

      _logger.LogInformation($"Password has been changed for user {user.UserName}.");
      var result = await userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
      if (result.Succeeded) {

        string htmlMessage = await emailTemplateProvider
          .GetHtmlMessageAsync(culture,
            "passwordChangeComplete.html",
            new Dictionary<string, string> { { "fullName", user.FullName }
            });

        await emailSender.SendEmailAsync(user.Email, _Locale.Get(culture, "your_password_changed_subject"), htmlMessage);
        return Ok();
      } else {
        throw new ApiException(ApiErrorType.BadRequest, result.Errors.MapTo<ErrorResult>());
      }

    }


    [HttpGet("profile")]
    [Authorize()]
    public async Task<IActionResult> Profile(
      [FromServices] IHttpContextAccessor context,
      [FromServices] UserManager<AppUser> userManager
      ) {

      var username = context.HttpContext?.User?.Identity?.Name;
      if (username == null) {
        throw new ApiException(ApiErrorType.Unauthorized, "Username not found");
      }

      var user = await userManager.FindByNameAsync(username);
      var profile = _mapper.Map<UserProfileDto>(user);

      return IfFound(profile);
    }

    //if you want to hard code this use this attribute
    //[RequestSizeLimit(1024*1024*30)]
    [HttpPost("profile")]
    [Authorize()]
    public async Task<IActionResult> UpdateProfile(
     [FromServices] IHttpContextAccessor context,
     [FromServices] UserManager<AppUser> userManager,
     [FromServices] IS3FileManager fileManager,
     [FromServices] IOptions<UploadLimits> limitOptions,
     [FromServices] IHostingEnvironment env,
     [FromForm] UpdateUserProfileDto dto
     ) {

      var username = context.HttpContext?.User?.Identity?.Name;
      if (username == null) {
        throw new ApiException(ApiErrorType.Unauthorized, "Username not found");
      }

      var user = await userManager.FindByNameAsync(username);
      _mapper.Map(dto, user, typeof(UpdateUserProfileDto), typeof(AppUser));

      user.ProfileImage = await SaveUserAvatar(fileManager, user.Id, dto);

      await userManager.UpdateAsync(user);
      var result = _mapper.Map<UserProfileDto>(user);
      result.AvatarImageUrl = user.ProfileImage.FileUrl;

      return Ok(result);
    }


    [HttpPost("avatar")]
    [Authorize()]
    public async Task<IActionResult> UpdateUserAvatar(
     [FromServices] IHttpContextAccessor context,
     [FromServices] UserManager<AppUser> userManager,
     [FromServices] IS3FileManager fileManager,
     [FromServices] IOptions<UploadLimits> limitOptions,
     [FromServices] IHostingEnvironment env,
     [FromForm] UpdateUserAvatarDto dto
     ) {

      var username = context.HttpContext?.User?.Identity?.Name;
      if (username == null) {
        throw new ApiException(ApiErrorType.Unauthorized, "Username not found");
      }

      var user = await userManager.FindByNameAsync(username);
      user.ProfileImage = await SaveUserAvatar(fileManager, user.Id, dto);


      await userManager.UpdateAsync(user);
      var result = _mapper.Map<UserProfileDto>(user);
      result.AvatarImageUrl = user.ProfileImage.FileUrl;

      return Ok(result);
    }
    private async Task<S3File> SaveUserAvatar(IS3FileManager fileManager, string userId,
      UpdateUserAvatarDto dto) {
      if (!string.IsNullOrEmpty(dto.AvatarFileName) && dto.Avatar != null && dto.Avatar.Length > 0) {
        var avatarFileKey = fileManager.GenerateFileKeyForResource(ResourceType.Users,
          userId, $"{userId}_avatar" + dto.AvatarFileName.GetFileExt());
        return S3File.FromKeyAndUrl(avatarFileKey, await fileManager.UploadFileAsync(dto.Avatar, avatarFileKey));
      }
      return null;
    }

  }
}