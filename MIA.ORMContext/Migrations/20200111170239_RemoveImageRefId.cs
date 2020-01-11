using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class RemoveImageRefId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RefId",
                table: "Images",
                newName: "NewsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NewsId",
                table: "Images",
                newName: "RefId");
        }
    }
}
