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


        public async Task RegisterUserAsync(EducationRequest education)
        {
            await _educationRepository.PostQualifcationsAsync(education);
        }

        public async Task<IEnumerable<Education>> ListEducationAsync(Guid userId)
        {
            return await _educationRepository.ListEducationAsync(userId);
        }

        public async Task UpdateEducationAsync(EducationRequest model)
        {
            var education = await _educationRepository.GetEducationByUserIdAsync(model.UserId);
            if (education == null)
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.UserNotFound.ToString(),
                    Message = "Education information was not found"
                }));

            // Update the following if the fields in the model are not null or empty
            if (!string.IsNullOrWhiteSpace(model.MathSubject))
                education.MathSubject = model.MathSubject;

            if (!string.IsNullOrWhiteSpace(model.MathMark))
                education.MathMark = model.MathMark;

            if (!string.IsNullOrWhiteSpace(model.EnglishMark))
                education.EnglishMark = model.EnglishMark;

            if (!string.IsNullOrWhiteSpace(model.Qualifications))
                education.Qualifications = model.Qualifications;

            if (!string.IsNullOrWhiteSpace(model.FieldOfStudy))
                education.FieldOfStudy = model.FieldOfStudy;

            if (!string.IsNullOrWhiteSpace(model.CourseOfInterest))
                education.CourseOfInterest = model.CourseOfInterest;

            await _educationRepository.UpdateAsync(education);
        }


        public async Task<Education> GetEducationByUserIdAsync(Guid userId)
        {
            return await _educationRepository.GetEducationByUserIdAsync(userId);

        }
    }
}


