using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class test_goalIds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoalTask_Goals_GoalId1",
                table: "GoalTask");

            migrationBuilder.RenameColumn(
                name: "GoalId1",
                table: "GoalTask",
                newName: "GoalId");

            migrationBuilder.RenameIndex(
                name: "IX_GoalTask_GoalId1",
                table: "GoalTask",
                newName: "IX_GoalTask_GoalId");

            migrationBuilder.AddForeignKey(
                name: "FK_GoalTask_Goals_GoalId",
                table: "GoalTask",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoalTask_Goals_GoalId",
                table: "GoalTask");

            migrationBuilder.RenameColumn(
                name: "GoalId",
                table: "GoalTask",
                newName: "GoalId1");

            migrationBuilder.RenameIndex(
                name: "IX_GoalTask_GoalId",
                table: "GoalTask",
                newName: "IX_GoalTask_GoalId1");

            migrationBuilder.AddForeignKey(
                name: "FK_GoalTask_Goals_GoalId1",
                table: "GoalTask",
                column: "GoalId1",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
