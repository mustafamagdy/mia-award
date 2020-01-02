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
using MIA.Dto.Auth;

namespace MIA.Administration.Api {
  /// <summary>
  /// User account operations controller
  /// </summary>
#if (Versioning)
  [ApiVersion("1.0")]
#endif
  [Route("api/user")]
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
      AppUser user = signupData.MapTo<AppUser>();
      IdentityResult result = await userManager.CreateAsync(user, signupData.Password);
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
              { "fullName", user.FirstName + " " + user.LastName }
            });

        await emailSender.SendEmailAsync(user.Email, _Locale["email_confirm_subject"], htmlMessage);
        return Ok();

      } else {
        _logger.LogError("Failed to create user ", string.Join(',', result.Errors.Select(x => x.Description)));
        return ValidationError(result.Errors);
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
          return ValidationError(result.Errors);
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
              { "fullName", user.FirstName + " " + user.LastName }
            });

        await emailSender.SendEmailAsync(user.Email, _Locale["reset_password_request_subject"], htmlMessage);
        return Ok();
      } else {
        return NotFound404("User doesn't exist");
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
              new Dictionary<string, string> { { "fullName", user.FirstName + " " + user.LastName }
              });

          await emailSender.SendEmailAsync(user.Email, _Locale["your_password_reset_subject"], htmlMessage);
          return Ok();
        } else {
          return ValidationError(result.Errors);
        }
      } else {
        return NotFound();
      }
    }



    [HttpPost("change-password")]
    [Authorize]
    public async Task<IActionResult> ChangePassword(
      [FromHeader] string culture,
      [FromServices]  IHttpContextAccessor context,
      [FromBody] ChangePasswordRequest dto,
      [FromServices] UserManager<AppUser> userManager,
      [FromServices] IEmailSender emailSender,
      [FromServices] ICultureEmailTemplateProvider emailTemplateProvider) {

      var username = context.HttpContext?.User?.Identity?.Name;
      if (username == null) {
        return Unauthorized401("Username not found");
      }

      var user = await userManager.FindByNameAsync(username);

      _logger.LogInformation($"Password has been changed for user {user.UserName}.");
      var result = await userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
      if (result.Succeeded) {

        string htmlMessage = await emailTemplateProvider
          .GetHtmlMessageAsync(culture,
            "passwordChangeComplete.html",
            new Dictionary<string, string> { { "fullName", user.FirstName + " " + user.LastName }
            });

        await emailSender.SendEmailAsync(user.Email, _Locale["your_password_changed_subject"], htmlMessage);
        return Ok();
      } else {
        return ValidationError(result.Errors);
      }

    }


    [HttpGet("profile")]
    [Authorize()]
    public async Task<IActionResult> Profile(
      [FromServices]  IHttpContextAccessor context,
      [FromServices] UserManager<AppUser> userManager
      ) {

      var username = context.HttpContext?.User?.Identity?.Name;
      if (username == null) {
        return Unauthorized401("Username not found");
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
     [FromServices]  IHttpContextAccessor context,
     [FromServices] UserManager<AppUser> userManager,
     [FromServices] IAppUnitOfWork db,
     [FromServices] IOptions<UploadLimits> limitOptions,
     [FromServices] IHostingEnvironment env,
     [FromForm] UpdateUserProfileDto dto
     ) {

      var username = context.HttpContext?.User?.Identity?.Name;
      if (username == null) {
        return Unauthorized401("Username not found");
      }

      var user = await userManager.FindByNameAsync(username);
      _mapper.Map(dto, user, typeof(UpdateUserProfileDto), typeof(AppUser));

      UserImage avatar = db.UserImages.FirstOrDefault(a => a.RefId == user.Id);
      if (dto.Avatar != null && dto.Avatar.Length > 0) {
        using (var memorySteam = new MemoryStream()) {
          dto.Avatar.CopyTo(memorySteam);

          string validationError = "";
          if (ValidateImage(limitOptions.Value, memorySteam, out validationError) == false) {
            return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
          }

          if (avatar == null) {
            avatar = new UserImage { RefId = user.Id };
            await db.UserImages.AddAsync(avatar);
          }
          avatar.Data = memorySteam.ToArray();
          //delete all images in disk with that Id if exists
          try {
            var imageDir = Path.Combine(env.WebRootPath, ImageProxyMiddleware.CACHED_IMAGE_DIR);
            var files = Directory.GetFiles(imageDir, $"{avatar.Id}*");
            foreach (var file in files) {
              System.IO.File.Delete(file);
            }
          } catch (Exception ex) {
            _logger.LogError(ex, "Failed to delete user images ");
          }
          user.AvatarImage = avatar;
        }
      }

      await userManager.UpdateAsync(user);
      var result = _mapper.Map<UserProfileDto>(user);
      if (avatar != null) {
        result.AvatarImageUrl = $"/r/{avatar.Id}";
      } else {
        //add placeholder
        //result.AvatarImageUrl = $"/r/0";
      }

      return Ok(result);
    }

    private bool ValidateImage(UploadLimits limis, MemoryStream content, out string validationError) {
      validationError = "";
      if (content == null) return true;

      if (content.Length / 1024 > limis.AllowedSizeInKB) {
        validationError = "File is too large";
        return false;
      }
      var i = System.Drawing.Image.FromStream(content);
      content.Seek(0, SeekOrigin.Begin);

      var validExt = limis.AllowedExt.Split(",");
      var validImage = false;
      validImage = validImage || validExt.Any(ext => {
        switch (ext) {
          case "png": return ImageFormat.Png.Equals(i.RawFormat);
          case "jpg": case "jpeg": return ImageFormat.Jpeg.Equals(i.RawFormat);
          case "gif": return ImageFormat.Gif.Equals(i.RawFormat);
          default:

            return false;
        }
      });

      if (!validImage)
        validationError = "Invlid file format";

      return validImage;
    }
  }
}