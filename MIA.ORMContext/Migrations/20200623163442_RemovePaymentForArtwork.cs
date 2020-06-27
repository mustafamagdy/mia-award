using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class RemovePaymentForArtwork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ArtworkPayments_ArtworkId",
                table: "ArtworkPayments");

            migrationBuilder.RenameColumn(
                name: "PaymentId",
                table: "Artworks",
                newName: "File3_FileUrl");

            migrationBuilder.AddColumn<string>(
                name: "File1_FileKey",
                table: "Artworks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "File1_FileUrl",
                table: "Artworks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "File2_FileKey",
                table: "Artworks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "File2_FileUrl",
                table: "Artworks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "File3_FileKey",
                table: "Artworks",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ArtworkPayments_ArtworkId",
                table: "ArtworkPayments",
                column: "ArtworkId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ArtworkPayments_ArtworkId",
                table: "ArtworkPayments");

            migrationBuilder.DropColumn(
                name: "File1_FileKey",
                table: "Artworks");

            migrationBuilder.DropColumn(
                name: "File1_FileUrl",
                table: "Artworks");

            migrationBuilder.DropColumn(
                name: "File2_FileKey",
                table: "Artworks");

            migrationBuilder.DropColumn(
                name: "File2_FileUrl",
                table: "Artworks");

            migrationBuilder.DropColumn(
                name: "File3_FileKey",
                table: "Artworks");

            migrationBuilder.RenameColumn(
                name: "File3_FileUrl",
                table: "Artworks",
                newName: "PaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtworkPayments_ArtworkId",
                table: "ArtworkPayments",
                column: "ArtworkId",
                unique: true,
                filter: "[ArtworkId] IS NOT NULL");
        }
    }
}
