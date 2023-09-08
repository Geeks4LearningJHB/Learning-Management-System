using AutoMapper;
using Elasticsearch.Net;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.DA.Migrations;
using G4L.UserManagement.Infrustructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Document = System.Reflection.Metadata.Document;

namespace G4L.UserManagement.DA.Repositories
{
    public class ApplicantDocumentsRepository : Repository<ApplicantAttachments>, IApplicantDocumentsRepository
    {

        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public ApplicantDocumentsRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext)
        {

            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task DocumentsPostAsync(ApplicantAttachementRequest model)
        {
            // map model to new user object
            var documents = _mapper.Map<ApplicantAttachments>(model);
            // hash password
     
            await _databaseContext.ApplicantsAttachements.AddAsync(documents);
            await _databaseContext.SaveChangesAsync();
        }

    }
    
}
