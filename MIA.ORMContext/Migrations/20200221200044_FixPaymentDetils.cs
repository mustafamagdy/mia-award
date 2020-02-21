using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class FixPaymentDetils : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PaymentStatus",
                table: "BoothPayments",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsOffline",
                table: "BoothPayments",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ReceiptId",
                table: "BoothPayments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReceiptUrl",
                table: "BoothPayments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsOffline",
                table: "BoothPayments");

            migrationBuilder.DropColumn(
                name: "ReceiptId",
                table: "BoothPayments");

            migrationBuilder.DropColumn(
                name: "ReceiptUrl",
                table: "BoothPayments");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentStatus",
                table: "BoothPayments",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
