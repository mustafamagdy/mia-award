using Administration.Controllers.Base;
using Administration.Extensions;
using MIA.Authorization.Entities;
using MIA.Models.Entities;
using MIA.ORMContext;
using MIA.ORMContext.Seed;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Administration
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.Configure<CookiePolicyOptions>(options =>
      {
        // This lambda determines whether user consent for non-essential cookies is needed for a given request.
        options.CheckConsentNeeded = context => true;
        options.MinimumSameSitePolicy = SameSiteMode.None;
      })
       .AddSingleton<IHttpContextAccessor, HttpContextAccessor>()
       .AddAuthorization()
       .AddHttpContextAccessor()
        // Add useful interface for accessing the ActionContext outside a controller.
        .AddSingleton<IActionContextAccessor, ActionContextAccessor>()
       //access current username, and userid for audit purpose
       .AddScoped<IAuditUser, AuditUserResolver>()

       .AddAppDbContext(this.Configuration)
        //Adding asp.net core identity with configuration
        .AddIdentity<AppUser, AppRole>(opt =>
        {

        })
        .AddEntityFrameworkStores<AppDbContext>()
        .AddDefaultUI(Microsoft.AspNetCore.Identity.UI.UIFramework.Bootstrap4)
        .AddDefaultTokenProviders()
        .Services
        .AddMvcWithOptions();
      services.AddMemoryCache();
      services.AddSession();
      services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app,
      UserManager<AppUser> userManager,
      RoleManager<AppRole> roleManager,
      IAppUnitOfWork db,
      IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseDatabaseErrorPage();
      }
      else
      {
        app.UseExceptionHandler("/Home/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      //Run pending db migrations
      app.UpdateDatabase();

      app.UseHttpsRedirection();

      app.UseAuthentication();

      app.UseStaticFiles();

      app.UseMvc(routes =>
      {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
      });
      app.UseSession();
      app.UseCookiePolicy();

      //seed default data
      DbInitializer.SeedDbAsync(userManager, roleManager, db).Wait();
    }
  }
}
