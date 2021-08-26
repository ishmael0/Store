using Microsoft.EntityFrameworkCore.Migrations;

namespace Store.StoreDBMigration
{
    public partial class _8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DetailsNodeValuesMaxId",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "DetailsNodeValuesMaxId",
                table: "Categories",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DetailsNodeValuesMaxId",
                table: "Categories");

            migrationBuilder.AddColumn<int>(
                name: "DetailsNodeValuesMaxId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
