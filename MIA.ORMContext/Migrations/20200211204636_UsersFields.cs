using Microsoft.EntityFrameworkCore.Migrations;

namespace MIA.ORMContext.Migrations
{
    public partial class UsersFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          migrationBuilder.DropColumn(
            name: "FullName",
            table: "AspNetUsers");

          migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "AspNetUsers",
                maxLength: 100,
                nullable: true);
          
          migrationBuilder.DropColumn(
                name: "FirstName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "AspNetUsers");

            

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "JobTitle",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "JobTitle",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "AspNetUsers",
                nullable: true,
                computedColumnSql: "[FirstName] + ' ' + [LastName]",
                oldClrType: typeof(string),
                oldMaxLength: 100,
                oldNullable: true);
        }
    }
}
