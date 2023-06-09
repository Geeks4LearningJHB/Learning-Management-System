﻿using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface ILeaveService
    {
        Task RequestLeaveAsync(LeaveRequest leaveRequest);
        Task<List<LeaveBalanceResponse>> GetLeaveBalancesAsync(Guid userId);
        Task<List<LeaveRequest>> GetLeaveRequestsAsync(Guid userId);
        Task UpdateLeaveStatusAsync(Guid id, LeaveRequest leaveRequest);
        Task<List<LeaveRequest>> GetLeavesToApproveAsync(Guid userId);
        Task<IEnumerable<Leave>> GetAllLeaveRequestsAsync();
        Task UpdateLeaveRequestAsync(LeaveRequest leaveRequest);
        Task<List<ApproversBalanceResponse>> GetLeavesToApproveBalanceAsync(Guid userId);
        Task UpdateApproversAsync(Guid Id, List<ApproverRequest> approversRequest);
    }
}
