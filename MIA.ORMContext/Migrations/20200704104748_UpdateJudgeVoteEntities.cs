using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class UpdateJudgeVoteEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JudgeComplete",
                table: "JudgeVotes");

            migrationBuilder.AlterColumn<int>(
                name: "VotingValue",
                table: "JudgeVotes",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "VotingValue",
                table: "JudgeVotes",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "JudgeComplete",
                table: "JudgeVotes",
                nullable: false,
                defaultValue: false);
        }
    }
}
