using MIA.Authorization;
using MIA.Authorization.Entities;
using MIA.Authorization.Policy;
using Microsoft.AspNetCore.Authorization;

namespace MIA.Extensions {
  using System.IdentityModel.Tokens.Jwt;
  using System.Text;
  using System;
  using MIA.Infrastructure.Options;
  using MIA.Models.Entities;
  using MIA.ORMContext;
  using Microsoft.AspNetCore.Authentication.JwtBearer;
  using Microsoft.AspNetCore.Hosting;
  using Microsoft.AspNetCore.Identity;
  using Microsoft.Extensions.DependencyInjection;
  using Microsoft.Extensions.Options;
  using Microsoft.IdentityModel.Tokens;
  using MIA.Middlewares.Auth;

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
    public static IServiceCollection AddIdentityWithJwt (this IServiceCollection services, IHostingEnvironment env) {
      IOptions<JwtOptions> jwtConfig = services.BuildServiceProvider ().GetRequiredService<IOptions<JwtOptions>> ();
      JwtOptions jwtOptions = jwtConfig.Value;

      //Adding asp.net core identity with configuration
      services.AddIdentity<AppUser, AppRole> ()
        .AddEntityFrameworkStores<AppDbContext> ()
        .AddDefaultTokenProviders ();

      //deactivated authentication token validators
      services.AddTransient<AuthTokenManagerMiddleware> ()
        .AddTransient<IAuthTokenManager, AuthTokenManager> ();

      //todo: change these settings
      services.Configure<IdentityOptions> (options => {
        // Lockout settings.
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes (5);
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.AllowedForNewUsers = true;

        // Password settings.
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireNonAlphanumeric = true;
        options.Password.RequireUppercase = false;
        options.Password.RequiredLength = 4;
        options.Password.RequiredUniqueChars = 0;

        // SignIn settings.
        options.SignIn.RequireConfirmedEmail = false;
        options.SignIn.RequireConfirmedPhoneNumber = false;

        // User settings.
        options.User.AllowedUserNameCharacters =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
        options.User.RequireUniqueEmail = true;
      });

      JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear (); // => remove default claims
      services
        .AddAuthentication (options => {
          options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
          options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
          options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

        })
        .AddJwtBearer (cfg => {
          //only disable require HTTPS for authorization metadata on development
          cfg.RequireHttpsMetadata = !env.IsDevelopment ();
          cfg.SaveToken = true;
          cfg.TokenValidationParameters = new TokenValidationParameters {
            ValidIssuer = jwtOptions.Issuer,
            ValidAudience = jwtOptions.Audience,
            IssuerSigningKey = new SymmetricSecurityKey (Encoding.UTF8.GetBytes (jwtOptions.SecretKey)),
            ClockSkew = TimeSpan.Zero // remove delay of token when expire
          };
        });
    
      return services;
    }

  }
}