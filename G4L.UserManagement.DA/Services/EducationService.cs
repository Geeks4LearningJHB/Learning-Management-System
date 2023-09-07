using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.DA.Repositories;
using G4L.UserManagement.DA.Services;
using G4L.UserManagement.Infrustructure.Repositories;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Services
{
    public class EducationService : IEducationService
    {
        private readonly IMapper _mapper;
        private readonly IEducationRepository _educationRepository;
        private ITokenService _tokenService;

        public EducationService(IEducationRepository educationRepository,
          IMapper mapper)
        {
            _educationRepository = educationRepository;

            _mapper = mapper;
        }

        public async Task RegisterUserAsync(EducationRequest education)
        {
            //var education = _mapper.Map<Education>(model);

            await _educationRepository.PostQualifcationsAsync(education);
        }
        public async Task<IEnumerable<Education>> GetEducationsWithMatchingApplications()
        {
            var matchingEducations = await _educationRepository.GetEducationsWithMatchingApplicationsAsync();
            return matchingEducations;
        }

    }

}



//private readonly IApplicantRepository _applicantRepository;




//public async Task RegisterUserAsync(ApplicantRequest model)
//{
//    await _applicantRepository.CreateUserAsync(model);
//}