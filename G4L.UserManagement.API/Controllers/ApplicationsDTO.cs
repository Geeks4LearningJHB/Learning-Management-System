using System;

namespace G4L.UserManagement.API.Controllers
{
    internal class ApplicationsDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string IdNumber { get; set; }
        public string Gender { get; set; }
        public string Disability { get; set; }
        public string Race { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string MathSubject { get; set; }
        public string MathMark { get; set; }
        public string EnglishMark { get; set; }
        public string Qualifications { get; set; }
        public string FieldOfStudy { get; set; }
        public string CourseOfInterest { get; set; }
    }
}