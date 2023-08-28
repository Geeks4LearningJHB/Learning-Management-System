using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class Education : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Educations",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Educations");

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
