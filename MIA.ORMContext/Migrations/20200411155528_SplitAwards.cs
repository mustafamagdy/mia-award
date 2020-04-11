using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class SplitAwards : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contestant_ArtworkAwards_AwardId",
                table: "Contestant");

            migrationBuilder.DropForeignKey(
                name: "FK_Contestant_ArtworkAwards_WinnerAwardFirstPlaceId",
                table: "Contestant");

            migrationBuilder.DropForeignKey(
                name: "FK_Contestant_ArtworkAwards_WinnerAwardSecondPlaceId",
                table: "Contestant");

            migrationBuilder.DropForeignKey(
                name: "FK_ContestantVotes_ArtworkVotingCriterias_CriteriaId",
                table: "ContestantVotes");

            migrationBuilder.DropTable(
                name: "UserModules");

            migrationBuilder.DropIndex(
                name: "IX_Contestant_NomineeId",
                table: "Contestant");

            migrationBuilder.DropIndex(
                name: "IX_Contestant_WinnerAwardFirstPlaceId",
                table: "Contestant");

            migrationBuilder.DropIndex(
                name: "IX_Contestant_WinnerAwardSecondPlaceId",
                table: "Contestant");

            migrationBuilder.AlterColumn<string>(
                name: "WinnerAwardSecondPlaceId",
                table: "Contestant",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "WinnerAwardFirstPlaceId",
                table: "Contestant",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContestantId",
                table: "AspNetUsers",
                nullable: true);

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
                name: "IX_ContestantVotingCriterias_AwardId",
                table: "ContestantVotingCriterias",
                column: "AwardId");

            migrationBuilder.CreateIndex(
                name: "IX_JudgeContestantAwards_AwardId",
                table: "JudgeContestantAwards",
                column: "AwardId");

            migrationBuilder.CreateIndex(
                name: "IX_JudgeContestantAwards_JudgeId",
                table: "JudgeContestantAwards",
                column: "JudgeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contestant_ContestantAwards_AwardId",
                table: "Contestant",
                column: "AwardId",
                principalTable: "ContestantAwards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ContestantVotes_ContestantVotingCriterias_CriteriaId",
                table: "ContestantVotes",
                column: "CriteriaId",
                principalTable: "ContestantVotingCriterias",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contestant_ContestantAwards_AwardId",
                table: "Contestant");

            migrationBuilder.DropForeignKey(
                name: "FK_ContestantVotes_ContestantVotingCriterias_CriteriaId",
                table: "ContestantVotes");

            migrationBuilder.DropTable(
                name: "ContestantVotingCriterias");

            migrationBuilder.DropTable(
                name: "JudgeContestantAwards");

            migrationBuilder.DropTable(
                name: "ContestantAwards");

            migrationBuilder.DropIndex(
                name: "IX_Contestant_NomineeId",
                table: "Contestant");

            migrationBuilder.DropColumn(
                name: "ContestantId",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "WinnerAwardSecondPlaceId",
                table: "Contestant",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "WinnerAwardFirstPlaceId",
                table: "Contestant",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "UserModules",
                columns: table => new
                {
                    UserId = table.Column<string>(maxLength: 100, nullable: false),
                    AllowedModules = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserModules", x => x.UserId);
                });

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

            migrationBuilder.AddForeignKey(
                name: "FK_Contestant_ArtworkAwards_AwardId",
                table: "Contestant",
                column: "AwardId",
                principalTable: "ArtworkAwards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Contestant_ArtworkAwards_WinnerAwardFirstPlaceId",
                table: "Contestant",
                column: "WinnerAwardFirstPlaceId",
                principalTable: "ArtworkAwards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Contestant_ArtworkAwards_WinnerAwardSecondPlaceId",
                table: "Contestant",
                column: "WinnerAwardSecondPlaceId",
                principalTable: "ArtworkAwards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ContestantVotes_ArtworkVotingCriterias_CriteriaId",
                table: "ContestantVotes",
                column: "CriteriaId",
                principalTable: "ArtworkVotingCriterias",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
