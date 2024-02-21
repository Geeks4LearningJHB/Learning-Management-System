using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.Shared;
using System.Collections.Generic;

namespace G4L.UserManagement.BL.Entities
{
    public class GoalComment:BaseEntity
    {

        public string Comment { get; set; }
        public GoalStatus CommentType { get; set; }
    }
}
