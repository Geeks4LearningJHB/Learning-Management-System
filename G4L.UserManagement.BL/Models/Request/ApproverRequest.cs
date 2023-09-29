﻿using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Request
{
    public class ApproverRequest
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid LeaveId { get; set; }
        public string FullName { get; set; }
        public Role Role { get; set; }
        public Status status { get; set; }
        public string Comments { get; set; }
        public List<string> FileNames { get; set; } // List of file names
        public List<string> FilePaths { get; set; } // List of file paths
    }
}
