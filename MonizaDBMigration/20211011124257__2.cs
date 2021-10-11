using Microsoft.EntityFrameworkCore.Migrations;

namespace Store.MonizaDBMigration
{
    public partial class _2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductLabel_Labels_LabelId",
                table: "ProductLabel");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductLabel_Products_ProductId",
                table: "ProductLabel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductLabel",
                table: "ProductLabel");

            migrationBuilder.RenameTable(
                name: "ProductLabel",
                newName: "ProductLabels");

            migrationBuilder.RenameIndex(
                name: "IX_ProductLabel_LabelId",
                table: "ProductLabels",
                newName: "IX_ProductLabels_LabelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductLabels",
                table: "ProductLabels",
                columns: new[] { "ProductId", "LabelId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProductLabels_Labels_LabelId",
                table: "ProductLabels",
                column: "LabelId",
                principalTable: "Labels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductLabels_Products_ProductId",
                table: "ProductLabels",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductLabels_Labels_LabelId",
                table: "ProductLabels");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductLabels_Products_ProductId",
                table: "ProductLabels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductLabels",
                table: "ProductLabels");

            migrationBuilder.RenameTable(
                name: "ProductLabels",
                newName: "ProductLabel");

            migrationBuilder.RenameIndex(
                name: "IX_ProductLabels_LabelId",
                table: "ProductLabel",
                newName: "IX_ProductLabel_LabelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductLabel",
                table: "ProductLabel",
                columns: new[] { "ProductId", "LabelId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProductLabel_Labels_LabelId",
                table: "ProductLabel",
                column: "LabelId",
                principalTable: "Labels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductLabel_Products_ProductId",
                table: "ProductLabel",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
