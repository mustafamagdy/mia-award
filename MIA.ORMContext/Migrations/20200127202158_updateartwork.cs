using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class updateartwork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Crew",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DateOfRelease",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Director",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "PostedDate",
                table: "ArtWorks",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "PosterId",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PosterUrl",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Production",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Rate",
                table: "ArtWorks",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "ShowDescription",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Stars",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Story",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrailerId",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrailerUrl",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Writers",
                table: "ArtWorks",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "Crew",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "DateOfRelease",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "Director",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "PostedDate",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "PosterId",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "PosterUrl",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "Production",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "Rate",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "ShowDescription",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "Stars",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "Story",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "TrailerId",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "TrailerUrl",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "Writers",
                table: "ArtWorks");
        }
    }
}
