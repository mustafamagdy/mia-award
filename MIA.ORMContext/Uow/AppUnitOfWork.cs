using System.Collections.Generic;
using MIA.Authorization.Entities;
using MIA.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MIA.ORMContext.Uow {
  public class AppUnitOfWork : UnitOfWork<AppDbContext>, IAppUnitOfWork {

    public AppUnitOfWork(AppDbContext dbContext, IAuditUser auditUser) : base(dbContext, auditUser) {
    }


    public DbSet<AppUser> Users => base.Context.Set<AppUser>();
    public DbSet<UserImage> UserImages => base.Context.Set<UserImage>();
    public DbSet<UserModule> UserModules => base.Context.Set<UserModule>();
    public DbSet<Image> Images => base.Context.Set<Image>();

    public TEntity Find<TEntity>(params object[] keys) where TEntity : class => base.Context.Find<TEntity>(keys);
    public void RemoveRange<TEntity>(List<TEntity> entities) where TEntity : class => base.Context.RemoveRange(entities);
    public void Remove<TEntity>(TEntity entity) where TEntity : class => base.Context.Remove(entity);

    public DbSet<IdentityUserRole<string>> UserRoles {
      get => ((AppDbContext)Context).UserRoles;
      set => ((AppDbContext)Context).UserRoles = value;
    }
    public DbSet<AppRole> Roles {
      get => ((AppDbContext)Context).Roles;
      set => ((AppDbContext)Context).Roles = value;
    }

    public DbSet<UserModule> ModulesForUsers => base.Context.Set<UserModule>();
  }
}