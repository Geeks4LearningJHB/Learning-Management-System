﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Request
{
    public class ApplicantAttachementRequest
    {
        public Guid UserId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
    }
}