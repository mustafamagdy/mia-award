using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class addfieldsphotoalbum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Body",
                table: "PhotoAlbums");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "PhotoAlbums");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "PhotoAlbums");

            migrationBuilder.AddColumn<int>(
                name: "MediaType",
                table: "Images",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Images",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FileCount",
                table: "ArtWorks",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PaymentStatus",
                table: "ArtWorkPayments",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MediaType",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "FileCount",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "PaymentStatus",
                table: "ArtWorkPayments");

            migrationBuilder.AddColumn<string>(
                name: "Body",
                table: "PhotoAlbums",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "PhotoAlbums",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "PhotoAlbums",
                nullable: true);
        }
    }
}
