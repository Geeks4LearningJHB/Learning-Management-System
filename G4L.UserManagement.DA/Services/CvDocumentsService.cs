using AutoMapper;
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
 public class CvDocumentsService :ICvDocumentsService
 
    {
        private readonly ICvDocumentsRepository _cvDocumentsRepository;
        private IMapper _mapper;

        public CvDocumentsService(ICvDocumentsRepository cvDocumentsRepository, IMapper mapper)
        {
            _cvDocumentsRepository = cvDocumentsRepository;
            _mapper = mapper;
        }

        public async Task PostCvDocumentAsync(CvDocumentsRequest model)
        {
    
            await _cvDocumentsRepository.PostCvDocumentAsync(model);
        }
    }
}
