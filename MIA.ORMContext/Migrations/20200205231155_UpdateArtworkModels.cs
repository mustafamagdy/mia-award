using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class UpdateArtworkModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CardHolderName",
                table: "BoothPayments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CardType",
                table: "BoothPayments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Last4Digits",
                table: "BoothPayments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymentId",
                table: "BoothPayments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymentStatus",
                table: "BoothPayments",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ArtworkFee",
                table: "Awards",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "AllowFileUpload",
                table: "ArtWorks",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "CoverId",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CoverUrl",
                table: "ArtWorks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CardHolderName",
                table: "ArtWorkPayments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CardType",
                table: "ArtWorkPayments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Last4Digits",
                table: "ArtWorkPayments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PaymentId",
                table: "ArtWorkPayments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CardHolderName",
                table: "BoothPayments");

            migrationBuilder.DropColumn(
                name: "CardType",
                table: "BoothPayments");

            migrationBuilder.DropColumn(
                name: "Last4Digits",
                table: "BoothPayments");

            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "BoothPayments");

            migrationBuilder.DropColumn(
                name: "PaymentStatus",
                table: "BoothPayments");

            migrationBuilder.DropColumn(
                name: "ArtworkFee",
                table: "Awards");

            migrationBuilder.DropColumn(
                name: "AllowFileUpload",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "CoverId",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "CoverUrl",
                table: "ArtWorks");

            migrationBuilder.DropColumn(
                name: "CardHolderName",
                table: "ArtWorkPayments");

            migrationBuilder.DropColumn(
                name: "CardType",
                table: "ArtWorkPayments");

            migrationBuilder.DropColumn(
                name: "Last4Digits",
                table: "ArtWorkPayments");

            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "ArtWorkPayments");
        }
    }
}
