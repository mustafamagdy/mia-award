using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MIA.Api.Base;
using MIA.Authorization.Entities;
using MIA.Dto.Auth;
using MIA.Exceptions;
using MIA.Infrastructure.Options;
using MIA.Middlewares;
using MIA.Models.Entities;
using MIA.ORMContext.Uow;
using MIA.TemplateParser;
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
using X.PagedList;

namespace MIA.Api {

#if (Versioning)
  [ApiVersion("1.0")]
#endif
  [Route("api/user")]
  public class AccountController : BaseApiController<AccountController> {
    private readonly IStringLocalizer<AccountController> _Locale;


    public AccountController(
      IMapper mapper,
      ILogger<AccountController> logger,
      IStringLocalizer<AccountController> _locale
    ) : base(logger, mapper) {
      this._Locale = _locale;
    }

    [HttpPost("nominee")]
    [SwaggerOperation("SignUp using email and password as nominee")]
    public async Task<IActionResult> SignupAsNominee(
      [FromHeader] string culture,
      [FromBody] SignUpByEmailRequest signupData,
      [FromServices] UserManager<AppUser> userManager,
      [FromServices] IEmailSender emailSender,
      [FromServices] ITemplateParser templateParser,
      [FromServices] IApiUrlHelper urlHelper,
      [FromServices] IAppUnitOfWork db
      ) {

      Nominee user = signupData.MapTo<Nominee>();
      IdentityResult result = await userManager.CreateAsync(user, signupData.Password);


      if (result.Succeeded) {
        _logger.LogInformation("User created a new account with password.");
        string token = await userManager.GenerateEmailConfirmationTokenAsync(user);
        string url = urlHelper.GetApiUrl();
        string callbackUrl = QueryHelpers.AddQueryString($"{url}/account/confirm",
          new Dictionary<string, string>() { { "userId", user.Id }, { "code", token }
          });

        string htmlMessage = await templateParser.LoadAndParse("verifyEmail", locale: culture, new UserEmailReviewDto {
          TokenLink = callbackUrl,
          FullName = user.FullName
        });

        //send confirmation email
        await emailSender.SendEmailAsync(user.Email, _Locale.Get(culture, "email_confirm_subject"), htmlMessage);

        //add to nominee role
        await userManager.AddToRoleAsync(user, PredefinedRoles.Nominee.ToString());

        //add user module for nominee
        var allowedModules = new[] { SystemModules.Nominee };
        var modules = allowedModules[0];
        for (int i = 1; i < allowedModules.Length; i++) {
          modules |= allowedModules[i];
        }

        //adds allowed modules for user
        await db.UserModules.AddAsync(new UserModule(user.Id, modules));

        return Ok();

      } else {
        _logger.LogError("Failed to create user ", string.Join(',', result.Errors.Select(x => x.Description)));
        throw new ApiException(ApiErrorType.BadRequest, result.Errors.MapTo<ErrorResult>());
      }
    }


    [HttpPost("mobile")]
    [SwaggerOperation("SignUp using email and password")]
    public async Task<IActionResult> CreateUserByMobile([FromBody] SignUpByMobileRequest mobileRequestData) {
      return Ok(await Task.FromResult("hab3tlk ya m3lm 3la " + mobileRequestData.MobileNumber));
    }


    [HttpPost("verifyEmail")]
    public async Task<IActionResult> VerifyEmail(
      [FromHeader] string culture,
      [FromBody] UserVerificationRequest userRequest,
      [FromServices] UserManager<AppUser> userManager,
      [FromServices] ITemplateParser templateParser,
      [FromServices] IEmailSender emailSender
    ) {

      AppUser user = await userManager.FindByIdAsync(userRequest.UserId);
      if (user != null) {
        IdentityResult result = await userManager.ConfirmEmailAsync(user, userRequest.Code);
        if (result.Succeeded) {
          string htmlMessage = await templateParser.LoadAndParse("welcome", locale: culture, new UserEmailReviewDto {
            FullName = user.FullName
          });

          await emailSender.SendEmailAsync(user.Email, _Locale.Get(culture, "welcome_email_subject"), htmlMessage);
          return Ok(user.Id);
        } else {
          throw new ApiException(ApiErrorType.BadRequest, result.Errors.MapTo<ErrorResult>());
        }
      } else {
        throw new ApiException(ApiErrorType.NotFound, "user not found");
      }
    }

    [HttpPost("forgotPassword")]
    public async Task<IActionResult> ForgotPassword(
      [FromHeader] string culture,
      [FromBody] ForgotPasswordRequest forgotPass,
      [FromServices] UserManager<AppUser> userManager,
      [FromServices] IEmailSender emailSender,
      [FromServices] ITemplateParser templateParser,
      [FromServices] IApiUrlHelper urlHelper) {

      AppUser user = await userManager.FindByEmailAsync(forgotPass.Email);
      if (user != null) {
        _logger.LogInformation($"User with email {forgotPass.Email } request password reset.");
        string token = await userManager.GeneratePasswordResetTokenAsync(user);
        string url = urlHelper.GetApiUrl();
        string callbackUrl = QueryHelpers.AddQueryString($"{url}/members/resetPassword",
          new Dictionary<string, string>() { { "userId", user.Id }, { "code", token }
          });

        string htmlMessage = await templateParser.LoadAndParse("forgotPassword", locale: culture, new UserEmailReviewDto {
          TokenLink = callbackUrl,
          FullName = user.FullName
        });

        await emailSender.SendEmailAsync(user.Email, _Locale.Get(culture, "reset_password_request_subject"), htmlMessage);
        return Ok();
      } else {
        throw new ApiException(ApiErrorType.NotFound, "User doesn't exist");
      }
    }

    [HttpPost("resetPassword")]
    public async Task<IActionResult> ResetPassword(
      [FromHeader] string culture,
      [FromBody] ResetPasswordRequest resetPassword,
      [FromServices] UserManager<AppUser> userManager,
      [FromServices] IEmailSender emailSender,
      [FromServices] ITemplateParser templateParser
      ) {

      AppUser user = await userManager.FindByIdAsync(resetPassword.UserId);
      if (user != null) {
        _logger.LogInformation($"Password has been reset for user {user.UserName}.");
        var result = await userManager.ResetPasswordAsync(user, resetPassword.Code, resetPassword.NewPassword);
        if (result.Succeeded) {

          string htmlMessage = await templateParser.LoadAndParse("passwordResetComplete", locale: culture, new UserEmailReviewDto {
            FullName = user.FullName
          });

          await emailSender.SendEmailAsync(user.Email, _Locale.Get(culture, "your_password_reset_subject"), htmlMessage);
          return Ok();
        } else {
          throw new ApiException(ApiErrorType.BadRequest, result.Errors.MapTo<ErrorResult>());
        }
      } else {
        throw new ApiException(ApiErrorType.NotFound, "user not found");
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
      [FromServices] ITemplateParser templateParser
      ) {

      var username = context.HttpContext?.User?.Identity?.Name;
      if (username == null) {
        throw new ApiException(ApiErrorType.Unauthorized, "Username not found");
      }

      var user = await userManager.FindByNameAsync(username);

      _logger.LogInformation($"Password has been changed for user {user.UserName}.");
      var result = await userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
      if (result.Succeeded) {

        string htmlMessage = await templateParser.LoadAndParse("passwordChangeComplete", locale: culture, new UserEmailReviewDto {
          FullName = user.FullName
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
      [FromServices]  IHttpContextAccessor context,
      [FromServices]  IAppUnitOfWork db,
      [FromServices] UserManager<AppUser> userManager
      ) {

      var username = context.HttpContext?.User?.Identity?.Name;
      if (username == null) {
        throw new ApiException(ApiErrorType.Unauthorized, "Username not found");
      }

      var user = await userManager.FindByNameAsync(username);
      var profile = _mapper.Map<UserProfileDto>(user);
      var userAvatar = db.UserImages.FirstOrDefault(a => a.UserId == user.Id);
      profile.AvatarImageUrl = userAvatar == null ? "" : $"/r/{userAvatar.Id}?w=114&h=114&mode=stretch";

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
        throw new ApiException(ApiErrorType.Unauthorized, "Username not found");
      }

      Nominee user = (Nominee)await userManager.FindByNameAsync(username);
      _mapper.Map(dto, user, typeof(UpdateUserProfileDto), typeof(Nominee));
      user.PhoneNumber = dto.PhoneNumber;
      user.FullName = dto.FullName;
      user.Email = dto.Email;
      user.JobTitle = dto.JobTitle;


      UserImage avatar = db.UserImages.FirstOrDefault(a => a.UserId == user.Id);
      if (dto.Avatar != null && dto.Avatar.Length > 0) {
        using (var memorySteam = new MemoryStream()) {
          dto.Avatar.CopyTo(memorySteam);

          string validationError = "";
          if (ValidateImage(limitOptions.Value, memorySteam, out validationError) == false) {
            throw new ApiException(ApiErrorType.BadRequest, validationError.MapTo<ErrorResult>());
          }

          if (avatar == null) {
            avatar = new UserImage { UserId = user.Id };
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
        result.AvatarImageUrl = $"/r/{avatar.Id}?w=114&h=114&mode=stretch";
      }

      return Ok(result);
    }


    [HttpPost("avatar")]
    [Authorize()]
    public async Task<IActionResult> UpdateUserAvatar(
     [FromServices] IHttpContextAccessor context,
     [FromServices] UserManager<AppUser> userManager,
     [FromServices] IAppUnitOfWork db,
     [FromServices] IOptions<UploadLimits> limitOptions,
     [FromServices] IHostingEnvironment env,
     [FromForm] UpdateUserAvatarDto dto
     ) {

      var username = context.HttpContext?.User?.Identity?.Name;
      if (username == null) {
        throw new ApiException(ApiErrorType.Unauthorized, "Username not found");
      }

      var user = await userManager.FindByNameAsync(username);

      UserImage avatar = db.UserImages.FirstOrDefault(a => a.UserId == user.Id);
      if (dto.Avatar != null && dto.Avatar.Length > 0) {
        using (var memorySteam = new MemoryStream()) {
          dto.Avatar.CopyTo(memorySteam);

          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            throw new ApiException(ApiErrorType.BadRequest, validationError.MapTo<ErrorResult>());
          }

          if (avatar == null) {
            avatar = new UserImage { UserId = user.Id };
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
        result.AvatarImageUrl = $"/r/{avatar.Id}?w=114&h=114&mode=stretch";
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