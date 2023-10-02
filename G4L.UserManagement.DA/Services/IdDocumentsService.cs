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
    public class IdDocumentsService : IIdDocumentsService
    {
        private readonly IIdDocumentsRepository _idDocumentsRepository;
        private readonly IMapper _mapper;

        public IdDocumentsService(IIdDocumentsRepository idDocumentsRepository, IMapper mapper)
        {
            _idDocumentsRepository = idDocumentsRepository;
            _mapper = mapper;
        }

        public async Task PostIdDocumentAsync(IdDocumentsRequest model)
        {

            await _idDocumentsRepository.PostIdDocumentAsync(model);
        }
        public async Task<IdDocuments>  GetIdDocumentByUserIdAsync(Guid userId)
        {
            return await _idDocumentsRepository.GetIdDocumentByUserIdAsync(userId);
        }
    }

}