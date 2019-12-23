using MIA.Authorization;
using MIA.Authorization.Context;
using MIA.Authorization.Entities;
using MIA.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MIA.ORMContext.Uow {
  public interface IAppUnitOfWork :
      IUnitOfWork<AppDbContext>,
      IPermissionsDbContext<string, IdentityUserRole<string>, AppRole> {

    DbSet<AppUser> Users { get; }
    DbSet<UserModule> UserModules { get; }
    DbSet<Image> Images { get; }
    DbSet<UserImage> UserImages { get; }
  }
}