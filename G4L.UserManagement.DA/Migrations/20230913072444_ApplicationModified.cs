using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class ApplicationModified : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CourseOfInterest",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EnglishMark",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FieldOfStudy",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MathMark",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MathSubject",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Qualifications",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CourseOfInterest",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "EnglishMark",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "FieldOfStudy",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "MathMark",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "MathSubject",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "Qualifications",
                table: "Applications");
        }
    }
}
