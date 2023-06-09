﻿using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class Attendance : BaseEntity
    {
        public Guid UserId { get; set; }
        public  DateTime Date { get; set; }
        public AttendanceStatus Status { get; set; }
        public DateTime CheckInTime { get; set; }
        public DateTime CheckOutTime { get; set; }
        public List<Goal> Goals { get; set; }

    }
}
