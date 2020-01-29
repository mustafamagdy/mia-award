using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class AlbumTitle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PosterKey",
                table: "AlbumItems",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PosterUrl",
                table: "AlbumItems",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "AlbumItems",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PosterKey",
                table: "AlbumItems");

            migrationBuilder.DropColumn(
                name: "PosterUrl",
                table: "AlbumItems");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "AlbumItems");
        }
    }
}
