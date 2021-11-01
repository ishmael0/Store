using Microsoft.EntityFrameworkCore.Migrations;

namespace Store.MonizaDBMigration
{
    public partial class _3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KeyWords",
                table: "Products");

            migrationBuilder.CreateTable(
                name: "ProductKeywords",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    KeywordId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductKeywords", x => new { x.ProductId, x.KeywordId });
                    table.ForeignKey(
                        name: "FK_ProductKeywords_Keywords_KeywordId",
                        column: x => x.KeywordId,
                        principalTable: "Keywords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductKeywords_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductKeywords_KeywordId",
                table: "ProductKeywords",
                column: "KeywordId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductKeywords");

            migrationBuilder.AddColumn<string>(
                name: "KeyWords",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
