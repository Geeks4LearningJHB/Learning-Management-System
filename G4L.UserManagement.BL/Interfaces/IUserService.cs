﻿using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IUserService
    {
        Task RegisterUserAsync(UserRequest user);
        Task<AuthenticateResponse> AuthenticateUserAsync(AuthenticateRequest model);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(Guid id);
        Task UpdateUserAsync(UpdateRequest user);
        Task DeleteUserAsync(Guid id);
        Task<User> GetUserAsync(string email);
        Task<IEnumerable<User>> GetPagedUsersAsync(int skip, int take);
        Task<IEnumerable<User>> GetUsersByRoleAsync(Role role);
    }
}
