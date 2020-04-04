﻿// <auto-generated />
using System;
using MIA.ORMContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MIA.ORMContext.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20200306120900_RemovePurchaseStatus")]
    partial class RemovePurchaseStatus
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

            modelBuilder.Entity("MIA.Models.Entities.Album", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("MainGallery");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Albums");
                });

            modelBuilder.Entity("MIA.Models.Entities.AlbumItem", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AlbumId");

                    b.Property<long>("DateCreated");

                    b.Property<bool>("Featured");

                    b.Property<string>("FileKey");

                    b.Property<string>("FileUrl");

                    b.Property<int>("MediaType");

                    b.Property<int>("Order");

                    b.Property<string>("PosterKey");

                    b.Property<string>("PosterUrl");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("AlbumId");

                    b.ToTable("AlbumItems");
                });

            modelBuilder.Entity("MIA.Models.Entities.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("Address");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FullName")
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

            modelBuilder.Entity("MIA.Models.Entities.VoteOn", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("AllowFileUpload");

                    b.Property<string>("AwardId");

                    b.Property<string>("Country");

                    b.Property<string>("CoverId");

                    b.Property<string>("CoverUrl");

                    b.Property<string>("Crew");

                    b.Property<string>("DateOfRelease");

                    b.Property<string>("Director");

                    b.Property<bool>("Featured");

                    b.Property<string>("NomineeId");

                    b.Property<string>("PaymentId");

                    b.Property<long>("PostedDate");

                    b.Property<string>("PosterId");

                    b.Property<string>("PosterUrl");

                    b.Property<string>("Production");

                    b.Property<double>("Rate");

                    b.Property<string>("ShowDescription");

                    b.Property<string>("Stars");

                    b.Property<string>("Story");

                    b.Property<string>("Title");

                    b.Property<string>("TrailerId");

                    b.Property<string>("TrailerPosterId");

                    b.Property<string>("TrailerPosterUrl");

                    b.Property<string>("TrailerUrl");

                    b.Property<bool>("UploadComplete");

                    b.Property<string>("WinnerAwardFirstPlaceId");

                    b.Property<string>("WinnerAwardSecondPlaceId");

                    b.Property<string>("Writers");

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

                    b.Property<string>("ArtworkId");

                    b.Property<string>("CardHolderName");

                    b.Property<string>("CardType");

                    b.Property<bool>("IsOffline");

                    b.Property<string>("Last4Digits");

                    b.Property<long>("PaymentDate");

                    b.Property<string>("PaymentId");

                    b.Property<int>("PaymentStatus");

                    b.Property<string>("ReceiptId");

                    b.Property<string>("ReceiptUrl");

                    b.Property<string>("TransactionNumber");

                    b.HasKey("Id");

                    b.HasIndex("ArtworkId")
                        .IsUnique()
                        .HasFilter("[ArtworkId] IS NOT NULL");

                    b.ToTable("ArtWorkPayments");
                });

            modelBuilder.Entity("MIA.Models.Entities.ArtworkReview", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ArtworkId");

                    b.Property<string>("Comments");

                    b.Property<long>("Date");

                    b.Property<string>("Email");

                    b.Property<bool>("IsApproved");

                    b.Property<string>("Name");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("ArtworkId");

                    b.ToTable("ArtworkReviews");
                });

            modelBuilder.Entity("MIA.Models.Entities.Award", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("ArtworkFee");

                    b.Property<string>("Code");

                    b.Property<string>("Description");

                    b.Property<string>("FirstPlaceArtworkId");

                    b.Property<string>("ManagerId");

                    b.Property<string>("SecondPlaceArtworkId");

                    b.Property<string>("Title");

                    b.Property<string>("TrophyImageKey");

                    b.Property<string>("TrophyImageUrl");

                    b.HasKey("Id");

                    b.HasIndex("FirstPlaceArtworkId")
                        .IsUnique()
                        .HasFilter("[FirstPlaceArtworkId] IS NOT NULL");

                    b.HasIndex("ManagerId");

                    b.HasIndex("SecondPlaceArtworkId")
                        .IsUnique()
                        .HasFilter("[SecondPlaceArtworkId] IS NOT NULL");

                    b.ToTable("Awards");
                });

            modelBuilder.Entity("MIA.Models.Entities.Booth", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Area");

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

                    b.Property<string>("CardHolderName");

                    b.Property<string>("CardType");

                    b.Property<bool>("IsOffline");

                    b.Property<string>("Last4Digits");

                    b.Property<long>("PaymentDate");

                    b.Property<string>("PaymentId");

                    b.Property<int>("PaymentStatus");

                    b.Property<string>("ReceiptId");

                    b.Property<string>("ReceiptUrl");

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

                    b.Property<string>("PaymentId");

                    b.Property<string>("Phone1");

                    b.Property<string>("Phone2");

                    b.HasKey("Id");

                    b.HasIndex("BoothId");

                    b.HasIndex("PaymentId")
                        .IsUnique()
                        .HasFilter("[PaymentId] IS NOT NULL");

                    b.ToTable("BoothPurchases");
                });

            modelBuilder.Entity("MIA.Models.Entities.ContactUsSubject", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("ContactUsSubjects");
                });

            modelBuilder.Entity("MIA.Models.Entities.Content", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ContentType");

                    b.Property<string>("Data");

                    b.HasKey("Id");

                    b.ToTable("Contents");
                });

            modelBuilder.Entity("MIA.Models.Entities.Image", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("Data")
                        .IsRequired();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.HasKey("Id");

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

                    b.Property<string>("ArtworkId");

                    b.Property<string>("CriteriaId");

                    b.Property<string>("JudgeId");

                    b.Property<int>("VotingValue");

                    b.HasKey("Id");

                    b.HasIndex("ArtworkId");

                    b.HasIndex("CriteriaId");

                    b.HasIndex("JudgeId");

                    b.ToTable("JudgeVotes");
                });

            modelBuilder.Entity("MIA.Models.Entities.MediaFile", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ArtworkId");

                    b.Property<string>("Description");

                    b.Property<string>("FileKey");

                    b.Property<string>("FileUrl");

                    b.Property<long>("UploadDate");

                    b.HasKey("Id");

                    b.HasIndex("ArtworkId");

                    b.ToTable("MediaFiles");
                });

            modelBuilder.Entity("MIA.Models.Entities.News", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Body");

                    b.Property<string>("Category");

                    b.Property<long>("Date");

                    b.Property<bool>("Featured");

                    b.Property<string>("Keywords");

                    b.Property<bool>("Outdated");

                    b.Property<string>("PosterId")
                        .HasMaxLength(1000);

                    b.Property<string>("PosterUrl")
                        .HasMaxLength(1000);

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("News");
                });

            modelBuilder.Entity("MIA.Models.Entities.NewsComment", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Comments");

                    b.Property<long>("Date");

                    b.Property<string>("Email");

                    b.Property<bool>("IsApproved");

                    b.Property<string>("Name");

                    b.Property<string>("NewsId");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("NewsId");

                    b.ToTable("NewsComments");
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

                    b.Property<string>("CompanyName");

                    b.Property<string>("JobTitle");

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

                    b.Property<string>("UserId");

                    b.HasIndex("UserId")
                        .IsUnique()
                        .HasFilter("[UserId] IS NOT NULL");

                    b.HasDiscriminator().HasValue("UserImage");
                });

            modelBuilder.Entity("MIA.Models.Entities.AlbumItem", b =>
                {
                    b.HasOne("MIA.Models.Entities.Album", "Album")
                        .WithMany("MediaItems")
                        .HasForeignKey("AlbumId");
                });

            modelBuilder.Entity("MIA.Models.Entities.VoteOn", b =>
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
                    b.HasOne("MIA.Models.Entities.VoteOn", "VoteOn")
                        .WithOne("Payment")
                        .HasForeignKey("MIA.Models.Entities.ArtWorkPayment", "ArtworkId");
                });

            modelBuilder.Entity("MIA.Models.Entities.ArtworkReview", b =>
                {
                    b.HasOne("MIA.Models.Entities.VoteOn", "Artwork")
                        .WithMany("Reviews")
                        .HasForeignKey("ArtworkId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MIA.Models.Entities.Award", b =>
                {
                    b.HasOne("MIA.Models.Entities.VoteOn", "FirstPlace")
                        .WithOne("WinnerAwardFirstPlace")
                        .HasForeignKey("MIA.Models.Entities.Award", "FirstPlaceArtworkId");

                    b.HasOne("MIA.Models.Entities.Judge", "Manager")
                        .WithMany()
                        .HasForeignKey("ManagerId");

                    b.HasOne("MIA.Models.Entities.VoteOn", "SecondPlace")
                        .WithOne("WinnerAwardSecondPlace")
                        .HasForeignKey("MIA.Models.Entities.Award", "SecondPlaceArtworkId");
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
                    b.HasOne("MIA.Models.Entities.VoteOn", "VoteOn")
                        .WithMany("Votes")
                        .HasForeignKey("ArtworkId");

                    b.HasOne("MIA.Models.Entities.VotingCriteria", "Criteria")
                        .WithMany("Votes")
                        .HasForeignKey("CriteriaId");

                    b.HasOne("MIA.Models.Entities.Judge", "Judge")
                        .WithMany("Votes")
                        .HasForeignKey("JudgeId");
                });

            modelBuilder.Entity("MIA.Models.Entities.MediaFile", b =>
                {
                    b.HasOne("MIA.Models.Entities.VoteOn", "VoteOn")
                        .WithMany("MediaFiles")
                        .HasForeignKey("ArtworkId");
                });

            modelBuilder.Entity("MIA.Models.Entities.NewsComment", b =>
                {
                    b.HasOne("MIA.Models.Entities.News", "News")
                        .WithMany("Comments")
                        .HasForeignKey("NewsId")
                        .OnDelete(DeleteBehavior.Cascade);
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
                        .HasForeignKey("MIA.Models.Entities.UserImage", "UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
