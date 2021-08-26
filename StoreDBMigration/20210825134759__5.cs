using Microsoft.EntityFrameworkCore.Migrations;

namespace Store.StoreDBMigration
{
    public partial class _5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Logo",
                table: "Products",
                newName: "ProductDetailsNodeValues");

            migrationBuilder.RenameColumn(
                name: "Logo",
                table: "Categories",
                newName: "TreeNodes");

            migrationBuilder.AddColumn<string>(
                name: "CategoryImages",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryImages",
                table: "Categories");

            migrationBuilder.RenameColumn(
                name: "ProductDetailsNodeValues",
                table: "Products",
                newName: "Logo");

            migrationBuilder.RenameColumn(
                name: "TreeNodes",
                table: "Categories",
                newName: "Logo");
        }
    }
}
