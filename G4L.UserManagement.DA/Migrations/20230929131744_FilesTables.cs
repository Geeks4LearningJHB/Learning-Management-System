using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class FilesTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FilePath",
                table: "Applications",
                newName: "VaccinationFilePath");

            migrationBuilder.RenameColumn(
                name: "FileName",
                table: "Applications",
                newName: "VaccinationFileName");

            migrationBuilder.AddColumn<string>(
                name: "CvFileName",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CvFilePath",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdFileName",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdFilePath",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QualificationsFileName",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QualificationsFilePath",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CvFileName",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "CvFilePath",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "IdFileName",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "IdFilePath",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "QualificationsFileName",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "QualificationsFilePath",
                table: "Applications");

            migrationBuilder.RenameColumn(
                name: "VaccinationFilePath",
                table: "Applications",
                newName: "FilePath");

            migrationBuilder.RenameColumn(
                name: "VaccinationFileName",
                table: "Applications",
                newName: "FileName");
        }
    }
}
