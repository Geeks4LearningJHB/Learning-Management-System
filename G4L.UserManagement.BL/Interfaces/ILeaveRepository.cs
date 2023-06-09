﻿using G4L.UserManagement.BL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface ILeaveRepository : IRepository<Leave>
    {
        Task<List<Leave>> GetLeavesToApproveByUserIdAsync(Guid userId);
        Task UpdateLeaveRequestAsync(Leave leave);
        Task<Leave> GetFullLeaveByIdAsync(Guid id);
        Task<List<Leave>> GetAllLeavesToApproveAsync();
    }
}
