using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class ArtworkSubjectRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Generes",
                table: "Generes");

            migrationBuilder.RenameTable(
                name: "Generes",
                newName: "Genres");

            migrationBuilder.AddColumn<string>(
                name: "YourRoleId",
                table: "Artworks",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Genres",
                table: "Genres",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "ArtworkSubjects",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtworkSubjects", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Artworks_YourRoleId",
                table: "Artworks",
                column: "YourRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Artworks_ArtworkSubjects_YourRoleId",
                table: "Artworks",
                column: "YourRoleId",
                principalTable: "ArtworkSubjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artworks_ArtworkSubjects_YourRoleId",
                table: "Artworks");

            migrationBuilder.DropTable(
                name: "ArtworkSubjects");

            migrationBuilder.DropIndex(
                name: "IX_Artworks_YourRoleId",
                table: "Artworks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Genres",
                table: "Genres");

            migrationBuilder.DropColumn(
                name: "YourRoleId",
                table: "Artworks");

            migrationBuilder.RenameTable(
                name: "Genres",
                newName: "Generes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Generes",
                table: "Generes",
                column: "Id");
        }
    }
}
