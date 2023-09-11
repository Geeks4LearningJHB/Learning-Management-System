using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IEducationRepository : IRepository<Education>
    {
        Task PostQualifcationsAsync(EducationRequest model);
        Task<bool> UpdateAsync(EducationRequest education);
        Task<IEnumerable<Education>> ListEducationAsync(Guid id);
    }
}
