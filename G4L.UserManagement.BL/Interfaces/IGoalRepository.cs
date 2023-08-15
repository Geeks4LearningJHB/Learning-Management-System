using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IGoalRepository : IRepository<Goal>
    {
        Task<List<Goal>> GetAllGoalsByUserIdAsync(Guid userID);

        Task<Goal> UpdateGoalAsync(Goal goal);

        Task<Goal> GetGoalByIdAsync(Guid goalID);
    }
}
