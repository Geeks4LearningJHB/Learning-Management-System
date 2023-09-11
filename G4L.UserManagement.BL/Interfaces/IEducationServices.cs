using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{

    public interface IEducationService
    { 
        Task RegisterUserAsync(EducationRequest education);
        Task<IEnumerable<Education>> ListEducationAsync(Guid id);
    }
}
