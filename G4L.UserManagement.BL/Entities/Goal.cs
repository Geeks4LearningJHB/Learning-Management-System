using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;


namespace G4L.UserManagement.BL.Entities
{
    public class Goal: BaseEntity
    {
        public Goal() {
            Comments = new List<GoalComment>();
            Tasks = new List<GoalTask>();
        }

        public string Title { get; set; }
        public string Description { get; set; }
        public string Duration { get; set; }
        public GoalStatus GoalStatus { get; set; }
        public int PausedCount { get; set; }
        public int ArchiveCount { get; set; }
        public Guid UserId { get; set; }
        public List<GoalComment> Comments { get; set; }
        public string TimeRemaining { get; set; }
        public List<GoalTask> Tasks { get; set; }
       
    }
}
