using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class InitialModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoAlbumId",
                table: "Images",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "JudgeAwardId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BoothPayments",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    TransactionNumber = table.Column<string>(nullable: true),
                    Amount = table.Column<decimal>(nullable: false),
                    PaymentDate = table.Column<long>(nullable: false),
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
                    Description = table.Column<string>(nullable: true),
                    Price = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Booths", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "JudgeAwards",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JudgeAwards", x => x.Id);
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
                    ImageId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_News", x => x.Id);
                    table.ForeignKey(
                        name: "FK_News_Images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PhotoAlbums",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Body = table.Column<string>(nullable: true),
                    Order = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhotoAlbums", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VotingCriterias",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Weight = table.Column<decimal>(nullable: false),
                    Order = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VotingCriterias", x => x.Id);
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
                    EmailVerified = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
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
                name: "Awards",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    TrophyId = table.Column<string>(nullable: true),
                    JudgeAwardId = table.Column<string>(nullable: true),
                    ManagerId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Awards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Awards_JudgeAwards_JudgeAwardId",
                        column: x => x.JudgeAwardId,
                        principalTable: "JudgeAwards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Awards_AspNetUsers_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Awards_Images_TrophyId",
                        column: x => x.TrophyId,
                        principalTable: "Images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ArtWorks",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UploadComplete = table.Column<bool>(nullable: false),
                    AwardId = table.Column<string>(nullable: true),
                    NomineeId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtWorks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArtWorks_Awards_AwardId",
                        column: x => x.AwardId,
                        principalTable: "Awards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ArtWorks_AspNetUsers_NomineeId",
                        column: x => x.NomineeId,
                        principalTable: "AspNetUsers",
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
                    NomineeId = table.Column<string>(nullable: true),
                    ArtWorkId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtWorkPayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArtWorkPayments_ArtWorks_NomineeId",
                        column: x => x.NomineeId,
                        principalTable: "ArtWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ArtWorkPayments_AspNetUsers_NomineeId",
                        column: x => x.NomineeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "JudgeVotes",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    VotingValue = table.Column<int>(nullable: false),
                    ArtWorkId = table.Column<string>(nullable: true),
                    CriteriaId = table.Column<string>(nullable: true),
                    JudgeId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JudgeVotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JudgeVotes_ArtWorks_ArtWorkId",
                        column: x => x.ArtWorkId,
                        principalTable: "ArtWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_JudgeVotes_VotingCriterias_CriteriaId",
                        column: x => x.CriteriaId,
                        principalTable: "VotingCriterias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_JudgeVotes_AspNetUsers_JudgeId",
                        column: x => x.JudgeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MediaFiles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UploadDate = table.Column<long>(nullable: false),
                    Description = table.Column<string>(nullable: true),
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

            migrationBuilder.CreateIndex(
                name: "IX_Images_PhotoAlbumId",
                table: "Images",
                column: "PhotoAlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_JudgeAwardId",
                table: "AspNetUsers",
                column: "JudgeAwardId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtWorkPayments_NomineeId",
                table: "ArtWorkPayments",
                column: "NomineeId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtWorks_AwardId",
                table: "ArtWorks",
                column: "AwardId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtWorks_NomineeId",
                table: "ArtWorks",
                column: "NomineeId");

            migrationBuilder.CreateIndex(
                name: "IX_Awards_JudgeAwardId",
                table: "Awards",
                column: "JudgeAwardId");

            migrationBuilder.CreateIndex(
                name: "IX_Awards_ManagerId",
                table: "Awards",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_Awards_TrophyId",
                table: "Awards",
                column: "TrophyId");

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
                name: "IX_JudgeComments_JudgeId",
                table: "JudgeComments",
                column: "JudgeId");

            migrationBuilder.CreateIndex(
                name: "IX_JudgeComments_MediaFileId",
                table: "JudgeComments",
                column: "MediaFileId");

            migrationBuilder.CreateIndex(
                name: "IX_JudgeVotes_ArtWorkId",
                table: "JudgeVotes",
                column: "ArtWorkId");

            migrationBuilder.CreateIndex(
                name: "IX_JudgeVotes_CriteriaId",
                table: "JudgeVotes",
                column: "CriteriaId");

            migrationBuilder.CreateIndex(
                name: "IX_JudgeVotes_JudgeId",
                table: "JudgeVotes",
                column: "JudgeId");

            migrationBuilder.CreateIndex(
                name: "IX_MediaFiles_ArtWorkId",
                table: "MediaFiles",
                column: "ArtWorkId");

            migrationBuilder.CreateIndex(
                name: "IX_News_ImageId",
                table: "News",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_JudgeAwards_JudgeAwardId",
                table: "AspNetUsers",
                column: "JudgeAwardId",
                principalTable: "JudgeAwards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_PhotoAlbums_PhotoAlbumId",
                table: "Images",
                column: "PhotoAlbumId",
                principalTable: "PhotoAlbums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_JudgeAwards_JudgeAwardId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_PhotoAlbums_PhotoAlbumId",
                table: "Images");

            migrationBuilder.DropTable(
                name: "ArtWorkPayments");

            migrationBuilder.DropTable(
                name: "BoothPurchases");

            migrationBuilder.DropTable(
                name: "JudgeComments");

            migrationBuilder.DropTable(
                name: "JudgeVotes");

            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropTable(
                name: "PhotoAlbums");

            migrationBuilder.DropTable(
                name: "Booths");

            migrationBuilder.DropTable(
                name: "BoothPayments");

            migrationBuilder.DropTable(
                name: "MediaFiles");

            migrationBuilder.DropTable(
                name: "VotingCriterias");

            migrationBuilder.DropTable(
                name: "ArtWorks");

            migrationBuilder.DropTable(
                name: "Awards");

            migrationBuilder.DropTable(
                name: "JudgeAwards");

            migrationBuilder.DropIndex(
                name: "IX_Images_PhotoAlbumId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_JudgeAwardId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PhotoAlbumId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "JudgeAwardId",
                table: "AspNetUsers");
        }
    }
}
