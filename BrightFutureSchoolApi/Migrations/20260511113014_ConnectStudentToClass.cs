using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BrightFutureSchoolApi.Migrations
{
    /// <inheritdoc />
    public partial class ConnectStudentToClass : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Class",
                table: "Students");

            migrationBuilder.AddColumn<int>(
                name: "SchoolClassId",
                table: "Students",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.Sql("""
                INSERT INTO "SchoolClasses" ("ClassName", "Section")
                SELECT 'Default Class', 'A'
                WHERE NOT EXISTS (SELECT 1 FROM "SchoolClasses");

                UPDATE "Students"
                SET "SchoolClassId" = (SELECT "Id" FROM "SchoolClasses" ORDER BY "Id" LIMIT 1);
                """);

            migrationBuilder.CreateIndex(
                name: "IX_Students_SchoolClassId",
                table: "Students",
                column: "SchoolClassId");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_SchoolClasses_SchoolClassId",
                table: "Students",
                column: "SchoolClassId",
                principalTable: "SchoolClasses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_SchoolClasses_SchoolClassId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_SchoolClassId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "SchoolClassId",
                table: "Students");

            migrationBuilder.AddColumn<string>(
                name: "Class",
                table: "Students",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
