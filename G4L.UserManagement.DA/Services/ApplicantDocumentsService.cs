using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
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
    public class ApplicantDocumentsService: IApplicantDocumentsService
    {
        private readonly IApplicantDocumentsRepository _applicantDocumentsRepository;
        private ITokenService _tokenService;
        private readonly IMapper _mapper;
        public ApplicantDocumentsService(IApplicantDocumentsRepository applicantDocumentsRepository, ITokenService tokenService,
        IMapper mapper)
        {
            _applicantDocumentsRepository = applicantDocumentsRepository;
            _tokenService = tokenService;
            _mapper = mapper;
        }
        public async Task CreateDocumentsAsync(ApplicantAttachementRequest model)
        {
            await _applicantDocumentsRepository.DocumentsPostAsync(model);
        }
    }
}

