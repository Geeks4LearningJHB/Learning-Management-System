using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class modifiedattendancemodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ClockOut",
                table: "Attendances",
                newName: "CheckOutTime");

            migrationBuilder.RenameColumn(
                name: "ClockIn",
                table: "Attendances",
                newName: "CheckInTime");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CheckOutTime",
                table: "Attendances",
                newName: "ClockOut");

            migrationBuilder.RenameColumn(
                name: "CheckInTime",
                table: "Attendances",
                newName: "ClockIn");
        }
    }
}
