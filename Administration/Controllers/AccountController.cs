using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Administration.Models;
using MIA.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Administration.Controllers
{
    public class AccountController : Controller
    {
        private UserManager<AppUser> _userManager { get; }
        private SignInManager<AppUser> _signInManager { get; }
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;

        }
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login([FromForm] LoginRequest loginData)
        { 
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(loginData.UserName, loginData.Password, false, false);
                if (result.Succeeded)
                    return RedirectToAction("Index", "Home");
                else
                    ViewBag.Result = "Result is: " + result.ToString();
            }
            return View();
        }
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Login", "Account");
        }

    }
}