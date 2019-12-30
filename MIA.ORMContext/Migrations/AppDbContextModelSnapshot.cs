﻿// <auto-generated />
using System;
using MIA.ORMContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MIA.ORMContext.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MIA.Authorization.Entities.AppRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(MAX)");

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.Property<string>("Permissions")
                        .HasColumnType("nvarchar(1000)")
                        .HasMaxLength(1000);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("MIA.Authorization.Entities.UserModule", b =>
                {
                    b.Property<string>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(100);

                    b.Property<long>("AllowedModules");

                    b.HasKey("UserId");

                    b.ToTable("UserModules");
                });

            modelBuilder.Entity("MIA.Models.Entities.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName")
                        .HasMaxLength(100)
                        .IsUnicode(true);

                    b.Property<string>("FullName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("[FirstName] + ' ' + [LastName]");

                    b.Property<string>("LastName")
                        .HasMaxLength(100)
                        .IsUnicode(true);

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");

                    b.HasDiscriminator<string>("Discriminator").HasValue("AppUser");
                });

            modelBuilder.Entity("MIA.Models.Entities.ArtWork", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AwardId");

                    b.Property<string>("NomineeId");

                    b.Property<string>("PaymentId");

                    b.Property<bool>("UploadComplete");

                    b.HasKey("Id");

                    b.HasIndex("AwardId");

                    b.HasIndex("NomineeId");

                    b.ToTable("ArtWorks");
                });

            modelBuilder.Entity("MIA.Models.Entities.ArtWorkPayment", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Amount");

                    b.Property<string>("ArtWorkId");

                    b.Property<long>("PaymentDate");

                    b.Property<string>("TransactionNumber");

                    b.HasKey("Id");

                    b.HasIndex("ArtWorkId")
                        .IsUnique()
                        .HasFilter("[ArtWorkId] IS NOT NULL");

                    b.ToTable("ArtWorkPayments");
                });

            modelBuilder.Entity("MIA.Models.Entities.Award", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("ManagerId");

                    b.Property<string>("Title");

                    b.Property<string>("TrophyId");

                    b.HasKey("Id");

                    b.HasIndex("ManagerId");

                    b.HasIndex("TrophyId");

                    b.ToTable("Awards");
                });

            modelBuilder.Entity("MIA.Models.Entities.Booth", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code");

                    b.Property<string>("Description");

                    b.Property<decimal>("Price");

                    b.HasKey("Id");

                    b.ToTable("Booths");
                });

            modelBuilder.Entity("MIA.Models.Entities.BoothPayment", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Amount");

                    b.Property<string>("BoothPurchaseId");

                    b.Property<long>("PaymentDate");

                    b.Property<string>("TransactionNumber");

                    b.HasKey("Id");

                    b.ToTable("BoothPayments");
                });

            modelBuilder.Entity("MIA.Models.Entities.BoothPurchase", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BoothId");

                    b.Property<string>("ContactName");

                    b.Property<string>("Email");

                    b.Property<string>("EmailVerified");

                    b.Property<string>("PaymentId");

                    b.Property<string>("Phone1");

                    b.Property<string>("Phone2");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.HasIndex("BoothId");

                    b.HasIndex("PaymentId")
                        .IsUnique()
                        .HasFilter("[PaymentId] IS NOT NULL");

                    b.ToTable("BoothPurchases");
                });

            modelBuilder.Entity("MIA.Models.Entities.Image", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("Data")
                        .IsRequired();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("PhotoAlbumId");

                    b.Property<string>("RefId");

                    b.HasKey("Id");

                    b.HasIndex("PhotoAlbumId");

                    b.ToTable("Images");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Image");
                });

            modelBuilder.Entity("MIA.Models.Entities.JudgeAward", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AwardId");

                    b.Property<string>("JudgeId");

                    b.HasKey("Id");

                    b.HasIndex("AwardId");

                    b.HasIndex("JudgeId");

                    b.ToTable("JudgeAwards");
                });

            modelBuilder.Entity("MIA.Models.Entities.JudgeComment", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Comments");

                    b.Property<string>("JudgeId");

                    b.Property<string>("MediaFileId");

                    b.Property<string>("MediaTime");

                    b.HasKey("Id");

                    b.HasIndex("JudgeId");

                    b.HasIndex("MediaFileId");

                    b.ToTable("JudgeComments");
                });

            modelBuilder.Entity("MIA.Models.Entities.JudgeVote", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ArtWorkId");

                    b.Property<string>("CriteriaId");

                    b.Property<string>("JudgeId");

                    b.Property<int>("VotingValue");

                    b.HasKey("Id");

                    b.HasIndex("ArtWorkId");

                    b.HasIndex("CriteriaId");

                    b.HasIndex("JudgeId");

                    b.ToTable("JudgeVotes");
                });

            modelBuilder.Entity("MIA.Models.Entities.MediaFile", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ArtWorkId");

                    b.Property<string>("Description");

                    b.Property<long>("UploadDate");

                    b.HasKey("Id");

                    b.HasIndex("ArtWorkId");

                    b.ToTable("MediaFiles");
                });

            modelBuilder.Entity("MIA.Models.Entities.News", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Body");

                    b.Property<long>("Date");

                    b.Property<string>("ImageId");

                    b.Property<bool>("Outdated");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("ImageId");

                    b.ToTable("News");
                });

            modelBuilder.Entity("MIA.Models.Entities.PhotoAlbum", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Body");

                    b.Property<int>("Order");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("PhotoAlbums");
                });

            modelBuilder.Entity("MIA.Models.Entities.VotingCriteria", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code");

                    b.Property<string>("Name");

                    b.Property<int>("Order");

                    b.Property<decimal>("Weight");

                    b.HasKey("Id");

                    b.ToTable("VotingCriterias");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Z.EntityFramework.Plus.AuditEntry", b =>
                {
                    b.Property<int>("AuditEntryID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CreatedBy")
                        .HasMaxLength(255);

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("EntitySetName")
                        .HasMaxLength(255);

                    b.Property<string>("EntityTypeName")
                        .HasMaxLength(255);

                    b.Property<int>("State");

                    b.Property<string>("StateName")
                        .HasMaxLength(255);

                    b.HasKey("AuditEntryID");

                    b.ToTable("AuditEntries");
                });

            modelBuilder.Entity("Z.EntityFramework.Plus.AuditEntryProperty", b =>
                {
                    b.Property<int>("AuditEntryPropertyID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AuditEntryID");

                    b.Property<string>("NewValueFormatted")
                        .HasColumnName("NewValue");

                    b.Property<string>("OldValueFormatted")
                        .HasColumnName("OldValue");

                    b.Property<string>("PropertyName")
                        .HasMaxLength(255);

                    b.Property<string>("RelationName")
                        .HasMaxLength(255);

                    b.HasKey("AuditEntryPropertyID");

                    b.HasIndex("AuditEntryID");

                    b.ToTable("AuditEntryProperties");
                });

            modelBuilder.Entity("MIA.Models.Entities.ContentReviewer", b =>
                {
                    b.HasBaseType("MIA.Models.Entities.AppUser");

                    b.HasDiscriminator().HasValue("ContentReviewer");
                });

            modelBuilder.Entity("MIA.Models.Entities.Judge", b =>
                {
                    b.HasBaseType("MIA.Models.Entities.AppUser");

                    b.HasDiscriminator().HasValue("Judge");
                });

            modelBuilder.Entity("MIA.Models.Entities.Nominee", b =>
                {
                    b.HasBaseType("MIA.Models.Entities.AppUser");

                    b.HasDiscriminator().HasValue("Nominee");
                });

            modelBuilder.Entity("MIA.Models.Entities.TrophyImage", b =>
                {
                    b.HasBaseType("MIA.Models.Entities.Image");

                    b.HasDiscriminator().HasValue("TrophyImage");
                });

            modelBuilder.Entity("MIA.Models.Entities.UserImage", b =>
                {
                    b.HasBaseType("MIA.Models.Entities.Image");

                    b.HasIndex("RefId")
                        .IsUnique()
                        .HasFilter("[RefId] IS NOT NULL");

                    b.HasDiscriminator().HasValue("UserImage");
                });

            modelBuilder.Entity("MIA.Models.Entities.ArtWork", b =>
                {
                    b.HasOne("MIA.Models.Entities.Award", "Award")
                        .WithMany("ArtWorks")
                        .HasForeignKey("AwardId");

                    b.HasOne("MIA.Models.Entities.Nominee", "Nominee")
                        .WithMany("ArtWorks")
                        .HasForeignKey("NomineeId");
                });

            modelBuilder.Entity("MIA.Models.Entities.ArtWorkPayment", b =>
                {
                    b.HasOne("MIA.Models.Entities.ArtWork", "ArtWork")
                        .WithOne("Payment")
                        .HasForeignKey("MIA.Models.Entities.ArtWorkPayment", "ArtWorkId");
                });

            modelBuilder.Entity("MIA.Models.Entities.Award", b =>
                {
                    b.HasOne("MIA.Models.Entities.Judge", "Manager")
                        .WithMany()
                        .HasForeignKey("ManagerId");

                    b.HasOne("MIA.Models.Entities.TrophyImage", "Trophy")
                        .WithMany()
                        .HasForeignKey("TrophyId");
                });

            modelBuilder.Entity("MIA.Models.Entities.BoothPurchase", b =>
                {
                    b.HasOne("MIA.Models.Entities.Booth", "Booth")
                        .WithMany("Purchases")
                        .HasForeignKey("BoothId");

                    b.HasOne("MIA.Models.Entities.BoothPayment", "Payment")
                        .WithOne("BoothPurchase")
                        .HasForeignKey("MIA.Models.Entities.BoothPurchase", "PaymentId");
                });

            modelBuilder.Entity("MIA.Models.Entities.Image", b =>
                {
                    b.HasOne("MIA.Models.Entities.PhotoAlbum")
                        .WithMany("Images")
                        .HasForeignKey("PhotoAlbumId");
                });

            modelBuilder.Entity("MIA.Models.Entities.JudgeAward", b =>
                {
                    b.HasOne("MIA.Models.Entities.Award", "Award")
                        .WithMany("JudgeAwards")
                        .HasForeignKey("AwardId");

                    b.HasOne("MIA.Models.Entities.Judge", "Judge")
                        .WithMany("JudgeAwards")
                        .HasForeignKey("JudgeId");
                });

            modelBuilder.Entity("MIA.Models.Entities.JudgeComment", b =>
                {
                    b.HasOne("MIA.Models.Entities.Judge", "Judge")
                        .WithMany("Comments")
                        .HasForeignKey("JudgeId");

                    b.HasOne("MIA.Models.Entities.MediaFile", "MediaFile")
                        .WithMany("Comments")
                        .HasForeignKey("MediaFileId");
                });

            modelBuilder.Entity("MIA.Models.Entities.JudgeVote", b =>
                {
                    b.HasOne("MIA.Models.Entities.ArtWork", "ArtWork")
                        .WithMany("Votes")
                        .HasForeignKey("ArtWorkId");

                    b.HasOne("MIA.Models.Entities.VotingCriteria", "Criteria")
                        .WithMany("Votes")
                        .HasForeignKey("CriteriaId");

                    b.HasOne("MIA.Models.Entities.Judge", "Judge")
                        .WithMany("Votes")
                        .HasForeignKey("JudgeId");
                });

            modelBuilder.Entity("MIA.Models.Entities.MediaFile", b =>
                {
                    b.HasOne("MIA.Models.Entities.ArtWork", "ArtWork")
                        .WithMany("MediaFiles")
                        .HasForeignKey("ArtWorkId");
                });

            modelBuilder.Entity("MIA.Models.Entities.News", b =>
                {
                    b.HasOne("MIA.Models.Entities.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("MIA.Authorization.Entities.AppRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("MIA.Models.Entities.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("MIA.Models.Entities.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("MIA.Authorization.Entities.AppRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MIA.Models.Entities.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("MIA.Models.Entities.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Z.EntityFramework.Plus.AuditEntryProperty", b =>
                {
                    b.HasOne("Z.EntityFramework.Plus.AuditEntry", "Parent")
                        .WithMany("Properties")
                        .HasForeignKey("AuditEntryID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MIA.Models.Entities.UserImage", b =>
                {
                    b.HasOne("MIA.Models.Entities.AppUser")
                        .WithOne("AvatarImage")
                        .HasForeignKey("MIA.Models.Entities.UserImage", "RefId");
                });
#pragma warning restore 612, 618
        }
    }
}
