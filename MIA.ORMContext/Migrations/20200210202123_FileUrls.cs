using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class FileUrls : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileKey",
                table: "MediaFiles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FileUrl",
                table: "MediaFiles",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileKey",
                table: "MediaFiles");

            migrationBuilder.DropColumn(
                name: "FileUrl",
                table: "MediaFiles");
        }
    }
}
