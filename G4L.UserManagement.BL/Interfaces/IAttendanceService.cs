using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IAttendanceService
    {
        Task<List<AttendanceResponse>> GetAttendanceRegisterAsync(Guid userId);
        Task<IEnumerable<Attendance>> GetPagedAttendancesAsync(int skip, int take);
        Task<AttendanceResponse> SigningAttendanceRegisterAsync(Guid userId);
        Task UpdateAttendanceGoalsAsync(AttendanceRequest attendanceRequest);
        Task UpdateAttendanceRegisterAsync(AttendanceRequest attendanceRequest);
    }
}
