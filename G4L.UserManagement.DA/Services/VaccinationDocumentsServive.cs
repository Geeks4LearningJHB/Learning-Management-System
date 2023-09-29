﻿using AutoMapper;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Services
{
    public class VaccinationDocumentsService: IVaccinationDocumentsService
    {
        private readonly IVaccinationDocumentsRepository _vaccinationDocumentsRepository;
        private IMapper _mapper;

        public VaccinationDocumentsService(IVaccinationDocumentsRepository vaccinationDocumentsRepository, IMapper mapper)
        {
            _vaccinationDocumentsRepository = vaccinationDocumentsRepository;
            
        }
        public async Task PostVaccinationDocumentsAsync(VaccinationDocumentsRequest model)
        {
         
            await _vaccinationDocumentsRepository.PostVaccinationDocumentAsync( model);
        }
    }
}
