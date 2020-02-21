using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class AwardNomineeWinners : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FirstPlaceArtworkId",
                table: "Awards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecondPlaceArtworkId",
                table: "Awards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WinnerAwardFirstPlaceId",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WinnerAwardSecondPlaceId",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Awards_FirstPlaceArtworkId",
                table: "Awards",
                column: "FirstPlaceArtworkId",
                unique: true,
                filter: "[FirstPlaceArtworkId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Awards_SecondPlaceArtworkId",
                table: "Awards",
                column: "SecondPlaceArtworkId",
                unique: true,
                filter: "[SecondPlaceArtworkId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Awards_ArtWorks_FirstPlaceArtworkId",
                table: "Awards",
                column: "FirstPlaceArtworkId",
                principalTable: "ArtWorks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Awards_ArtWorks_SecondPlaceArtworkId",
                table: "Awards",
                column: "SecondPlaceArtworkId",
                principalTable: "ArtWorks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Awards_ArtWorks_FirstPlaceArtworkId",
                table: "Awards");

            migrationBuilder.DropForeignKey(
                name: "FK_Awards_ArtWorks_SecondPlaceArtworkId",
                table: "Awards");

            migrationBuilder.DropIndex(
                name: "IX_Awards_FirstPlaceArtworkId",
                table: "Awards");

            migrationBuilder.DropIndex(
                name: "IX_Awards_SecondPlaceArtworkId",
                table: "Awards");

            migrationBuilder.DropColumn(
                name: "FirstPlaceArtworkId",
                table: "Awards");

            migrationBuilder.DropColumn(
                name: "SecondPlaceArtworkId",
                table: "Awards");

            migrationBuilder.DropColumn(
                name: "WinnerAwardFirstPlaceId",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "WinnerAwardSecondPlaceId",
                table: "ArtWorks");
        }
    }
}
