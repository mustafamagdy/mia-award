﻿using MIA.Authorization.Entities;
using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Z.EntityFramework.Plus;

namespace MIA.ORMContext {
  public class AppDbContext : IdentityDbContext<AppUser, AppRole, string> {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {

      ConfigureCaching(options);
      ConfigureAuditing();

    }

    private void ConfigureCaching(DbContextOptions<AppDbContext> options) {
      // var cacheOptions = new CacheItemPolicy () { SlidingExpiration = TimeSpan.FromMilliseconds (1) };
      // Microsoft.Extensions.Caching.Memory.MemoryCacheOptions opt = new MemoryCacheOptions();
      // QueryCacheManager.Cache. = opt;
    }

    private void ConfigureAuditing() {
      //turn on if you want to use audit entries, i think this should be optimized first
      //AuditManager.DefaultConfiguration.AutoSavePreAction = (context, audit) =>
      //  (context as AppDbContext)?.AuditEntries.AddRange(audit.Entries);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
      base.OnConfiguring(optionsBuilder);

    }

    protected override void OnModelCreating(ModelBuilder builder) {

      //Add all entity configuration from assembly
      builder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
      base.OnModelCreating(builder);

      //AppUser mapping
      builder.Entity<AppUser>().Property(x => x.Id).HasValueGenerator<SeqIdValueGenerator>().ValueGeneratedOnAdd();
      builder.Entity<AppUser>().Property(x => x.FirstName).IsUnicode(true).HasMaxLength(Constants.MAX_100);
      builder.Entity<AppUser>().Property(x => x.LastName).IsUnicode(true).HasMaxLength(Constants.MAX_100);
      builder.Entity<AppUser>().Property(x => x.FullName).HasComputedColumnSql("[FirstName] + ' ' + [LastName]");
      builder.Entity<AppUser>().HasOne(x => x.AvatarImage).WithOne().HasForeignKey<UserImage>(x => x.UserId);

      builder.Entity<AppUser>().Property(x => x.Id).HasValueGenerator<SeqIdValueGenerator>().ValueGeneratedOnAdd();

      builder.Entity<AppRole>().Property(x => x.Id).HasValueGenerator<SeqIdValueGenerator>().ValueGeneratedOnAdd();
      builder.Entity<AppRole>().Property(x => x.Description).HasColumnType("nvarchar(MAX)");
      builder.Entity<AppRole>().Property(x => x.Permissions).HasColumnType("nvarchar(1000)").HasMaxLength(1000);

    }

    #region Auditing

    public DbSet<AuditEntry> AuditEntries { get; set; }
    public DbSet<AuditEntryProperty> AuditEntryProperties { get; set; }

    #endregion

    #region Permissions

    public DbSet<UserModule> UserModules { get; set; }

    #endregion

    public DbSet<UserImage> UserImages { get; set; }
    public DbSet<Image> Images { get; set; }
    public DbSet<Judge> Judges { get; set; }
    public DbSet<ContentReviewer> ContentReviewers { get; set; }
    public DbSet<Nominee> Nominees { get; set; }
    public DbSet<ArtWork> ArtWorks { get; set; }
    public DbSet<ArtWorkPayment> ArtWorkPayments { get; set; }
    public DbSet<Award> Awards { get; set; }
    public DbSet<Booth> Booths { get; set; }
    public DbSet<BoothPayment> BoothPayments { get; set; }
    public DbSet<BoothPurchase> BoothPurchases { get; set; }
    public DbSet<JudgeAward> JudgeAwards { get; set; }
    public DbSet<JudgeComment> JudgeComments { get; set; }
    public DbSet<JudgeVote> JudgeVotes { get; set; }
    public DbSet<MediaFile> MediaFiles { get; set; }
    public DbSet<News> News { get; set; }
    //public DbSet<NewsImage> NewsImages { get; set; }
    public DbSet<PhotoAlbum> PhotoAlbums { get; set; }
    public DbSet<TrophyImage> TrophyImages { get; set; }
    public DbSet<VotingCriteria> VotingCriterias { get; set; }

  }

}