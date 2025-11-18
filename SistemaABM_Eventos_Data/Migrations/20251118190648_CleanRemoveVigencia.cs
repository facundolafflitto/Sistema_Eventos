using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaABM_Eventos_Data.Migrations
{
    /// <inheritdoc />
    public partial class CleanRemoveVigencia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Rol",
                schema: "app",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                schema: "app",
                table: "Lotes",
                type: "rowversion",
                rowVersion: true,
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rol",
                schema: "app",
                table: "Usuarios");

            migrationBuilder.AlterColumn<byte[]>(
                name: "RowVersion",
                schema: "app",
                table: "Lotes",
                type: "varbinary(max)",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "rowversion",
                oldRowVersion: true);
        }
    }
}
