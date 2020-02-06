using MIA.Models.Entities;
using System.Threading.Tasks;

namespace MIA.ORMContext {
  public interface IUserResolver {
    string CurrentUsername();
    Task<AppUser> CurrentUserAsync();
  }
}