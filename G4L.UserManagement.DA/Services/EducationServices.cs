using AutoMapper;
using G4L.UserManagement.BL;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.DA.Repositories;
using G4L.UserManagement.Infrustructure.Repositories;
using Google;
using Microsoft.EntityFrameworkCore;
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

        private readonly IEducationRepository _educationRepository;
        private readonly IMapper _mapper;

        public EducationService(IEducationRepository educationRepository,
        IMapper mapper)
        {
            _educationRepository = educationRepository;
            _mapper = mapper;
        }
        public async Task CreateEducationAsync(EducationRequest model)
        {
            await _educationRepository.PostQualifcationsAsync(model);
        }
    }

}
