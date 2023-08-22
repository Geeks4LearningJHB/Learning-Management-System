using G4L.UserManagement.Shared;
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
        public Guid UserId { get; set; }
        public string Grades { get; set; }
        public string MathMarks { get; set; }
        public string EnglishMarks { get; set; }
        public string PostMatricQualification { get; set; }
        public string FieldOfStudy { get; set; }
        public string CourseOfInterest { get; set; }
    
    }
}
