
using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.DA.Repositories;
using G4L.UserManagement.Infrustructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Services
{
    public class ApplicationsService : IApplicationsService
    {
        private readonly IApplicationsRepository _applicationsRepository;
        private IMapper _mapper;

        public ApplicationsService(IApplicationsRepository applicationsRepository, IMapper mapper)
        {
            _applicationsRepository = applicationsRepository;
            _mapper = mapper;
        }
        public async Task CreateApplicationAsync(ApplicationsRequest model)
        {
            Guid userId = model.UserId;
            await _applicationsRepository.PostApplicationAsync(userId,model);
        }

        public async Task<Applications> GetApplicantByIdNumberAsync(string idNumber)
        {
            return await _applicationsRepository.GetApplicantsByIdNumberAsync(idNumber);
        }

        public async Task DeleteApplicationUserAsync(Guid id)
        {
            await _applicationsRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Applications>> ListAsync()
        {
            return await _applicationsRepository.ListAsync();
        }
        public async Task<Applications> GetApplicationByUserIdAsync(Guid userId)
        {
            return await _applicationsRepository.GetApplicationByUserIdAsync(userId);
        }
      
    }
}
