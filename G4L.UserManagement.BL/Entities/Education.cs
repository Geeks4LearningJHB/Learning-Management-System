﻿using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class Education : BaseEntity
    {
        public Guid Id { get; set; }
        public string MathSubject { get; set; }
        public string MathMark { get; set; }
        public string EnglishMark { get; set; }
        public string Qualifications { get; set; }
        public string FieldOfStudy { get; set; }
        public string CourseOfInterest { get; set; }
       


    }
}
