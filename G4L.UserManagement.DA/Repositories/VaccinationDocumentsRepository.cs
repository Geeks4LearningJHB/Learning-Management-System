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
    public class VaccinationDocumentsRepository : Repository<VaccinationDocuments>, IVaccinationDocumentsRepository
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;
        public VaccinationDocumentsRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;

        }
        public async Task PostVaccinationDocumentAsync(VaccinationDocumentsRequest model)
        {
            if (_databaseContext.VaccinationDocuments.Any(x => x.UserId == model.UserId))
            {
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateIdNumber.ToString(),
                    Message = "Form has already been submitted"
                }));
            }

            var vaccinationDocument = _mapper.Map<VaccinationDocuments>(model);

            _databaseContext.VaccinationDocuments.Add(vaccinationDocument);
            await _databaseContext.SaveChangesAsync();
        }
        public async Task<VaccinationDocuments> GetVaccinationDocumentByUserIdAsync(Guid userId)
        {
            return await Task.Run(() =>
            {

                return _databaseContext.Set<VaccinationDocuments>()
                    .FirstOrDefault(x => x.UserId == userId);

            });
        }

    }
}
