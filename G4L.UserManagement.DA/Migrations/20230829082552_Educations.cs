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
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MathSubject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MathMark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EnglishMark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Qualifications = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FieldOfStudy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CourseOfInterest = table.Column<string>(type: "nvarchar(max)", nullable: true),
<<<<<<<< HEAD:G4L.UserManagement.DA/Migrations/20230904060854_Educations.cs
                    ApplicationsId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
========
>>>>>>>> 1b5c5467752c741b800ef8936307d7e079278b4a:G4L.UserManagement.DA/Migrations/20230829082552_Educations.cs
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
           
        }
    }
}
