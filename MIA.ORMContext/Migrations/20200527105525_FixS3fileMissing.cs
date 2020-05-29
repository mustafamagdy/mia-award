using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class FixS3fileMissing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PosterId",
                table: "News");

            migrationBuilder.DropColumn(
                name: "PosterUrl",
                table: "News");

            migrationBuilder.RenameColumn(
                name: "FileUrl",
                table: "MediaFiles",
                newName: "File_FileUrl");

            migrationBuilder.RenameColumn(
                name: "FileKey",
                table: "MediaFiles",
                newName: "File_FileKey");

            migrationBuilder.RenameColumn(
                name: "TrophyImageUrl",
                table: "Awards",
                newName: "Trophy_FileUrl");

            migrationBuilder.RenameColumn(
                name: "TrophyImageKey",
                table: "Awards",
                newName: "Trophy_FileKey");

            migrationBuilder.RenameColumn(
                name: "FileUrl",
                table: "AlbumItems",
                newName: "Poster_FileUrl");

            migrationBuilder.RenameColumn(
                name: "FileKey",
                table: "AlbumItems",
                newName: "Poster_FileKey");

            migrationBuilder.RenameColumn(
                name: "PosterUrl",
                table: "AlbumItems",
                newName: "File_FileUrl");

            migrationBuilder.RenameColumn(
                name: "PosterKey",
                table: "AlbumItems",
                newName: "File_FileKey");

            migrationBuilder.AddColumn<string>(
                name: "Poster_FileKey",
                table: "News",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Poster_FileUrl",
                table: "News",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Poster_FileKey",
                table: "News");

            migrationBuilder.DropColumn(
                name: "Poster_FileUrl",
                table: "News");

            migrationBuilder.RenameColumn(
                name: "File_FileUrl",
                table: "MediaFiles",
                newName: "FileUrl");

            migrationBuilder.RenameColumn(
                name: "File_FileKey",
                table: "MediaFiles",
                newName: "FileKey");

            migrationBuilder.RenameColumn(
                name: "Trophy_FileUrl",
                table: "Awards",
                newName: "TrophyImageUrl");

            migrationBuilder.RenameColumn(
                name: "Trophy_FileKey",
                table: "Awards",
                newName: "TrophyImageKey");

            migrationBuilder.RenameColumn(
                name: "Poster_FileUrl",
                table: "AlbumItems",
                newName: "FileUrl");

            migrationBuilder.RenameColumn(
                name: "Poster_FileKey",
                table: "AlbumItems",
                newName: "FileKey");

            migrationBuilder.RenameColumn(
                name: "File_FileUrl",
                table: "AlbumItems",
                newName: "PosterUrl");

            migrationBuilder.RenameColumn(
                name: "File_FileKey",
                table: "AlbumItems",
                newName: "PosterKey");

            migrationBuilder.AddColumn<string>(
                name: "PosterId",
                table: "News",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PosterUrl",
                table: "News",
                maxLength: 1000,
                nullable: true);
        }
    }
}
