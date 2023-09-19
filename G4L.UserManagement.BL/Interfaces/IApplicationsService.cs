using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
   public interface IApplicationsService
    {
        Task CreateApplicationAsync(ApplicationsRequest model);
        Task<Applications> GetApplicantByIdNumberAsync(string idNumber);
        Task<Applications> GetApplicationByUserIdAsync(Guid userId);
        Task<IEnumerable<Applications>> ListAsync();
       
    }
}
