using System.Collections.Generic;
using MIA.Authorization.Entities;
using MIA.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MIA.ORMContext.Uow {
  public class AppUnitOfWork : UnitOfWork<AppDbContext>, IAppUnitOfWork {

    public AppUnitOfWork(AppDbContext dbContext, IUserResolver auditUser) : base(dbContext, auditUser) {
    }


    public DbSet<AppUser> Users => base.Context.Set<AppUser>(); 
    public DbSet<Content> Contents => base.Context.Set<Content>(); 
    public DbSet<UserImage> UserImages => base.Context.Set<UserImage>();
    public DbSet<UserModule> UserModules => base.Context.Set<UserModule>();
    public DbSet<Image> Images => base.Context.Set<Image>();
    public DbSet<Judge> Judges => base.Context.Set<Judge>();
    public DbSet<ContentReviewer> ContentReviewers => base.Context.Set<ContentReviewer>();
    public DbSet<Nominee> Nominees => base.Context.Set<Nominee>();
    public DbSet<ArtWork> ArtWorks => base.Context.Set<ArtWork>();
    public DbSet<ArtWorkPayment> ArtWorkPayments => base.Context.Set<ArtWorkPayment>();
    public DbSet<ArtworkAward> ArtworkAwards => base.Context.Set<ArtworkAward>();
    public DbSet<ContestantAward> ContestantAwards => base.Context.Set<ContestantAward>();
    public DbSet<Booth> Booths => base.Context.Set<Booth>();
    public DbSet<BoothPayment> BoothPayments => base.Context.Set<BoothPayment>();
    public DbSet<BoothPurchase> BoothPurchases => base.Context.Set<BoothPurchase>();
    public DbSet<JudgeArtworkAward> JudgeArtworkAwards => base.Context.Set<JudgeArtworkAward>();
    public DbSet<JudgeContestantAward> JudgeContestantAwards => base.Context.Set<JudgeContestantAward>();
    public DbSet<JudgeComment> JudgeComments => base.Context.Set<JudgeComment>();
    public DbSet<ArtworkJudgeVote> ArtworkVotes => base.Context.Set<ArtworkJudgeVote>();
    public DbSet<ContestantJudgeVote> ContestantVotes => base.Context.Set<ContestantJudgeVote>();
    public DbSet<MediaFile> MediaFiles => base.Context.Set<MediaFile>();
    public DbSet<News> News => base.Context.Set<News>();
    public DbSet<NewsComment> NewsComments => base.Context.Set<NewsComment>();
    public DbSet<ArtworkReview> ArtworkReviews => base.Context.Set<ArtworkReview>();
    
    //public DbSet<NewsImage> NewsImages => base.Context.Set<NewsImage>();
    public DbSet<Album> Albums => base.Context.Set<Album>();
    public DbSet<TrophyImage> TrophyImages => base.Context.Set<TrophyImage>();
    public DbSet<ArtworkVotingCriteria> ArtworkVotingCriterias => base.Context.Set<ArtworkVotingCriteria>();
    public DbSet<ContestantVotingCriteria> ContestantVotingCriterias => base.Context.Set<ContestantVotingCriteria>();
    public DbSet<AlbumItem> AlbumItems => base.Context.Set<AlbumItem>();
    public DbSet<ContactUsSubject> ContactUsSubjects => base.Context.Set<ContactUsSubject>();
    public DbSet<Country> Countries => base.Context.Set<Country>();
    public DbSet<ProductionYear> ProductionYears => base.Context.Set<ProductionYear>();
    public DbSet<ArtworkCategory> ArtworkCategories => base.Context.Set<ArtworkCategory>();
    public DbSet<ArtworkGenre> ArtworkGenres => base.Context.Set<ArtworkGenre>();


    public TEntity Find<TEntity>(params object[] keys) where TEntity : class => base.Context.Find<TEntity>(keys);
    public void RemoveRange<TEntity>(List<TEntity> entities) where TEntity : class => base.Context.RemoveRange(entities);
    public void Remove<TEntity>(TEntity entity) where TEntity : class => base.Context.Remove(entity);

    public DbSet<TEntity> Set<TEntity>() where TEntity : BaseEntity<string> {
      return base.Context.Set<TEntity>();
    }

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