using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class Education : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PostMatricQualification",
                table: "Educations",
                newName: "Qualifications");

            migrationBuilder.RenameColumn(
                name: "MathSubjects",
                table: "Educations",
                newName: "MathSubject");

            migrationBuilder.RenameColumn(
                name: "MathMarks",
                table: "Educations",
                newName: "MathMark");

            migrationBuilder.RenameColumn(
                name: "EnglishMarks",
                table: "Educations",
                newName: "EnglishMark");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Qualifications",
                table: "Educations",
                newName: "PostMatricQualification");

            migrationBuilder.RenameColumn(
                name: "MathSubject",
                table: "Educations",
                newName: "MathSubjects");

            migrationBuilder.RenameColumn(
                name: "MathMark",
                table: "Educations",
                newName: "MathMarks");

            migrationBuilder.RenameColumn(
                name: "EnglishMark",
                table: "Educations",
                newName: "EnglishMarks");
        }
    }
}
