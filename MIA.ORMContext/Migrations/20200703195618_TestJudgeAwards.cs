using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class TestJudgeAwards : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JudgeAwards_Awards_AwardId1",
                table: "JudgeAwards");

            migrationBuilder.DropIndex(
                name: "IX_JudgeAwards_AwardId1",
                table: "JudgeAwards");

            migrationBuilder.DropColumn(
                name: "AwardId1",
                table: "JudgeAwards");

            migrationBuilder.AddColumn<int>(
                name: "Level",
                table: "JudgeAwards",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Level",
                table: "JudgeAwards");

            migrationBuilder.AddColumn<string>(
                name: "AwardId1",
                table: "JudgeAwards",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_JudgeAwards_AwardId1",
                table: "JudgeAwards",
                column: "AwardId1");

            migrationBuilder.AddForeignKey(
                name: "FK_JudgeAwards_Awards_AwardId1",
                table: "JudgeAwards",
                column: "AwardId1",
                principalTable: "Awards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
