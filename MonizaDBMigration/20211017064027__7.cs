using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Store.MonizaDBMigration
{
    public partial class _7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Create",
                table: "ProductLabels");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ProductLabels");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "ProductLabels");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Create",
                table: "ProductLabels",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "ProductLabels",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "ProductLabels",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
