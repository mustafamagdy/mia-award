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
    public DbSet<Judge> Judges => base.Context.Set<Judge>();
    public DbSet<ContentReviewer> ContentReviewers => base.Context.Set<ContentReviewer>();
    public DbSet<Nominee> Nominees => base.Context.Set<Nominee>();
    public DbSet<ArtWork> ArtWorks => base.Context.Set<ArtWork>();
    public DbSet<ArtWorkPayment> ArtWorkPayments => base.Context.Set<ArtWorkPayment>();
    public DbSet<Award> Awards => base.Context.Set<Award>();
    public DbSet<Booth> Booths => base.Context.Set<Booth>();
    public DbSet<BoothPayment> BoothPayments => base.Context.Set<BoothPayment>();
    public DbSet<BoothPurchase> BoothPurchases => base.Context.Set<BoothPurchase>();
    public DbSet<JudgeAward> JudgeAwards => base.Context.Set<JudgeAward>();
    public DbSet<JudgeComment> JudgeComments => base.Context.Set<JudgeComment>();
    public DbSet<JudgeVote> JudgeVotes => base.Context.Set<JudgeVote>();
    public DbSet<MediaFile> MediaFiles => base.Context.Set<MediaFile>();
    public DbSet<News> News => base.Context.Set<News>();
    public DbSet<PhotoAlbum> PhotoAlbums => base.Context.Set<PhotoAlbum>();
    public DbSet<TrophyImage> TrophyImages => base.Context.Set<TrophyImage>();
    public DbSet<VotingCriteria> VotingCriterias => base.Context.Set<VotingCriteria>();

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