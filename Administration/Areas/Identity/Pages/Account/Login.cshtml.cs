﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using MIA.Models.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Administration.Areas.Identity.Pages.Account {
  [AllowAnonymous]
  public class LoginModel : PageModel {
    private readonly SignInManager<AppUser> _signInManager;
    private readonly UserManager<AppUser> _userManager;
    private readonly ILogger<LoginModel> _logger;

    public LoginModel(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, ILogger<LoginModel> logger) {
      _signInManager = signInManager;
      _userManager = userManager;
      _logger = logger;
    }

    [BindProperty]
    public InputModel Input { get; set; }

    public IList<AuthenticationScheme> ExternalLogins { get; set; }

    public string ReturnUrl { get; set; }

    [TempData]
    public string ErrorMessage { get; set; }

    public class InputModel {
      [Required]
      //[UserNameAddress]
      public string UserName { get; set; }

      [Required]
      [DataType(DataType.Password)]
      public string Password { get; set; }

      [Display(Name = "Remember me?")]
      public bool RememberMe { get; set; }
    }

    public async Task OnGetAsync(string returnUrl = null) {
      if (!string.IsNullOrEmpty(ErrorMessage)) {
        ModelState.AddModelError(string.Empty, ErrorMessage);
      }

      returnUrl = returnUrl ?? Url.Content("~/");

      // Clear the existing external cookie to ensure a clean login process
      await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

      ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

      ReturnUrl = returnUrl;
    }

    public async Task<IActionResult> OnPostAsync(string returnUrl = null) {
        returnUrl = returnUrl ?? Url.Content("~/");

      if (ModelState.IsValid) {

        //var user = await _userManager.FindByUserNameAsync(Input.UserName);
        //if (user == null) {
        //  _logger.LogWarning("user is found.");
        //  ModelState.AddModelError(string.Empty, "User is not found.");
        //  return Page();
        //}

        //if (!user.Enabled) {
        //  _logger.LogWarning("user is not allowed yet.");
        //  ModelState.AddModelError(string.Empty, "User is not allowed.");
        //  return Page();
        //}

        // This doesn't count login failures towards account lockout
        // To enable password failures to trigger account lockout, set lockoutOnFailure: true
        var result = await _signInManager.PasswordSignInAsync(Input.UserName, Input.Password,
            false, false);
        if (result.Succeeded) {
          _logger.LogInformation("User logged in.");
          return LocalRedirect(returnUrl);
        }
        if (result.RequiresTwoFactor) {
          return RedirectToPage("./LoginWith2fa", new { ReturnUrl = returnUrl, RememberMe = Input.RememberMe });
        }
        if (result.IsLockedOut) {
          _logger.LogWarning("User account locked out.");
          return RedirectToPage("./Lockout");
        } else {
          ModelState.AddModelError(string.Empty, "Invalid login attempt.");
          return Page();
        }
      }

      // If we got this far, something failed, redisplay form
      return Page();
    }
  }
}
