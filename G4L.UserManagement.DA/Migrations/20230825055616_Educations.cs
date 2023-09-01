using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class Educations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Educations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),

                    MathSubject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MathMark = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EnglishMark = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostMatricQualification = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FieldOfStudy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CourseOfInterest = table.Column<string>(type: "nvarchar(max)", nullable: false),
//>>>>>>> a7bdc507d1a2a032d9767306acdf7ac54e081979:G4L.UserManagement.DA/Migrations/20230823091627_Educations.cs
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Educations", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Educations");
        }
    }
}
