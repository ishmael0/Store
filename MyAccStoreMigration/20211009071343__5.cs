using Microsoft.EntityFrameworkCore.Migrations;

namespace Store.MyAccStoreMigration
{
    public partial class _5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "userName",
                table: "LogEntities",
                newName: "UserName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "LogEntities",
                newName: "userName");
        }
    }
}
