using System;
using System.Collections.Generic;
using MIA.Authorization.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MIA.Authorization.Context {

  public interface IPermissionsDbContext<TKey, TUserRole, TRole>
    where TKey : IEquatable<TKey>
    where TUserRole : IdentityUserRole<TKey>
    where TRole : AppRole {
    TEntity Find<TEntity>(params object[] keys) where TEntity : class;
    void RemoveRange<TEntity>(List<TEntity> entities) where TEntity : class;
    void Remove<TEntity>(TEntity entity) where TEntity : class;

    DbSet<TUserRole> UserRoles { get; set; }
    DbSet<TRole> Roles { get; set; }

    DbSet<UserModule> UserModules { get; }
  }
}
