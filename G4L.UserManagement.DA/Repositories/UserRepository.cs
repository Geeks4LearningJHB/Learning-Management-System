﻿using AutoMapper;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.DA;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BCryptNet = BCrypt.Net.BCrypt;
namespace G4L.UserManagement.Infrustructure.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;
        public UserRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }
        public async Task CreateUserAsync(UserRequest model)
        {
            // validate
            if (_databaseContext.Users.Any(x => x.IdNumber == model.IdNumber))
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateIdNumber.ToString(),
                    Message = "User with Id number already exist"
                }));

            // validate
            if (_databaseContext.Users.Any(x => x.Email == model.Email))
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateEmail.ToString(),
                    Message = "User with the same email already exist"
                }));

            // validate
            if (_databaseContext.Users.Any(x => x.Phone == model.Phone))
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicatePhoneNumber.ToString(),
                    Message = "User with the same phone number already exist"
                }));

            // map model to new user object
            var user = _mapper.Map<User>(model);
            // hash password
            user.PasswordHash = BCryptNet.HashPassword(model.Password);
            await _databaseContext.Users.AddAsync(user);

            await LinkSponsorAsync(model, user);

            await _databaseContext.SaveChangesAsync();
        }

        private async Task LinkSponsorAsync(UserRequest model, User user)
        {
            await Task.Run(() => {
                switch (user.Role)
                {
                    case Role.Trainer:
                        model.Clients.ForEach(x => {
                            _databaseContext.SponsoredUsers.Add(new SponsoredUser
                            {
                                UserId = user.Id,
                                SponsorId = x,
                                User = user,
                                Sponsor = _databaseContext.Sponsors.Where(y => y.Id == x).FirstOrDefault(),
                            });
                        });
                        break;
                    case Role.Learner:
                        _databaseContext.SponsoredUsers.Add(new SponsoredUser
                        {
                            UserId = user.Id,
                            SponsorId = (Guid) model.SponsorId,
                            User = user,
                            Sponsor = _databaseContext.Sponsors.Where(y => y.Id == model.SponsorId).FirstOrDefault(),
                        });
                        break;
                    default:
                        break;
                }
            });
        }

        public async Task<User> GetByUserByEmailAsync(string email)
        {
            return await Task.Run(() =>
            {
                return _databaseContext.Set<User>().Where(x => x.Email == email).FirstOrDefaultAsync();
            });
        }
        public async Task<IEnumerable<User>> ListAsync()
        {
            return await Task.Run(() =>
            {
                return _databaseContext.Set<User>()
                    .Include(x => x.Leaves)
                    // .ThenInclude("Documents")
                    .AsEnumerable();
            });
        }

        public async Task<IEnumerable<User>> GetUsersByRoleAsync(Role role)
        {
            return await Task.Run(() =>
            {
                return _databaseContext.Set<User>()
                    .Where(x => x.Role == role)
                    .AsEnumerable();
            });
        }
    }
}
