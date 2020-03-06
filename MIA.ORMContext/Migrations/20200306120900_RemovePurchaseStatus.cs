using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class RemovePurchaseStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailVerified",
                table: "BoothPurchases");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "BoothPurchases");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmailVerified",
                table: "BoothPurchases",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "BoothPurchases",
                nullable: false,
                defaultValue: 0);
        }
    }
}
