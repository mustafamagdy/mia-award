namespace MIA.Administration.Api.Base {
  using System.Security.Claims;
  using System.Threading.Tasks;
  using MIA.Models.Entities;
  using MIA.ORMContext;
  using Microsoft.AspNetCore.Http;
  using Microsoft.AspNetCore.Identity;

  /// <summary>
  /// Get the current User, Id, and name
  /// </summary>
  public sealed class AuditUserResolver : IAuditUser {
    private readonly IHttpContextAccessor _context;
    private readonly UserManager<AppUser> _userManager;

    /// <summary>
    /// Initialize with <see cref="IHttpContextAccessor"/> and <see cref="UserManager{AppUser}"/>
    /// </summary>
    /// <param name="context"></param>
    /// <param name="userManager"></param>
    public AuditUserResolver(IHttpContextAccessor context, UserManager<AppUser> userManager) {
      this._userManager = userManager;
      this._context = context;
    }

    /// <summary>
    /// Get current username if exist
    /// </summary>
    /// <returns></returns>
    public string CurrentUsername() => _context.HttpContext?.User?.Identity?.Name;

   
    /// <summary>
    /// Get current logged in user 
    /// </summary>
    /// <returns></returns>
    public async Task<AppUser> CurrentUserAsync() => await _userManager.FindByNameAsync(CurrentUsername());

  }
}