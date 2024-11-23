using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class mig14 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RolesMaster_UserRoles_RoleId1",
                table: "RolesMaster");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RolesMaster",
                table: "RolesMaster");

            migrationBuilder.DropIndex(
                name: "IX_RolesMaster_RoleId1",
                table: "RolesMaster");

            migrationBuilder.DropColumn(
                name: "RoleId1",
                table: "RolesMaster");

            migrationBuilder.AlterColumn<int>(
                name: "RoleId",
                table: "RolesMaster",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "RolesMaster",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_RolesMaster",
                table: "RolesMaster",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_RolesMaster_RoleId",
                table: "RolesMaster",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_RolesMaster_UserRoles_RoleId",
                table: "RolesMaster",
                column: "RoleId",
                principalTable: "UserRoles",
                principalColumn: "RoleId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RolesMaster_UserRoles_RoleId",
                table: "RolesMaster");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RolesMaster",
                table: "RolesMaster");

            migrationBuilder.DropIndex(
                name: "IX_RolesMaster_RoleId",
                table: "RolesMaster");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "RolesMaster");

            migrationBuilder.AlterColumn<int>(
                name: "RoleId",
                table: "RolesMaster",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                name: "RoleId1",
                table: "RolesMaster",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_RolesMaster",
                table: "RolesMaster",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_RolesMaster_RoleId1",
                table: "RolesMaster",
                column: "RoleId1");

            migrationBuilder.AddForeignKey(
                name: "FK_RolesMaster_UserRoles_RoleId1",
                table: "RolesMaster",
                column: "RoleId1",
                principalTable: "UserRoles",
                principalColumn: "RoleId");
        }
    }
}
