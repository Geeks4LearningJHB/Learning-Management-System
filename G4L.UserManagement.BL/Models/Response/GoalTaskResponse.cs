using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Response
{
  
        public class GoalTaskResponse
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public bool Complete { get; set; }
            public Guid GoalID { get; set; }
        }
    
}
