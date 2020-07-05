using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class FixDecimalPerceision : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Weight",
                table: "VotingCriterias",
                type: "decimal(12,4)",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<decimal>(
                name: "ScoreTotal",
                table: "ArtworkScores",
                type: "decimal(12,4)",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<decimal>(
                name: "Score",
                table: "ArtworkScores",
                type: "decimal(12,4)",
                nullable: false,
                oldClrType: typeof(decimal));

            migrationBuilder.AlterColumn<decimal>(
                name: "Percentage",
                table: "ArtworkScores",
                type: "decimal(12,4)",
                nullable: false,
                oldClrType: typeof(decimal));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Weight",
                table: "VotingCriterias",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(12,4)");

            migrationBuilder.AlterColumn<decimal>(
                name: "ScoreTotal",
                table: "ArtworkScores",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(12,4)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Score",
                table: "ArtworkScores",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(12,4)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Percentage",
                table: "ArtworkScores",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(12,4)");
        }
    }
}
