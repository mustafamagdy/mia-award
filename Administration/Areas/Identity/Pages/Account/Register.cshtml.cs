using System.ComponentModel.DataAnnotations;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using MIA.Models.Entities;
using MIA.ORMContext;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;

namespace Administration.Areas.Identity.Pages.Account {
  [Authorize(Roles = Constants.ADMIN_ROLE)]
  public class RegisterModel : PageModel {
    private readonly SignInManager<AppUser> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<AppUser> _userManager;
    private readonly ILogger<RegisterModel> _logger;
    private readonly IEmailSender _emailSender;

    public RegisterModel(
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        RoleManager<IdentityRole> roleManager,
        ILogger<RegisterModel> logger,
        IEmailSender emailSender) {
      _userManager = userManager;
      _signInManager = signInManager;
      this._roleManager = roleManager;
      _logger = logger;
      _emailSender = emailSender;
    }

    [BindProperty]
    public InputModel Input { get; set; }

    public string ReturnUrl { get; set; }
    public SelectListItem[] Roles { get; set; } = new SelectListItem[] {
        //new SelectListItem { Text = Constants.AGENTS_ROLE, Value = Constants.AGENTS_ROLE },
        //new SelectListItem { Text = Constants.FINANCE_ROLE, Value = Constants.FINANCE_ROLE}
      };

    public class InputModel {
      [Required]
      [StringLength(100)]
      [Display(Name = "FirstName")]
      public string FirstName { get; set; }

      [Required]
      [StringLength(100)]
      [Display(Name = "LastName")]
      public string LastName { get; set; }

      [Required]
      [EmailAddress]
      [Display(Name = "Email")]
      public string Email { get; set; }

      [Required]
      [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
      [DataType(DataType.Password)]
      [Display(Name = "Password")]
      public string Password { get; set; }

      [DataType(DataType.Password)]
      [Display(Name = "Confirm password")]
      [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
      public string ConfirmPassword { get; set; }

      [DataType(DataType.PhoneNumber)]
      [Display(Name = "Phone Number")]
      [Compare("PhoneNumber", ErrorMessage = "The password and confirmation password do not match.")]
      public string PhoneNumber { get; set; }


      [Required]
      [Display(Name = "Role")]
      public string Role { get; set; }

    }

    public void OnGet(string returnUrl = null) {

      ReturnUrl = returnUrl;
    }

    //[Route("admin/create-user")]
    public async Task<IActionResult> OnPostAsync(string returnUrl = null) {
      returnUrl = returnUrl ?? Url.Content("~/users");
      if (ModelState.IsValid) {
        var user = new AppUser {
          FirstName = Input.FirstName,
          LastName = Input.LastName,
          PhoneNumber = Input.PhoneNumber,
          UserName = Input.Email,
          Email = Input.Email,
          //Enabled = true
        };

        var role = await _roleManager.FindByNameAsync(Input.Role);
        if (role == null) {
          ModelState.AddModelError("Role", "Role not found");
          return Page();
        }

        var result = await _userManager.CreateAsync(user, Input.Password);
        if (result.Succeeded) {
          _logger.LogInformation("User created a new account with password.");

          var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
          var callbackUrl = Url.Page(
              "/Account/ConfirmEmail",
              pageHandler: null,
              values: new { userId = user.Id, code = code },
              protocol: Request.Scheme);

          await _emailSender.SendEmailAsync(Input.Email, "Confirm your email",
              $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

          await _userManager.AddToRoleAsync(user, Input.Role);
          //await _signInManager.SignInAsync(user, isPersistent: false);
          //return LocalRedirect(returnUrl);
          return LocalRedirect("/users");

        }
        foreach (var error in result.Errors) {
          ModelState.AddModelError(string.Empty, error.Description);
        }
      }

      // If we got this far, something failed, redisplay form
      return Page();
    }
  }
}
