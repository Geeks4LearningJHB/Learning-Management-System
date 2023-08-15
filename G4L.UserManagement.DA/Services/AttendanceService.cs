using AutoMapper;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;
using G4L.UserManagement.DA.Repositories;
using G4L.UserManagement.Shared;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Services
{
    public class AttendanceService : IAttendanceService
    {
        private readonly IAttendanceRepository _attendanceRepository;
        private readonly IUserRepository _userRepository;
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public AttendanceService(IUserService userService,IAttendanceRepository attendanceRepository, IUserRepository userRepository, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _attendanceRepository = attendanceRepository;
            _userRepository = userRepository;
            _appSettings = appSettings.Value;
            _mapper = mapper;
            _userService = userService;
        }
        public async Task<List<AttendanceResponse>> GetAttendanceRegisterAsync(Guid userId)
        {
            var attendance = await _attendanceRepository.ListAsync(x => x.UserId == userId);
            return _mapper.Map<List<AttendanceResponse>>(attendance);
        }

        private static DateTime GetCheckOutTime() {
            DateTime checkOutTime = DateTime.Now;
            if (checkOutTime.Hour >= 7 && checkOutTime.Minute >= 30)
            {
                checkOutTime = new DateTime(checkOutTime.Year, checkOutTime.Month, checkOutTime.Day, 17, 00, 0);
            }
            else
            {
                checkOutTime = new DateTime(checkOutTime.Year, checkOutTime.Month, checkOutTime.Day, 16, 00, 0);
            }
            return checkOutTime;
        }

        private static AttendanceStatus GetAttendanceStatus(DateTime checkInTime)
        {
            //present
            if (checkInTime.Hour >= 7 && checkInTime.Hour <= 8)
            {
                if (checkInTime.Minute >= 0 && checkInTime.Minute <= 15)
                {
                    return AttendanceStatus.Present;
                }
                return AttendanceStatus.Late;
            }
            else {
                //Aplying for half day leave
                return AttendanceStatus.Leave;
            }
        }

        public async Task<AttendanceResponse> SigningAttendanceRegisterAsync(Guid userId)
        {
            var user = await _userService.GetUserByIdAsync(userId) ?? throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
            {
                ErrorCode = ServerErrorCodes.NotFound.ToString(),
                Message = "User not found"
            }));

            var attendanceRequest = GetAttendanceRequest(userId);

            var existingAttendance = await _attendanceRepository.QueryAsync(x =>
                x.Date.Day == attendanceRequest.Date.Day &&
                x.UserId == attendanceRequest.UserId);

            if (existingAttendance != null)
            {
                return _mapper.Map<AttendanceResponse>(existingAttendance);
            }

            var attendance = _mapper.Map<Attendance>(attendanceRequest);

            await _attendanceRepository.AddAsync(attendance);

            return _mapper.Map<AttendanceResponse>(attendance);
        }

        private static AttendanceRequest GetAttendanceRequest(Guid userId)
        {
            DateTime checkInTime = DateTime.Now;

            AttendanceRequest attendanceRequest = new()
            {
                UserId = userId,
                CheckInTime = checkInTime,
                CheckOutTime = GetCheckOutTime(),
                Status = GetAttendanceStatus(checkInTime),
                Date = DateTime.Now
            };

            return attendanceRequest;
        }

        public async Task<IEnumerable<Attendance>> GetPagedAttendancesAsync(int skip, int take)
        {
            return await _attendanceRepository.GetPagedListAsync(skip, take);
        }

        public async Task UpdateAttendanceRegisterAsync(AttendanceRequest attendanceRequest)
        {
           /* var attendance = await _attendanceRepository.GetByIdAsync(attendanceRequest.);
            // Update the following;
            attendance.CheckOutTime = updateAttendance.CheckOutTime;

            await _attendanceRepository.UpdateAsync(attendance);*/
        }

        public async Task UpdateAttendanceGoalsAsync(AttendanceRequest attendanceRequest)
        {
           // var attendance = await _attendanceRepository.GetByIdAsync(updateAttendance.Id);
            // Update the following;
            //attendance.Goal_Description = updateAttendance.Goal_Description;
            //attendance.Goal_summary = updateAttendance.Goal_summary;
            //attendance.Time_Limit = updateAttendance.Time_Limit;
         //   await _attendanceRepository.UpdateAsync(attendance);
        }
    }
}