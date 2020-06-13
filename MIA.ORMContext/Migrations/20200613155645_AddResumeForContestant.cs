using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class AddResumeForContestant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Resume_FileKey",
                table: "Artworks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Resume_FileUrl",
                table: "Artworks",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Resume_FileKey",
                table: "Artworks");

            migrationBuilder.DropColumn(
                name: "Resume_FileUrl",
                table: "Artworks");
        }
    }
}
