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

    DbSet<TEntity> Set<TEntity>() where TEntity : BaseEntity<string>;
    DbSet<AppUser> Users { get; }
    DbSet<Content> Contents{ get; }
    DbSet<Judge> Judges { get; }
    DbSet<ContentReviewer> ContentReviewers { get; }
    DbSet<Nominee> Nominees { get; }
    DbSet<Image> Images { get; }
    DbSet<UserImage> UserImages { get; }
    DbSet<Artwork> Artworks { get; }
    DbSet<ArtworkPayment> ArtworkPayments { get; }
    DbSet<Award> Awards { get; }
    DbSet<Booth> Booths { get; }
    DbSet<BoothPayment> BoothPayments { get; }
    DbSet<BoothPurchase> BoothPurchases { get; }
    DbSet<JudgeAward> JudgeAwards { get; }
    DbSet<JudgeComment> JudgeComments { get; }
    DbSet<JudgeVote> JudgeVotes { get; }
    DbSet<MediaFile> MediaFiles { get; }
    DbSet<News> News { get; }
    DbSet<NewsComment> NewsComments { get; }
    DbSet<ArtworkReview> ArtworkReviews { get; }

    //DbSet<NewsImage> NewsImages { get; }
    DbSet<Album> Albums { get; }
    DbSet<AlbumItem> AlbumItems{ get; }
    DbSet<TrophyImage> TrophyImages { get; }
    DbSet<VotingCriteria> VotingCriterias { get; }
    DbSet<ContactUsSubject> ContactUsSubjects { get; }
    DbSet<Country> Countries { get; }
    DbSet<ProductionYear> ProductionYears { get; }
    DbSet<Genre> Genres { get; }



  }
}