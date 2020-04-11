using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class ArtworkContestantVotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtWorkPayments_ArtWorks_ArtworkId",
                table: "ArtWorkPayments");

            migrationBuilder.DropForeignKey(
                name: "FK_MediaFiles_ArtWorks_ArtworkId",
                table: "MediaFiles");

            migrationBuilder.DropTable(
                name: "JudgeVotes");

            migrationBuilder.DropIndex(
                name: "IX_ArtWorkPayments_ArtworkId",
                table: "ArtWorkPayments");

            migrationBuilder.RenameColumn(
                name: "ArtworkId",
                table: "MediaFiles",
                newName: "ArtWorkId");

            migrationBuilder.RenameIndex(
                name: "IX_MediaFiles_ArtworkId",
                table: "MediaFiles",
                newName: "IX_MediaFiles_ArtWorkId");

            migrationBuilder.RenameColumn(
                name: "ArtworkId",
                table: "ArtWorkPayments",
                newName: "ArtWorkId");

            migrationBuilder.AddColumn<string>(
                name: "AwardId",
                table: "ArtworkVotingCriterias",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AwardType",
                table: "ArtworkAwards",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ArtworkVotes",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    VotingValue = table.Column<int>(nullable: false),
                    CriteriaId = table.Column<string>(nullable: true),
                    JudgeId = table.Column<string>(nullable: true),
                    JudgeComplete = table.Column<bool>(nullable: false),
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
                        name: "FK_ArtworkVotes_VotingCriterias_CriteriaId",
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
                    AwardId = table.Column<string>(nullable: true),
                    NomineeId = table.Column<string>(nullable: true),
                    WinnerAwardFirstPlaceId = table.Column<string>(nullable: true),
                    WinnerAwardSecondPlaceId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contestant", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contestant_Awards_AwardId",
                        column: x => x.AwardId,
                        principalTable: "ArtworkAwards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Contestant_AspNetUsers_NomineeId",
                        column: x => x.NomineeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Contestant_Awards_WinnerAwardFirstPlaceId",
                        column: x => x.WinnerAwardFirstPlaceId,
                        principalTable: "ArtworkAwards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Contestant_Awards_WinnerAwardSecondPlaceId",
                        column: x => x.WinnerAwardSecondPlaceId,
                        principalTable: "ArtworkAwards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ContestantVotes",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    VotingValue = table.Column<int>(nullable: false),
                    CriteriaId = table.Column<string>(nullable: true),
                    JudgeId = table.Column<string>(nullable: true),
                    JudgeComplete = table.Column<bool>(nullable: false),
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
                        name: "FK_ContestantVotes_VotingCriterias_CriteriaId",
                        column: x => x.CriteriaId,
                        principalTable: "ArtworkVotingCriterias",
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
                name: "IX_VotingCriterias_AwardId",
                table: "ArtworkVotingCriterias",
                column: "AwardId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtWorkPayments_ArtWorkId",
                table: "ArtWorkPayments",
                column: "ArtWorkId",
                unique: true,
                filter: "[ArtWorkId] IS NOT NULL");

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
                name: "IX_Contestant_AwardId",
                table: "Contestant",
                column: "AwardId");

            migrationBuilder.CreateIndex(
                name: "IX_Contestant_NomineeId",
                table: "Contestant",
                column: "NomineeId");

            migrationBuilder.CreateIndex(
                name: "IX_Contestant_WinnerAwardFirstPlaceId",
                table: "Contestant",
                column: "WinnerAwardFirstPlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Contestant_WinnerAwardSecondPlaceId",
                table: "Contestant",
                column: "WinnerAwardSecondPlaceId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_ArtWorkPayments_ArtWorks_ArtWorkId",
                table: "ArtWorkPayments",
                column: "ArtWorkId",
                principalTable: "ArtWorks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MediaFiles_ArtWorks_ArtWorkId",
                table: "MediaFiles",
                column: "ArtWorkId",
                principalTable: "ArtWorks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_VotingCriterias_Awards_AwardId",
                table: "ArtworkVotingCriterias",
                column: "AwardId",
                principalTable: "ArtworkAwards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtWorkPayments_ArtWorks_ArtWorkId",
                table: "ArtWorkPayments");

            migrationBuilder.DropForeignKey(
                name: "FK_MediaFiles_ArtWorks_ArtWorkId",
                table: "MediaFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_VotingCriterias_Awards_AwardId",
                table: "ArtworkVotingCriterias");

            migrationBuilder.DropTable(
                name: "ArtworkVotes");

            migrationBuilder.DropTable(
                name: "ContestantVotes");

            migrationBuilder.DropTable(
                name: "Contestant");

            migrationBuilder.DropIndex(
                name: "IX_VotingCriterias_AwardId",
                table: "ArtworkVotingCriterias");

            migrationBuilder.DropIndex(
                name: "IX_ArtWorkPayments_ArtWorkId",
                table: "ArtWorkPayments");

            migrationBuilder.DropColumn(
                name: "AwardId",
                table: "ArtworkVotingCriterias");

            migrationBuilder.DropColumn(
                name: "AwardType",
                table: "ArtworkAwards");

            migrationBuilder.RenameColumn(
                name: "ArtWorkId",
                table: "MediaFiles",
                newName: "ArtworkId");

            migrationBuilder.RenameIndex(
                name: "IX_MediaFiles_ArtWorkId",
                table: "MediaFiles",
                newName: "IX_MediaFiles_ArtworkId");

            migrationBuilder.RenameColumn(
                name: "ArtWorkId",
                table: "ArtWorkPayments",
                newName: "ArtworkId");

            migrationBuilder.CreateTable(
                name: "JudgeVotes",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    CriteriaId = table.Column<string>(nullable: true),
                    JudgeComplete = table.Column<bool>(nullable: false),
                    JudgeId = table.Column<string>(nullable: true),
                    ArtworkId = table.Column<string>(nullable: true),
                    VotingValue = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JudgeVotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JudgeVotes_VotingCriterias_CriteriaId",
                        column: x => x.CriteriaId,
                        principalTable: "ArtworkVotingCriterias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_JudgeVotes_AspNetUsers_JudgeId",
                        column: x => x.JudgeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_JudgeVotes_ArtWorks_ArtworkId",
                        column: x => x.ArtworkId,
                        principalTable: "ArtWorks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArtWorkPayments_ArtworkId",
                table: "ArtWorkPayments",
                column: "ArtworkId",
                unique: true,
                filter: "[ArtworkId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_JudgeVotes_CriteriaId",
                table: "JudgeVotes",
                column: "CriteriaId");

            migrationBuilder.CreateIndex(
                name: "IX_JudgeVotes_JudgeId",
                table: "JudgeVotes",
                column: "JudgeId");

            migrationBuilder.CreateIndex(
                name: "IX_JudgeVotes_ArtworkId",
                table: "JudgeVotes",
                column: "ArtworkId");

            migrationBuilder.AddForeignKey(
                name: "FK_ArtWorkPayments_ArtWorks_ArtworkId",
                table: "ArtWorkPayments",
                column: "ArtworkId",
                principalTable: "ArtWorks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MediaFiles_ArtWorks_ArtworkId",
                table: "MediaFiles",
                column: "ArtworkId",
                principalTable: "ArtWorks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
