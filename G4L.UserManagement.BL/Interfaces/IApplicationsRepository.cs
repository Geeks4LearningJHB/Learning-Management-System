using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IApplicationsRepository : IRepository<Applications>
    {
    
        Task<Applications> GetApplicantsByIdNumberAsync(string idNumber);
        Task PostApplicationAsync(Guid id, ApplicationsRequest model);
        Task<IEnumerable<Applications>> ListAsync();
    }
}
