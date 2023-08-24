using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class EducationsMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PostMatricQualification",
                table: "Educations",
                newName: "Qualifications");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Qualifications",
                table: "Educations",
                newName: "PostMatricQualification");
        }
    }
}
