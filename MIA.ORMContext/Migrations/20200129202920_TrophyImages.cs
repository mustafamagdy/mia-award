using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class TrophyImages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Awards_Images_TrophyId",
                table: "Awards");

            migrationBuilder.DropIndex(
                name: "IX_Awards_TrophyId",
                table: "Awards");

            migrationBuilder.RenameColumn(
                name: "TrophyId",
                table: "Awards",
                newName: "TrophyImageUrl");

            migrationBuilder.AlterColumn<string>(
                name: "TrophyImageUrl",
                table: "Awards",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Awards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrophyImageKey",
                table: "Awards",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "Awards");

            migrationBuilder.DropColumn(
                name: "TrophyImageKey",
                table: "Awards");

            migrationBuilder.RenameColumn(
                name: "TrophyImageUrl",
                table: "Awards",
                newName: "TrophyId");

            migrationBuilder.AlterColumn<string>(
                name: "TrophyId",
                table: "Awards",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Awards_TrophyId",
                table: "Awards",
                column: "TrophyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Awards_Images_TrophyId",
                table: "Awards",
                column: "TrophyId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
