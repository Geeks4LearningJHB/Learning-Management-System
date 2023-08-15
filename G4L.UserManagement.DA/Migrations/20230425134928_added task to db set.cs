using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class addedtasktodbset : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoalTask_Goals_GoalId",
                table: "GoalTask");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GoalTask",
                table: "GoalTask");

            migrationBuilder.RenameTable(
                name: "GoalTask",
                newName: "GoalTasks");

            migrationBuilder.RenameIndex(
                name: "IX_GoalTask_GoalId",
                table: "GoalTasks",
                newName: "IX_GoalTasks_GoalId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GoalTasks",
                table: "GoalTasks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GoalTasks_Goals_GoalId",
                table: "GoalTasks",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoalTasks_Goals_GoalId",
                table: "GoalTasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GoalTasks",
                table: "GoalTasks");

            migrationBuilder.RenameTable(
                name: "GoalTasks",
                newName: "GoalTask");

            migrationBuilder.RenameIndex(
                name: "IX_GoalTasks_GoalId",
                table: "GoalTask",
                newName: "IX_GoalTask_GoalId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GoalTask",
                table: "GoalTask",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GoalTask_Goals_GoalId",
                table: "GoalTask",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
