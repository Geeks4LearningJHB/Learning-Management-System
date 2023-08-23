﻿using G4L.UserManagement.BL.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Request
{
    public class EducationRequest
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public string MathSubjects { get; set; }
        public string MathMarks { get; set; }
        public string EnglishMarks { get; set; }
        public string PostMatricQualification { get; set; }
        public string FieldOfStudy { get; set; }
        public string CourseOfInterest { get; set; }
    }
}
