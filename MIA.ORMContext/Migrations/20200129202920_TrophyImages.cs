using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class TrophyImages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Awards_Images_TrophyId",
                table: "ArtworkAwards");

            migrationBuilder.DropIndex(
                name: "IX_Awards_TrophyId",
                table: "ArtworkAwards");

            migrationBuilder.RenameColumn(
                name: "TrophyId",
                table: "ArtworkAwards",
                newName: "TrophyImageUrl");

            migrationBuilder.AlterColumn<string>(
                name: "TrophyImageUrl",
                table: "ArtworkAwards",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "ArtworkAwards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrophyImageKey",
                table: "ArtworkAwards",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "ArtworkAwards");

            migrationBuilder.DropColumn(
                name: "TrophyImageKey",
                table: "ArtworkAwards");

            migrationBuilder.RenameColumn(
                name: "TrophyImageUrl",
                table: "ArtworkAwards",
                newName: "TrophyId");

            migrationBuilder.AlterColumn<string>(
                name: "TrophyId",
                table: "ArtworkAwards",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Awards_TrophyId",
                table: "ArtworkAwards",
                column: "TrophyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Awards_Images_TrophyId",
                table: "ArtworkAwards",
                column: "TrophyId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
