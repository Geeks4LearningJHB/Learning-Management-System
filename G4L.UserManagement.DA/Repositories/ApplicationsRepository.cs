using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.Infrustructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using G4L.UserManagement.BL.Models.Request;
using Microsoft.EntityFrameworkCore;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Models;
using Newtonsoft.Json;

namespace G4L.UserManagement.DA.Repositories
{
    public class ApplicationsRepository : Repository<Applications>, IApplicationsRepository
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;
        public ApplicationsRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;

        }

        public async Task PostApplicationAsync(Guid id, ApplicationsRequest model)
        {
            // Retrieve user data based on ID number
            var user = await _databaseContext.Users
                .FirstOrDefaultAsync(u => u.Id == id);

            // Check if IdNumber already exists in the Applications table
            if (_databaseContext.Applications.Any(x => x.IdNumber == user.IdNumber))
            {
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateIdNumber.ToString(),
                    Message = "User with Id number already exists"
                }));
            }

            // Create an Applications object using the retrieved user data
            var application = new Applications
            {
                UserId = model.UserId,
                Name = user.Name,
                Surname = user.Surname,
                IdNumber = user.IdNumber,
                Phone = user.Phone,
                Email = user.Email,
                Race = user.Race,
                Disability = user.Disability,
                Gender = user.Gender,
                
                // Assign other properties from the model or wherever needed
            };

            // Map the application to the desired type if needed
            var mappedApplication = _mapper.Map<Applications>(application);

            // Add the application to the context and save changes
            _databaseContext.Applications.Add(mappedApplication);
            await _databaseContext.SaveChangesAsync();
        }



        public async Task<Applications> GetApplicantsByIdNumberAsync(string idNumber)
        {
            {
                return await _databaseContext.Set<Applications>()
                    .Where(x => x.IdNumber == idNumber)
                    .FirstOrDefaultAsync();
            }
        }
        public async Task<Applications> GetByApplicantsByEmailAsync(string email)
        {
            return await _databaseContext.Set<Applications>()
                .Where(x => x.Email == email)
                .FirstOrDefaultAsync();
        }
        public async Task<IEnumerable<Applications>> ListAsync()
        {
            return await _databaseContext.Set<Applications>().ToListAsync();
        }
        public async Task<Applications> GetApplicationByUserIdAsync(Guid userId)
        {
            return await Task.Run(() =>
            {
                return _databaseContext.Set<Applications>()
                    .FirstOrDefault(x => x.UserId == userId);
            });
        }


    }
}
