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
        Task DeleteApplicationUserAsync(string email);
        Task<Applications> GetApplicationByUserIdAsync(Guid userId);
        Task<IEnumerable<Applications>> ListAsync(int page = 1, int pageSize = 10, string courseOfInterest = null, string searchQuery = null, DateTime? startDate = null, DateTime? endDate = null);

    }
}
