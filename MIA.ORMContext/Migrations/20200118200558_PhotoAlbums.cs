using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class PhotoAlbums : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_PhotoAlbums_PhotoAlbumId",
                table: "Images");

            migrationBuilder.DropTable(
                name: "PhotoAlbums");

            migrationBuilder.DropIndex(
                name: "IX_Images_PhotoAlbumId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "MediaType",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "PhotoAlbumId",
                table: "Images");

            migrationBuilder.CreateTable(
                name: "Albums",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Albums", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AlbumItems",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    FileKey = table.Column<string>(nullable: true),
                    FileUrl = table.Column<string>(nullable: true),
                    MediaType = table.Column<int>(nullable: false),
                    Order = table.Column<int>(nullable: false),
                    AlbumId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlbumItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AlbumItems_Albums_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "Albums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AlbumItems_AlbumId",
                table: "AlbumItems",
                column: "AlbumId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AlbumItems");

            migrationBuilder.DropTable(
                name: "Albums");

            migrationBuilder.AddColumn<int>(
                name: "MediaType",
                table: "Images",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Images",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhotoAlbumId",
                table: "Images",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PhotoAlbums",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhotoAlbums", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_PhotoAlbumId",
                table: "Images",
                column: "PhotoAlbumId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_PhotoAlbums_PhotoAlbumId",
                table: "Images",
                column: "PhotoAlbumId",
                principalTable: "PhotoAlbums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
