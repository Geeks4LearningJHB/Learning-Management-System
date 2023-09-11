using AutoMapper;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.DA.Repositories;
using G4L.UserManagement.DA.Services;
using G4L.UserManagement.Infrustructure.Repositories;
using Newtonsoft.Json;
using System;
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

        public async Task UpdateUserAsync(EducationRequest model)
        {
            var user = await _educationRepository.GetByIdAsync(model.Id);

            // User can update the following
            user.MathSubject = model.MathSubject;
            user.MathMark = model.MathMark;
            user.EnglishMark = model.EnglishMark;
            user.Qualifications = model.Qualifications;
            user.FieldOfStudy = model.FieldOfStudy;
            user.CourseOfInterest = model.CourseOfInterest;

            await _educationRepository.UpdateAsync(user);
        }



        public async Task GetEducationByUserIdAsync(Guid userId)
        {
             await _educationRepository.GetByIdAsync(userId);
        }

        public async Task RegisterUserAsync(EducationRequest education)
        {
            //var education = _mapper.Map<Education>(model);

            await _educationRepository.PostQualifcationsAsync(education);
        }

      
        public async Task<IEnumerable<Education>> ListEducationAsync(Guid userId)
        {
            return await _educationRepository.ListEducationAsync(userId);
        }

    }
}


//private readonly IApplicantRepository _applicantRepository;




//public async Task RegisterUserAsync(ApplicantRequest model)
//{
//    await _applicantRepository.CreateUserAsync(model);
//}