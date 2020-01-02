using System.Collections.Generic;
using System.Threading.Tasks;

namespace MIA.Middlewares.Auth {

  /// <summary>
  /// 
  /// </summary>
  public interface IAuthTokenManager {

    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
    Task<bool> IsCurrentActiveToken ();
    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
    Task DeactivateCurrentAsync ();
    /// <summary>
    /// 
    /// </summary>
    /// <param name="token"></param>
    /// <returns></returns>
    Task<bool> IsActiveAsync (string token);
    /// <summary>
    /// 
    /// </summary>
    /// <param name="token"></param>
    /// <returns></returns>
    Task DeactivateAsync (string token);
  }
}