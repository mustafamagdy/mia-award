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
    DbSet<ArtWork> ArtWorks { get; }
    DbSet<Contestant> Contestants { get; }
    DbSet<ArtWorkPayment> ArtWorkPayments { get; }
    DbSet<ArtworkAward> ArtworkAwards { get; }
    DbSet<ContestantAward> ContestantAwards { get; }
    DbSet<Booth> Booths { get; }
    DbSet<BoothPayment> BoothPayments { get; }
    DbSet<BoothPurchase> BoothPurchases { get; }
    DbSet<JudgeArtworkAward> JudgeArtworkAwards { get; }
    DbSet<JudgeContestantAward> JudgeContestantAwards { get; }
    DbSet<JudgeComment> JudgeComments { get; }
    DbSet<ArtworkJudgeVote> ArtworkVotes { get; }
    DbSet<ContestantJudgeVote> ContestantVotes { get; }
    DbSet<MediaFile> MediaFiles { get; }
    DbSet<News> News { get; }
    DbSet<NewsComment> NewsComments { get; }
    DbSet<ArtworkReview> ArtworkReviews { get; }

    //DbSet<NewsImage> NewsImages { get; }
    DbSet<Album> Albums { get; }
    DbSet<AlbumItem> AlbumItems{ get; }
    DbSet<TrophyImage> TrophyImages { get; }
    DbSet<ArtworkVotingCriteria> ArtworkVotingCriterias { get; }
    DbSet<ContestantVotingCriteria> ContestantVotingCriterias { get; }
    DbSet<ContactUsSubject> ContactUsSubjects { get; }
    DbSet<Country> Countries { get; }
    DbSet<ProductionYear> ProductionYears { get; }
    DbSet<ArtworkCategory> ArtworkCategories { get; }
    DbSet<ArtworkGenre> ArtworkGenres { get; }



  }
}