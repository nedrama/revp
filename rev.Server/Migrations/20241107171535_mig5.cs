using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class mig5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VideoGames_Users_UserId",
                table: "VideoGames");

            migrationBuilder.DropIndex(
                name: "IX_VideoGames_UserId",
                table: "VideoGames");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "VideoGames");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "VideoGames");

            migrationBuilder.DropColumn(
                name: "LastUpdate",
                table: "VideoGames");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "VideoGames");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "VideoGames");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "VideoGames",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "VideoGames",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateOnly>(
                name: "LastUpdate",
                table: "VideoGames",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "VideoGames",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "VideoGames",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_VideoGames_UserId",
                table: "VideoGames",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_VideoGames_Users_UserId",
                table: "VideoGames",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
