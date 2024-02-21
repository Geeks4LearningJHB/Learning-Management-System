

using System;

namespace G4L.UserManagement.BL.Models.Request
{
    public class GoalTaskRequest
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public bool Complete { get; set; }
        public Guid GoalId { get; set; }
    }
}