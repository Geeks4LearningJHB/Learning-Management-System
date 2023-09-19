﻿using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
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
    public interface IUserService
    {
        Task RegisterUserAsync(UserRequest user);
        Task<AuthenticateResponse> AuthenticateUserAsync(AuthenticateRequest model);
        Task SignupUserAsync(AddUserRequest user);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(Guid id);
        Task UpdateUserAsync(UpdateRequest user);
        Task DeleteUserAsync(Guid id);
        Task<User> GetUserAsync(string email);
        Task<IEnumerable<User>> GetPagedUsersAsync(int skip, int take);
        Task<IEnumerable<User>> GetUsersByRoleAsync(Role role);

        Task GetUserByEmailAsync(string to);


   

        Task UpdatePersonalInformationAsync(PersonalInformationRequest model);
        Task AddPersonalAsync(PersonalInformationRequest model, Guid id);
        Task GetPersonalAsync(Guid id);
       

    }
}
