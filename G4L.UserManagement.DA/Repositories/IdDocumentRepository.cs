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
using G4L.UserManagement.Infrustructure.Repositories;
using G4L.UserManagement.BL.Interfaces;

namespace G4L.UserManagement.DA.Repositories
{
    public class IdDocumentRepository :Repository<IdDocuments>,  IIdDocumentsRepository
        {
     private readonly DatabaseContext _databaseContext;
    private readonly IMapper _mapper;

        public IdDocumentRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }
        public async Task PostIdDocumentAsync(IdDocumentsRequest model)
        {
            if (_databaseContext.IdDocuments.Any(x => x.UserId == model.UserId))
            {
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateIdNumber.ToString(),
                    Message = "Form has already been submitted"
                }));
            }

            var idDocument = _mapper.Map<IdDocuments>(model);

            _databaseContext.IdDocuments.Add(idDocument); // Change 'CvDocuments' to 'IdDocuments'
            await _databaseContext.SaveChangesAsync();
        }
    }
   

   

}
