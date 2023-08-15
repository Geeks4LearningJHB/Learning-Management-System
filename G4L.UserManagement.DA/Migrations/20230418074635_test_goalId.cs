using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace G4L.UserManagement.DA.Migrations
{
    public partial class test_goalId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoalTask_Goals_GoalId",
                table: "GoalTask");

            migrationBuilder.DropIndex(
                name: "IX_GoalTask_GoalId",
                table: "GoalTask");

            migrationBuilder.DropColumn(
                name: "GoalId",
                table: "GoalTask");

            migrationBuilder.AddColumn<Guid>(
                name: "GoalId1",
                table: "GoalTask",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GoalTask_GoalId1",
                table: "GoalTask",
                column: "GoalId1");

            migrationBuilder.AddForeignKey(
                name: "FK_GoalTask_Goals_GoalId1",
                table: "GoalTask",
                column: "GoalId1",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoalTask_Goals_GoalId1",
                table: "GoalTask");

            migrationBuilder.DropIndex(
                name: "IX_GoalTask_GoalId1",
                table: "GoalTask");

            migrationBuilder.DropColumn(
                name: "GoalId1",
                table: "GoalTask");

            migrationBuilder.AddColumn<Guid>(
                name: "GoalId",
                table: "GoalTask",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_GoalTask_GoalId",
                table: "GoalTask",
                column: "GoalId");

            migrationBuilder.AddForeignKey(
                name: "FK_GoalTask_Goals_GoalId",
                table: "GoalTask",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
