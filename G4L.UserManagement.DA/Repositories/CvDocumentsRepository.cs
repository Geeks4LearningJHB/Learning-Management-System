using AutoMapper;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.Infrustructure.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Repositories
{
    public class CvDocumentsRepository: Repository<CvDocuments>, ICvDocumentsRepository
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public CvDocumentsRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task PostCvDocumentAsync(CvDocumentsRequest model)
        {
            if (_databaseContext.CvDocuments.Any(x => x.UserId == model.UserId))
            {
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateIdNumber.ToString(),
                    Message = "Form has already been submitted"
                }));
            }

            var cvDocument = _mapper.Map<CvDocuments>(model);

            _databaseContext.CvDocuments.Add(cvDocument); // Change 'Educations' to 'CvDocuments'
            await _databaseContext.SaveChangesAsync();
        }

    }
}
