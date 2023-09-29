using AutoMapper;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.Infrustructure.Repositories;

namespace G4L.UserManagement.DA.Repositories
{
    public class QualificationsDocumentsRepository : Repository<QualificationsDocuments>, IQualificationsDocumentsRepository
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public QualificationsDocumentsRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }
        public async Task PostQualificationsDocumentAsync(QualificationsDocumentsRequest model)
        {
            if (_databaseContext.QualificationsDocuments.Any(x => x.UserId == model.UserId))
            {
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateIdNumber.ToString(),
                    Message = "Form has already been submitted"
                }));
            }

            var qualificationsDocument = _mapper.Map<QualificationsDocuments>(model);

            _databaseContext.QualificationsDocuments.Add(qualificationsDocument); // Change 'CvDocuments' to 'QualificationsDocuments'
            await _databaseContext.SaveChangesAsync();
        }

    }
}

   

   

