using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class AddTrailerPosterIdAndUrlColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TrailerPosterId",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrailerPosterUrl",
                table: "ArtWorks",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TrailerPosterId",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "TrailerPosterUrl",
                table: "ArtWorks");
        }
    }
}
