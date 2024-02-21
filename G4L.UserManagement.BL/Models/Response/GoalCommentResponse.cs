using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Response
{
    public class GoalCommentResponse
    {
        public string Comment { get; set; }
        public GoalStatus CommentType { get; set; }

        public Guid GoalId { get; set; }
    }
}
