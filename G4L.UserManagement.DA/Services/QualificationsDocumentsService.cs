using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.DA.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Services
{
    public class QualificationsDocumentsService : IQualificationsDocumentsService
    {
        private readonly IQualificationsDocumentsRepository _qualificationsDocumentsRepository;
        private IMapper _mapper;

        public QualificationsDocumentsService(IQualificationsDocumentsRepository qualificationsDocumentsRepository, IMapper mapper)
        {
            _mapper = mapper;
            _qualificationsDocumentsRepository = qualificationsDocumentsRepository;
        }
        public async Task CreateApplicationAsync(QualificationsDocumentsRequest model)
        {
           
            await _qualificationsDocumentsRepository.PostQualificationsDocumentAsync(model);
        }
        public async Task<QualificationsDocuments> GetQualificationDocumentByUserIdAsync(Guid userId)
        {
            return await _qualificationsDocumentsRepository.GetQualificationDocumentByUserIdAsync(userId);
        }
    }
}

