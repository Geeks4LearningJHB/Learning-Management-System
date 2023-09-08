using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Entities
{
    public class Applications : BaseEntity
    {

        public Applications()
        {
            Educations = new List<Education>();
            Documents = new List<Document>();
        }
        public string Name { get; set; }
        public string Surname { get; set; }
        public Guid UserId { get; set; }
        public string IdNumber { get; set; }
        public string Gender { get; set; }
        public string Disability { get; set; }
        public string Race { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public List<Education> Educations { get; set; }
        public List<Document> Documents { get; set; }

    }
}
