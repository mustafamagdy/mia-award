using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class ArtworkIllegibleLevel1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "IllegibleForJudge",
                table: "Artworks",
                nullable: true,
                oldClrType: typeof(bool));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "IllegibleForJudge",
                table: "Artworks",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);
        }
    }
}
