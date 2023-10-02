﻿using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface ICvDocumentsRepository
    {
        Task PostCvDocumentAsync(CvDocumentsRequest model); 
        Task<CvDocuments> GetCvDocumentByUserIdAsync(Guid userId);
    }

}
