using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class AwardNomineeWinners : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FirstPlaceArtworkId",
                table: "ArtworkAwards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecondPlaceArtworkId",
                table: "ArtworkAwards",
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
                table: "ArtworkAwards",
                column: "FirstPlaceArtworkId",
                unique: true,
                filter: "[FirstPlaceArtworkId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Awards_SecondPlaceArtworkId",
                table: "ArtworkAwards",
                column: "SecondPlaceArtworkId",
                unique: true,
                filter: "[SecondPlaceArtworkId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Awards_ArtWorks_FirstPlaceArtworkId",
                table: "ArtworkAwards",
                column: "FirstPlaceArtworkId",
                principalTable: "ArtWorks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Awards_ArtWorks_SecondPlaceArtworkId",
                table: "ArtworkAwards",
                column: "SecondPlaceArtworkId",
                principalTable: "ArtWorks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Awards_ArtWorks_FirstPlaceArtworkId",
                table: "ArtworkAwards");

            migrationBuilder.DropForeignKey(
                name: "FK_Awards_ArtWorks_SecondPlaceArtworkId",
                table: "ArtworkAwards");

            migrationBuilder.DropIndex(
                name: "IX_Awards_FirstPlaceArtworkId",
                table: "ArtworkAwards");

            migrationBuilder.DropIndex(
                name: "IX_Awards_SecondPlaceArtworkId",
                table: "ArtworkAwards");

            migrationBuilder.DropColumn(
                name: "FirstPlaceArtworkId",
                table: "ArtworkAwards");

            migrationBuilder.DropColumn(
                name: "SecondPlaceArtworkId",
                table: "ArtworkAwards");

            migrationBuilder.DropColumn(
                name: "WinnerAwardFirstPlaceId",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "WinnerAwardSecondPlaceId",
                table: "ArtWorks");
        }
    }
}
