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

        Task<List<string>> GetCoursesOfInterestAsync(Guid userId);
        Task<Education> GetEducationByUserIdAsync(Guid userId);
        Task<IEnumerable<Education>> ListEducationAsync(Guid userId);
    }
  
}
