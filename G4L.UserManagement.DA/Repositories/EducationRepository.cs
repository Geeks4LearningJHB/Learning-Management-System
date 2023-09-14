using AutoMapper;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.DA.Migrations;
using G4L.UserManagement.Infrustructure.Repositories;
using Google;
using Microsoft.EntityFrameworkCore;
using Nest;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Repositories
{
    public class EducationRepository : Repository<Education>, IEducationRepository
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public EducationRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }


        public async Task PostQualifcationsAsync(EducationRequest model)
        {

            if (_databaseContext.Educations.Any(x => x.UserId == model.UserId))
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateIdNumber.ToString(),
                    Message = "Form has already been submitted"
                }));

            var education = _mapper.Map<Education>(model);
        
            _databaseContext.Educations.AddAsync(education);
            await _databaseContext.SaveChangesAsync();
      
        }

        public async Task<List<string>> GetCoursesOfInterestAsync(Guid userId)
        {
            return await _databaseContext.Educations
                .Where(education => education.UserId == userId)
                .Select(e => e.CourseOfInterest)
                .ToListAsync();
        }

   
    
        public async Task<Education> GetEducationByUserIdAsync(Guid userId)
        {
            return await Task.Run(() =>
            {
                return _databaseContext.Set<Education>()
                    .FirstOrDefault(x => x.UserId == userId);
            });
        }
    }
}
