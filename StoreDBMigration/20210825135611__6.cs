using Microsoft.EntityFrameworkCore.Migrations;

namespace Store.StoreDBMigration
{
    public partial class _6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProductTypes",
                table: "Products",
                newName: "Types");

            migrationBuilder.RenameColumn(
                name: "ProductLabels",
                table: "Products",
                newName: "Labels");

            migrationBuilder.RenameColumn(
                name: "ProductImages",
                table: "Products",
                newName: "Images");

            migrationBuilder.RenameColumn(
                name: "ProductDetailsNodeValues",
                table: "Products",
                newName: "DetailsNodeValues");

            migrationBuilder.RenameColumn(
                name: "CategoryImages",
                table: "Categories",
                newName: "Images");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Types",
                table: "Products",
                newName: "ProductTypes");

            migrationBuilder.RenameColumn(
                name: "Labels",
                table: "Products",
                newName: "ProductLabels");

            migrationBuilder.RenameColumn(
                name: "Images",
                table: "Products",
                newName: "ProductImages");

            migrationBuilder.RenameColumn(
                name: "DetailsNodeValues",
                table: "Products",
                newName: "ProductDetailsNodeValues");

            migrationBuilder.RenameColumn(
                name: "Images",
                table: "Categories",
                newName: "CategoryImages");
        }
    }
}
