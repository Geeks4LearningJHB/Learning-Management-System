using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Models.Response
{
    public class PersonalInformationResponse
    {
        public Guid Id { get; set; }
        public Guid userId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string IdNumber { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string Disability { get; set; }
        public string Race { get; set; }
        public string Email { get; set; }
    }
}
