using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class AwardNomineeWinners : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FirstPlaceId",
                table: "Awards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstPlaceNomineeId",
                table: "Awards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecondPlaceId",
                table: "Awards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecondPlaceNomineeId",
                table: "Awards",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Awards_FirstPlaceId",
                table: "Awards",
                column: "FirstPlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Awards_SecondPlaceId",
                table: "Awards",
                column: "SecondPlaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Awards_AspNetUsers_FirstPlaceId",
                table: "Awards",
                column: "FirstPlaceId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Awards_AspNetUsers_SecondPlaceId",
                table: "Awards",
                column: "SecondPlaceId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Awards_AspNetUsers_FirstPlaceId",
                table: "Awards");

            migrationBuilder.DropForeignKey(
                name: "FK_Awards_AspNetUsers_SecondPlaceId",
                table: "Awards");

            migrationBuilder.DropIndex(
                name: "IX_Awards_FirstPlaceId",
                table: "Awards");

            migrationBuilder.DropIndex(
                name: "IX_Awards_SecondPlaceId",
                table: "Awards");

            migrationBuilder.DropColumn(
                name: "FirstPlaceId",
                table: "Awards");

            migrationBuilder.DropColumn(
                name: "FirstPlaceNomineeId",
                table: "Awards");

            migrationBuilder.DropColumn(
                name: "SecondPlaceId",
                table: "Awards");

            migrationBuilder.DropColumn(
                name: "SecondPlaceNomineeId",
                table: "Awards");
        }
    }
}
