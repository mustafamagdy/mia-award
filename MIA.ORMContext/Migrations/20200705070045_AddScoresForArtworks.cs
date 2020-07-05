using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class AddScoresForArtworks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ArtworkScores",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    ArtworkId = table.Column<string>(nullable: true),
                    JudgeId = table.Column<string>(nullable: true),
                    Level = table.Column<int>(nullable: false),
                    Score = table.Column<decimal>(nullable: false),
                    ScoreTotal = table.Column<decimal>(nullable: false),
                    Percentage = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtworkScores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArtworkScores_Artworks_ArtworkId",
                        column: x => x.ArtworkId,
                        principalTable: "Artworks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ArtworkScores_AspNetUsers_JudgeId",
                        column: x => x.JudgeId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArtworkScores_ArtworkId",
                table: "ArtworkScores",
                column: "ArtworkId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtworkScores_JudgeId",
                table: "ArtworkScores",
                column: "JudgeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArtworkScores");
        }
    }
}
