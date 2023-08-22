using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.Infrustructure.Repositories;
using Google;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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


        public async Task CreateUserAsync(EducationRequest model)
        {

            var education = _mapper.Map<Education>(model);
            _databaseContext.Educations.AddAsync(education);
            await _databaseContext.SaveChangesAsync();
      
        }


        public Task<bool> UpdateAsync(EducationRequest education)
        {
            throw new NotImplementedException();
        }

        Task<bool> IEducationRepository.UpdateAsync(Education education)
        {
            throw new NotImplementedException();
        }
    }
}
