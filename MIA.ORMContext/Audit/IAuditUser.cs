using MIA.Models.Entities;
using System.Threading.Tasks;

namespace MIA.ORMContext {
  public interface IAuditUser {
    string CurrentUsername();
    Task<AppUser> CurrentUserAsync();
  }
}