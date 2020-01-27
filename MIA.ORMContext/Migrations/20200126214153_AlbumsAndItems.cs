using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class AlbumsAndItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "MainGallery",
                table: "Albums",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "DateCreated",
                table: "AlbumItems",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<bool>(
                name: "Featured",
                table: "AlbumItems",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MainGallery",
                table: "Albums");

            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "AlbumItems");

            migrationBuilder.DropColumn(
                name: "Featured",
                table: "AlbumItems");
        }
    }
}
