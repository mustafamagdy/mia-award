using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Albums",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    MainGallery = table.Column<bool>(nullable: false),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Albums", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ArtworkCategories",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtworkCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ArtworkGenres",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtworkGenres", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Description = table.Column<string>(type: "nvarchar(MAX)", nullable: true),
                    Permissions = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    FullName = table.Column<string>(maxLength: 100, nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Discriminator = table.Column<string>(nullable: false),
                    JobTitle = table.Column<string>(nullable: true),
                    CompanyName = table.Column<string>(nullable: true),
                    ContestantId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuditEntries",
                columns: table => new
                {
                    AuditEntryID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedBy = table.Column<string>(maxLength: 255, nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    EntitySetName = table.Column<string>(maxLength: 255, nullable: true),
                    EntityTypeName = table.Column<string>(maxLength: 255, nullable: true),
                    State = table.Column<int>(nullable: false),
                    StateName = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditEntries", x => x.AuditEntryID);
                });

            migrationBuilder.CreateTable(
                name: "BoothPayments",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    TransactionNumber = table.Column<string>(nullable: true),
                    Amount = table.Column<decimal>(nullable: false),
                    PaymentDate = table.Column<long>(nullable: false),
                    PaymentId = table.Column<string>(nullable: true),
                    Last4Digits = table.Column<string>(nullable: true),
                    CardHolderName = table.Column<string>(nullable: true),
                    CardType = table.Column<string>(nullable: true),
                    PaymentStatus = table.Column<int>(nullable: false),
                    ReceiptId = table.Column<string>(nullable: true),
                    ReceiptUrl = table.Column<string>(nullable: true),
                    IsOffline = table.Column<bool>(nullable: false),
                    BoothPurchaseId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoothPayments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Booths",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: true),
                    Area = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Price = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Booths", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContactUsSubjects",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactUsSubjects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Contents",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Data = table.Column<string>(nullable: true),
                    ContentType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "News",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Body = table.Column<string>(nullable: true),
                    Date = table.Column<long>(nullable: false),
                    Outdated = table.Column<bool>(nullable: false),
                    Featured = table.Column<bool>(nullable: false),
                    Category = table.Column<string>(nullable: true),
                    Keywords = table.Column<string>(nullable: true),
                    PosterId = table.Column<string>(maxLength: 1000, nullable: true),
                    PosterUrl = table.Column<string>(maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_News", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductionYears",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductionYears", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AlbumItems",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    DateCreated = table.Column<long>(nullable: false),
                    Featured = table.Column<bool>(nullable: false),
                    FileKey = table.Column<string>(nullable: true),
                    FileUrl = table.Column<string>(nullable: true),
                    PosterKey = table.Column<string>(nullable: true),
                    PosterUrl = table.Column<string>(nullable: true),
                    MediaType = table.Column<int>(nullable: false),
                    Order = table.Column<int>(nullable: false),
                    AlbumId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlbumItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AlbumItems_Albums_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "Albums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Data = table.Column<byte[]>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Images_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AuditEntryProperties",
                columns: table => new
                {
                    AuditEntryPropertyID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AuditEntryID = table.Column<int>(nullable: false),
                    PropertyName = table.Column<string>(maxLength: 255, nullable: true),
                    RelationName = table.Column<string>(maxLength: 255, nullable: true),
                    NewValue = table.Column<string>(nullable: true),
                    OldValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditEntryProperties", x => x.AuditEntryPropertyID);
                    table.ForeignKey(
                        name: "FK_AuditEntryProperties_AuditEntries_AuditEntryID",
                        column: x => x.AuditEntryID,
                        principalTable: "AuditEntries",
                        principalColumn: "AuditEntryID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BoothPurchases",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    BoothId = table.Column<string>(nullable: true),
                    ContactName = table.Column<string>(nullable: true),
                    Phone1 = table.Column<string>(nullable: true),
                    Phone2 = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    PaymentId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoothPurchases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BoothPurchases_Booths_BoothId",
                        column: x => x.BoothId,
                        principalTable: "Booths",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BoothPurchases_BoothPayments_PaymentId",
                        column: x => x.PaymentId,
                        principalTable: "BoothPayments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NewsComments",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Date = table.Column<long>(nullable: false),
                    Comments = table.Column<string>(nullable: true),
                    NewsId = table.Column<string>(nullable: true),
                    IsApproved = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewsComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NewsComments_News_NewsId",
                        column: x => x.NewsId,
                        principalTable: "News",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ArtWorks",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    NomineeId = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    UploadComplete = table.Column<bool>(nullable: false),
                    AllowFileUpload = table.Column<bool>(nullable: false),
                    Featured = table.Column<bool>(nullable: false),
                    PaymentId = table.Column<string>(nullable: true),
                    PosterId = table.Column<string>(nullable: true),
                    PosterUrl = table.Column<string>(nullable: true),
                    TrailerId = table.Column<string>(nullable: true),
                    TrailerUrl = table.Column<string>(nullable: true),
                    TrailerPosterId = table.Column<string>(nullable: true),
                    TrailerPosterUrl = table.Column<string>(nullable: true),
                    CoverId = table.Column<string>(nullable: true),
                    CoverUrl = table.Column<string>(nullable: true),
                    PostedDate = table.Column<long>(nullable: false),
                    DateOfRelease = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    ShowDescription = table.Column<string>(nullable: true),
                    Director = table.Column<string>(nullable: true),
                    Production = table.Column<string>(nullable: true),
                    Writers = table.Column<string>(nullable: true),
                    Story = table.Column<string>(nullable: true),
                    Stars = table.Column<string>(nullable: true),
                    Crew = table.Column<string>(nullable: true),
                    Rate = table.Column<double>(nullable: false),
                    AwardId = table.Column<string>(nullable: true),
                    WinnerAwardFirstPlaceId = table.Column<string>(nullable: true),
                    WinnerAwardSecondPlaceId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtWorks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArtWorks_AspNetUsers_NomineeId",
                        column: x => x.NomineeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ArtworkAwards",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ArtworkFee = table.Column<decimal>(nullable: false),
                    TrophyImageKey = table.Column<string>(nullable: true),
                    TrophyImageUrl = table.Column<string>(nullable: true),
                    AwardType = table.Column<int>(nullable: false),
                    ManagerId = table.Column<string>(nullable: true),
                    FirstPlaceArtworkId = table.Column<string>(nullable: true),
                    SecondPlaceArtworkId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtworkAwards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArtworkAwards_ArtWorks_FirstPlaceArtworkId",
                        column: x => x.FirstPlaceArtworkId,
                        principalTable: "ArtWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ArtworkAwards_AspNetUsers_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ArtworkAwards_ArtWorks_SecondPlaceArtworkId",
                        column: x => x.SecondPlaceArtworkId,
                        principalTable: "ArtWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ArtWorkPayments",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    TransactionNumber = table.Column<string>(nullable: true),
                    Amount = table.Column<decimal>(nullable: false),
                    PaymentDate = table.Column<long>(nullable: false),
                    PaymentId = table.Column<string>(nullable: true),
                    Last4Digits = table.Column<string>(nullable: true),
                    CardHolderName = table.Column<string>(nullable: true),
                    CardType = table.Column<string>(nullable: true),
                    PaymentStatus = table.Column<int>(nullable: false),
                    ReceiptId = table.Column<string>(nullable: true),
                    ReceiptUrl = table.Column<string>(nullable: true),
                    IsOffline = table.Column<bool>(nullable: false),
                    ArtWorkId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtWorkPayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArtWorkPayments_ArtWorks_ArtWorkId",
                        column: x => x.ArtWorkId,
                        principalTable: "ArtWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ArtworkReviews",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Date = table.Column<long>(nullable: false),
                    Comments = table.Column<string>(nullable: true),
                    ArtworkId = table.Column<string>(nullable: true),
                    IsApproved = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtworkReviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArtworkReviews_ArtWorks_ArtworkId",
                        column: x => x.ArtworkId,
                        principalTable: "ArtWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MediaFiles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UploadDate = table.Column<long>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    FileKey = table.Column<string>(nullable: true),
                    FileUrl = table.Column<string>(nullable: true),
                    ArtWorkId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MediaFiles_ArtWorks_ArtWorkId",
                        column: x => x.ArtWorkId,
                        principalTable: "ArtWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ArtworkVotingCriterias",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Weight = table.Column<decimal>(nullable: false),
                    Order = table.Column<int>(nullable: false),
                    AwardId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtworkVotingCriterias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArtworkVotingCriterias_ArtworkAwards_AwardId",
                        column: x => x.AwardId,
                        principalTable: "ArtworkAwards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "JudgeArtworkAwards",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    JudgeId = table.Column<string>(nullable: true),
                    AwardId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JudgeArtworkAwards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JudgeArtworkAwards_ArtworkAwards_AwardId",
                        column: x => x.AwardId,
                        principalTable: "ArtworkAwards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_JudgeArtworkAwards_AspNetUsers_JudgeId",
                        column: x => x.JudgeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "JudgeComments",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    MediaTime = table.Column<string>(nullable: true),
                    Comments = table.Column<string>(nullable: true),
                    MediaFileId = table.Column<string>(nullable: true),
                    JudgeId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JudgeComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JudgeComments_AspNetUsers_JudgeId",
                        column: x => x.JudgeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_JudgeComments_MediaFiles_MediaFileId",
                        column: x => x.MediaFileId,
                        principalTable: "MediaFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ArtworkVotes",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    VotingValue = table.Column<int>(nullable: false),
                    JudgeId = table.Column<string>(nullable: true),
                    JudgeComplete = table.Column<bool>(nullable: false),
                    CriteriaId = table.Column<string>(nullable: true),
                    ArtworkId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtworkVotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArtworkVotes_ArtWorks_ArtworkId",
                        column: x => x.ArtworkId,
                        principalTable: "ArtWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ArtworkVotes_ArtworkVotingCriterias_CriteriaId",
                        column: x => x.CriteriaId,
                        principalTable: "ArtworkVotingCriterias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ArtworkVotes_AspNetUsers_JudgeId",
                        column: x => x.JudgeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Contestant",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    NomineeId = table.Column<string>(nullable: true),
                    AwardId = table.Column<string>(nullable: true),
                    WinnerAwardFirstPlaceId = table.Column<string>(nullable: true),
                    WinnerAwardSecondPlaceId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contestant", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contestant_AspNetUsers_NomineeId",
                        column: x => x.NomineeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ContestantAwards",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ArtworkFee = table.Column<decimal>(nullable: false),
                    TrophyImageKey = table.Column<string>(nullable: true),
                    TrophyImageUrl = table.Column<string>(nullable: true),
                    AwardType = table.Column<int>(nullable: false),
                    ManagerId = table.Column<string>(nullable: true),
                    FirstPlaceContestantId = table.Column<string>(nullable: true),
                    SecondPlaceContestantId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContestantAwards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContestantAwards_Contestant_FirstPlaceContestantId",
                        column: x => x.FirstPlaceContestantId,
                        principalTable: "Contestant",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ContestantAwards_AspNetUsers_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ContestantAwards_Contestant_SecondPlaceContestantId",
                        column: x => x.SecondPlaceContestantId,
                        principalTable: "Contestant",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ContestantVotingCriterias",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Weight = table.Column<decimal>(nullable: false),
                    Order = table.Column<int>(nullable: false),
                    AwardId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContestantVotingCriterias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContestantVotingCriterias_ContestantAwards_AwardId",
                        column: x => x.AwardId,
                        principalTable: "ContestantAwards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "JudgeContestantAwards",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    JudgeId = table.Column<string>(nullable: true),
                    AwardId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JudgeContestantAwards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JudgeContestantAwards_ContestantAwards_AwardId",
                        column: x => x.AwardId,
                        principalTable: "ContestantAwards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_JudgeContestantAwards_AspNetUsers_JudgeId",
                        column: x => x.JudgeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ContestantVotes",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    VotingValue = table.Column<int>(nullable: false),
                    JudgeId = table.Column<string>(nullable: true),
                    JudgeComplete = table.Column<bool>(nullable: false),
                    CriteriaId = table.Column<string>(nullable: true),
                    ContestantId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContestantVotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContestantVotes_Contestant_ContestantId",
                        column: x => x.ContestantId,
                        principalTable: "Contestant",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ContestantVotes_ContestantVotingCriterias_CriteriaId",
                        column: x => x.CriteriaId,
                        principalTable: "ContestantVotingCriterias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ContestantVotes_AspNetUsers_JudgeId",
                        column: x => x.JudgeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AlbumItems_AlbumId",
                table: "AlbumItems",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtworkAwards_FirstPlaceArtworkId",
                table: "ArtworkAwards",
                column: "FirstPlaceArtworkId",
                unique: true,
                filter: "[FirstPlaceArtworkId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ArtworkAwards_ManagerId",
                table: "ArtworkAwards",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtworkAwards_SecondPlaceArtworkId",
                table: "ArtworkAwards",
                column: "SecondPlaceArtworkId",
                unique: true,
                filter: "[SecondPlaceArtworkId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ArtWorkPayments_ArtWorkId",
                table: "ArtWorkPayments",
                column: "ArtWorkId",
                unique: true,
                filter: "[ArtWorkId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ArtworkReviews_ArtworkId",
                table: "ArtworkReviews",
                column: "ArtworkId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtWorks_AwardId",
                table: "ArtWorks",
                column: "AwardId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtWorks_NomineeId",
                table: "ArtWorks",
                column: "NomineeId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtworkVotes_ArtworkId",
                table: "ArtworkVotes",
                column: "ArtworkId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtworkVotes_CriteriaId",
                table: "ArtworkVotes",
                column: "CriteriaId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtworkVotes_JudgeId",
                table: "ArtworkVotes",
                column: "JudgeId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtworkVotingCriterias_AwardId",
                table: "ArtworkVotingCriterias",
                column: "AwardId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AuditEntryProperties_AuditEntryID",
                table: "AuditEntryProperties",
                column: "AuditEntryID");

            migrationBuilder.CreateIndex(
                name: "IX_BoothPurchases_BoothId",
                table: "BoothPurchases",
                column: "BoothId");

            migrationBuilder.CreateIndex(
                name: "IX_BoothPurchases_PaymentId",
                table: "BoothPurchases",
                column: "PaymentId",
                unique: true,
                filter: "[PaymentId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Contestant_AwardId",
                table: "Contestant",
                column: "AwardId");

            migrationBuilder.CreateIndex(
                name: "IX_Contestant_NomineeId",
                table: "Contestant",
                column: "NomineeId",
                unique: true,
                filter: "[NomineeId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ContestantAwards_FirstPlaceContestantId",
                table: "ContestantAwards",
                column: "FirstPlaceContestantId",
                unique: true,
                filter: "[FirstPlaceContestantId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ContestantAwards_ManagerId",
                table: "ContestantAwards",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_ContestantAwards_SecondPlaceContestantId",
                table: "ContestantAwards",
                column: "SecondPlaceContestantId",
                unique: true,
                filter: "[SecondPlaceContestantId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ContestantVotes_ContestantId",
                table: "ContestantVotes",
                column: "ContestantId");

            migrationBuilder.CreateIndex(
                name: "IX_ContestantVotes_CriteriaId",
                table: "ContestantVotes",
                column: "CriteriaId");

            migrationBuilder.CreateIndex(
                name: "IX_ContestantVotes_JudgeId",
                table: "ContestantVotes",
                column: "JudgeId");

            migrationBuilder.CreateIndex(
                name: "IX_ContestantVotingCriterias_AwardId",
                table: "ContestantVotingCriterias",
                column: "AwardId");

            migrationBuilder.CreateIndex(
                name: "IX_Images_UserId",
                table: "Images",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_JudgeArtworkAwards_AwardId",
                table: "JudgeArtworkAwards",
                column: "AwardId");

            migrationBuilder.CreateIndex(
                name: "IX_JudgeArtworkAwards_JudgeId",
                table: "JudgeArtworkAwards",
                column: "JudgeId");

            migrationBuilder.CreateIndex(
                name: "IX_JudgeComments_JudgeId",
                table: "JudgeComments",
                column: "JudgeId");

            migrationBuilder.CreateIndex(
                name: "IX_JudgeComments_MediaFileId",
                table: "JudgeComments",
                column: "MediaFileId");

            migrationBuilder.CreateIndex(
                name: "IX_JudgeContestantAwards_AwardId",
                table: "JudgeContestantAwards",
                column: "AwardId");

            migrationBuilder.CreateIndex(
                name: "IX_JudgeContestantAwards_JudgeId",
                table: "JudgeContestantAwards",
                column: "JudgeId");

            migrationBuilder.CreateIndex(
                name: "IX_MediaFiles_ArtWorkId",
                table: "MediaFiles",
                column: "ArtWorkId");

            migrationBuilder.CreateIndex(
                name: "IX_NewsComments_NewsId",
                table: "NewsComments",
                column: "NewsId");

            migrationBuilder.AddForeignKey(
                name: "FK_ArtWorks_ArtworkAwards_AwardId",
                table: "ArtWorks",
                column: "AwardId",
                principalTable: "ArtworkAwards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Contestant_ContestantAwards_AwardId",
                table: "Contestant",
                column: "AwardId",
                principalTable: "ContestantAwards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtworkAwards_ArtWorks_FirstPlaceArtworkId",
                table: "ArtworkAwards");

            migrationBuilder.DropForeignKey(
                name: "FK_ArtworkAwards_ArtWorks_SecondPlaceArtworkId",
                table: "ArtworkAwards");

            migrationBuilder.DropForeignKey(
                name: "FK_Contestant_AspNetUsers_NomineeId",
                table: "Contestant");

            migrationBuilder.DropForeignKey(
                name: "FK_ContestantAwards_AspNetUsers_ManagerId",
                table: "ContestantAwards");

            migrationBuilder.DropForeignKey(
                name: "FK_Contestant_ContestantAwards_AwardId",
                table: "Contestant");

            migrationBuilder.DropTable(
                name: "AlbumItems");

            migrationBuilder.DropTable(
                name: "ArtworkCategories");

            migrationBuilder.DropTable(
                name: "ArtworkGenres");

            migrationBuilder.DropTable(
                name: "ArtWorkPayments");

            migrationBuilder.DropTable(
                name: "ArtworkReviews");

            migrationBuilder.DropTable(
                name: "ArtworkVotes");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "AuditEntryProperties");

            migrationBuilder.DropTable(
                name: "BoothPurchases");

            migrationBuilder.DropTable(
                name: "ContactUsSubjects");

            migrationBuilder.DropTable(
                name: "Contents");

            migrationBuilder.DropTable(
                name: "ContestantVotes");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "JudgeArtworkAwards");

            migrationBuilder.DropTable(
                name: "JudgeComments");

            migrationBuilder.DropTable(
                name: "JudgeContestantAwards");

            migrationBuilder.DropTable(
                name: "NewsComments");

            migrationBuilder.DropTable(
                name: "ProductionYears");

            migrationBuilder.DropTable(
                name: "Albums");

            migrationBuilder.DropTable(
                name: "ArtworkVotingCriterias");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AuditEntries");

            migrationBuilder.DropTable(
                name: "Booths");

            migrationBuilder.DropTable(
                name: "BoothPayments");

            migrationBuilder.DropTable(
                name: "ContestantVotingCriterias");

            migrationBuilder.DropTable(
                name: "MediaFiles");

            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropTable(
                name: "ArtWorks");

            migrationBuilder.DropTable(
                name: "ArtworkAwards");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "ContestantAwards");

            migrationBuilder.DropTable(
                name: "Contestant");
        }
    }
}
