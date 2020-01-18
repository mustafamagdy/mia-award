using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class addtitlefiledphotoalbum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "PhotoAlbums",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "PhotoAlbums");
        }
    }
}
