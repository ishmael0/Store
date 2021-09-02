using Microsoft.EntityFrameworkCore.Migrations;

namespace Store.StoreDBMigration
{
    public partial class _19 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderedList",
                table: "OrderedList");

            migrationBuilder.RenameTable(
                name: "OrderedList",
                newName: "OrderedLists");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderedLists",
                table: "OrderedLists",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderedLists",
                table: "OrderedLists");

            migrationBuilder.RenameTable(
                name: "OrderedLists",
                newName: "OrderedList");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderedList",
                table: "OrderedList",
                column: "Id");
        }
    }
}
