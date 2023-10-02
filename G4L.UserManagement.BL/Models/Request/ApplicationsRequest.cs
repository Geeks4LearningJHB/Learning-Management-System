using G4L.UserManagement.BL.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Request
{
    public class ApplicationsRequest
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public Guid UserId { get; set; }
        public string IdNumber { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Disability { get; set; }
        public string Race { get; set; }
        public string MathSubject { get; set; }
        public string MathMark { get; set; }
        public string EnglishMark { get; set; }
        public string Qualifications { get; set; }
        public string FieldOfStudy { get; set; }
        public string CourseOfInterest { get; set; }
        public string CvFileName { get; set; }
        public string CvFilePath { get; set; }
        public string IdFileName { get; set; }
        public string IdFilePath { get; set; }
        public string QualificationsFileName { get; set; }
        public string QualificationsFilePath { get; set; }
        public string VaccinationFileName { get; set; }
        public string VaccinationFilePath { get; set; }

    }

}

