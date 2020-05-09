using MIA.Authorization.Entities;
using MIA.Models.Entities;
using MIA.ORMContext.ValueConverters;
using MIA.ORMContext.ValueGenerators;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Z.EntityFramework.Plus;

namespace MIA.ORMContext
{
  public class AppDbContext : IdentityDbContext<AppUser, AppRole, string>
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

      ConfigureCaching(options);
      ConfigureAuditing();

    }

    private void ConfigureCaching(DbContextOptions<AppDbContext> options)
    {
      // var cacheOptions = new CacheItemPolicy () { SlidingExpiration = TimeSpan.FromMilliseconds (1) };
      // Microsoft.Extensions.Caching.Memory.MemoryCacheOptions opt = new MemoryCacheOptions();
      // QueryCacheManager.Cache. = opt;
    }

    private void ConfigureAuditing()
    {
      //turn on if you want to use audit entries, i think this should be optimized first
      //AuditManager.DefaultConfiguration.AutoSavePreAction = (context, audit) =>
      //  (context as AppDbContext)?.AuditEntries.AddRange(audit.Entries);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      base.OnConfiguring(optionsBuilder);

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {

      //Add all entity configuration from assembly
      builder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
      base.OnModelCreating(builder);

      //AppUser mapping
      builder.Entity<AppUser>().Property(x => x.Id).HasValueGenerator<SeqIdValueGenerator>().ValueGeneratedOnAdd();
      builder.Entity<AppUser>().Property(x => x.FullName).IsUnicode(true).HasMaxLength(Constants.MAX_100);
      builder.Entity<AppUser>().HasOne(x => x.AvatarImage).WithOne().HasForeignKey<UserImage>(x => x.UserId);

      builder.Entity<AppUser>().Property(x => x.Id).HasValueGenerator<SeqIdValueGenerator>().ValueGeneratedOnAdd();

      builder.Entity<AppRole>().Property(x => x.Id).HasValueGenerator<SeqIdValueGenerator>().ValueGeneratedOnAdd();
      builder.Entity<AppRole>().Property(x => x.Description).HasColumnType("nvarchar(MAX)");
      builder.Entity<AppRole>().Property(x => x.Permissions).HasColumnType("nvarchar(1000)").HasMaxLength(1000);

      // set localizedData converter
      builder.UseValueConverterForType<LocalizedData>(new LocalizedDataConverter());

    }

    #region Auditing

    public DbSet<AuditEntry> AuditEntries { get; set; }
    public DbSet<AuditEntryProperty> AuditEntryProperties { get; set; }

    #endregion
    
    public DbSet<Content> Contents { get; set; }
    public DbSet<UserImage> UserImages { get; set; }
    public DbSet<Image> Images { get; set; }
    public DbSet<Judge> Judges { get; set; }
    public DbSet<ContentReviewer> ContentReviewers { get; set; }
    public DbSet<Nominee> Nominees { get; set; }
    public DbSet<Artwork> Artworks { get; set; }
    public DbSet<ArtworkPayment> ArtworkPayments { get; set; }
    public DbSet<Award> Awards { get; set; }
    public DbSet<Booth> Booths { get; set; }
    public DbSet<BoothPayment> BoothPayments { get; set; }
    public DbSet<BoothPurchase> BoothPurchases { get; set; }
    public DbSet<JudgeAward> JudgeAwards { get; set; }
    public DbSet<JudgeComment> JudgeComments { get; set; }
    public DbSet<JudgeVote> JudgeVotes { get; set; }
    public DbSet<MediaFile> MediaFiles { get; set; }
    public DbSet<News> News { get; set; }
    public DbSet<NewsComment> NewsComments { get; set; }
    public DbSet<ArtworkReview> ArtworkReviews { get; set; }

    //public DbSet<NewsImage> NewsImages { get; set; }
    public DbSet<Album> Albums { get; set; }
    public DbSet<AlbumItem> AlbumItems { get; set; }
    public DbSet<TrophyImage> TrophyImages { get; set; }
    public DbSet<VotingCriteria> VotingCriterias { get; set; }
    public DbSet<ContactUsSubject> ContactUsSubjects { get; set; }
    public DbSet<Country> Countries { get; set; }
    public DbSet<ProductionYear> ProductionYears { get; set; }
    public DbSet<Genre> Generes { get; set; }

  }

}