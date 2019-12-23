using System.Linq;
using System.Threading.Tasks;
using MIA.Infrastructure.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;


/*
 Read this before judge this technique:
 I've chosen to save only deactivated tokens (logged off user tokens) for the following reasons:
 1- this is more secure, as we should not save tokens for users, 
    in case of server has been compromise, those token will be a disaster, so don't store those token on server ever.
 2- minimize the validation step, because jwt tokens are self validated, we don't need to validate them further, 
    however, we need to validate deactivated ones, and as there is no way in jwt to store this information we need
    to store it locally

 This way will ONLY work if you implement persisted cache, if you store this in memory only, when server restarts all
 deactivated jwt tokens will become valid, and there is no way to prevent that. So keep that in mind,

 If you will use Redis, make sure you implement AOF, and RDB snapshot to make sure it persist those cached tokens
   */
namespace MIA.Middlewares.Auth {
  /// <summary>
  /// 
  /// </summary>
  public class AuthTokenManager : IAuthTokenManager {
    private readonly IDistributedCache _cache;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly JwtOptions _jwtOptions;
    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="cache"></param>
    /// <param name="httpContextAccessor"></param>
    /// <param name="jwtOptions"></param>
    public AuthTokenManager(IDistributedCache cache,
      IHttpContextAccessor httpContextAccessor,
      IOptions<JwtOptions> jwtOptions) {
      this._cache = cache;
      this._httpContextAccessor = httpContextAccessor;
      this._jwtOptions = jwtOptions.Value;
    }

    /// <summary>
    /// check if the current token is not deactivated
    /// </summary>
    /// <returns></returns>
    public async Task<bool> IsCurrentActiveToken() => await IsActiveAsync(GetCurrentToken());

    /// <summary>
    /// deactivate current token
    /// </summary>
    /// <returns></returns>
    public async Task DeactivateCurrentAsync() => await DeactivateAsync(GetCurrentToken());

    /// <summary>
    /// check if token is active
    /// </summary>
    /// <param name="token"></param>
    /// <returns></returns>
    public async Task<bool> IsActiveAsync(string token) {
#if (RedisCache)
      try {
        var tokenExist = await _cache.GetStringAsync(GetKey(token)) == null;
        return tokenExist;
      } catch (RedisConnectionException ex) {
        if (_jwtOptions.ThrowIfCacheNotAvailable) {
          throw new RedisNotRunningException(ex);
        } else return true;
      }
#else
      return true;
#endif
    }

    /// <summary>
    /// deactivate token
    /// </summary>
    /// <param name="token"></param>
    /// <returns></returns>
    public async Task DeactivateAsync(string token) {
#if (RedisCache)

      await _cache.SetStringAsync(GetKey(token),
      " ", new DistributedCacheEntryOptions {
        AbsoluteExpirationRelativeToNow =
          TimeSpan.FromDays(_jwtOptions.ExpireInHours)
      });
#endif
    }

    private string GetCurrentToken() {
      var authorizationHeader = _httpContextAccessor
        .HttpContext.Request.Headers["authorization"];

      return authorizationHeader == StringValues.Empty ?
        string.Empty :
        authorizationHeader.Single().Split(" ").Last();
    }

    private static string GetKey(string token) => $"tokens:{token}:deactivated";
  }
}