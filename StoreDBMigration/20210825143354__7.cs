﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace Store.StoreDBMigration
{
    public partial class _7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DetailsNodeValuesMaxId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DetailsNodeValuesMaxId",
                table: "Products");
        }
    }
}