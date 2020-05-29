using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class UpdateBoothFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Phone2",
                table: "BoothPurchases",
                newName: "WebsiteUrl");

            migrationBuilder.RenameColumn(
                name: "Phone1",
                table: "BoothPurchases",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "ContactName",
                table: "BoothPurchases",
                newName: "Nationality");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "BoothPurchases",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CellPhone1",
                table: "BoothPurchases",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CellPhone2",
                table: "BoothPurchases",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyFieldOfBusiness",
                table: "BoothPurchases",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "BoothPurchases",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactPersonName",
                table: "BoothPurchases",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactPersonTitle",
                table: "BoothPurchases",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExtraDetails",
                table: "BoothPurchases",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Fax",
                table: "BoothPurchases",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PrintingOption",
                table: "BoothPurchases",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ScreenOption",
                table: "BoothPurchases",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "CompanyLogo_FileKey",
                table: "BoothPurchases",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyLogo_FileUrl",
                table: "BoothPurchases",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "BoothPurchases");

            migrationBuilder.DropColumn(
                name: "CellPhone1",
                table: "BoothPurchases");

            migrationBuilder.DropColumn(
                name: "CellPhone2",
                table: "BoothPurchases");

            migrationBuilder.DropColumn(
                name: "CompanyFieldOfBusiness",
                table: "BoothPurchases");

            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "BoothPurchases");

            migrationBuilder.DropColumn(
                name: "ContactPersonName",
                table: "BoothPurchases");

            migrationBuilder.DropColumn(
                name: "ContactPersonTitle",
                table: "BoothPurchases");

            migrationBuilder.DropColumn(
                name: "ExtraDetails",
                table: "BoothPurchases");

            migrationBuilder.DropColumn(
                name: "Fax",
                table: "BoothPurchases");

            migrationBuilder.DropColumn(
                name: "PrintingOption",
                table: "BoothPurchases");

            migrationBuilder.DropColumn(
                name: "ScreenOption",
                table: "BoothPurchases");

            migrationBuilder.DropColumn(
                name: "CompanyLogo_FileKey",
                table: "BoothPurchases");

            migrationBuilder.DropColumn(
                name: "CompanyLogo_FileUrl",
                table: "BoothPurchases");

            migrationBuilder.RenameColumn(
                name: "WebsiteUrl",
                table: "BoothPurchases",
                newName: "Phone2");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "BoothPurchases",
                newName: "Phone1");

            migrationBuilder.RenameColumn(
                name: "Nationality",
                table: "BoothPurchases",
                newName: "ContactName");
        }
    }
}
