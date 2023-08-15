using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;

namespace G4L.UserManagement.BL.Models.Response
{
    public class GoalResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Duration { get; set; }
        public GoalStatus GoalStatus { get; set; }
        public int PausedCount { get; set; }
        public int ArchiveCount { get; set; }
        public Guid UserId { get; set; }
        public Guid AttendenceId { get; set; }
        public List<GoalCommentResponse> Comments { get; set; }
        public string TimeRemaining { get; set; }
        public List<GoalTaskResponse> Tasks { get; set; }
    }
}