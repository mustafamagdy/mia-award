using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class OfflinePayment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsOffline",
                table: "ArtWorkPayments",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsOffline",
                table: "ArtWorkPayments");
        }
    }
}
