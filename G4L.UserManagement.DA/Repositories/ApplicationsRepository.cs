using AutoMapper;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.Infrustructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using G4L.UserManagement.BL.Models.Request;
using Microsoft.EntityFrameworkCore;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Models;
using Newtonsoft.Json;
using G4L.UserManagement.DA.Services;

namespace G4L.UserManagement.DA.Repositories
{
    public class ApplicationsRepository : Repository<Applications>, IApplicationsRepository
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;
        public ApplicationsRepository(DatabaseContext databaseContext, IMapper mapper) : base(databaseContext)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;

        }

        public async Task PostApplicationAsync(Guid id, ApplicationsRequest model)
        {
            // Retrieve user data based on ID number
            var user = await _databaseContext.Users
                .FirstOrDefaultAsync(u => u.Id == id);

            // Check if IdNumber already exists in the Applications table
            if (_databaseContext.Applications.Any(x => x.IdNumber == user.IdNumber))
            {
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateIdNumber.ToString(),
                    Message = "User with Id number already exists"
                }));
            }

            if (_databaseContext.Users == null || !_databaseContext.Users.Any())
            {
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateIdNumber.ToString(),
                    Message = "User with Id number already exists"
                }));
            }


            if (_databaseContext.Educations == null || !_databaseContext.Educations.Any(x => x.UserId == id))
            {
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateIdNumber.ToString(),
                    Message = "The educations table is null or empty"
                }));
            }
            var dataFromEducation = await _databaseContext.Educations
                .FirstOrDefaultAsync(e => e.UserId == model.UserId);

            var dataFromVaccinationDocuments = await _databaseContext.VaccinationDocuments
           .FirstOrDefaultAsync(e => e.UserId == model.UserId);

            var dataFromIdDocuments = await _databaseContext.IdDocuments
           .FirstOrDefaultAsync(e => e.UserId == model.UserId);

            var dataFromQualificationsDocuments = await _databaseContext.QualificationsDocuments
           .FirstOrDefaultAsync(e => e.UserId == model.UserId);

            var dataFromCvDocuments = await _databaseContext.CvDocuments
           .FirstOrDefaultAsync(e => e.UserId == model.UserId);

            // Create an Applications object using the retrieved user data
            var application = new Applications
            {
                UserId = model.UserId,
                Name = user.Name,
                Surname = user.Surname,
                IdNumber = user.IdNumber,
                Phone = user.Phone,
                Email = user.Email,
                Race = user.Race,
                Disability = user.Disability,
                Gender = user.Gender,
                MathSubject = dataFromEducation.MathSubject,
                MathMark = dataFromEducation.MathMark,
                EnglishMark = dataFromEducation.EnglishMark,
                Qualifications = dataFromEducation.Qualifications,
                FieldOfStudy = dataFromEducation.FieldOfStudy,
                CourseOfInterest = dataFromEducation.CourseOfInterest,
                CvFileName = dataFromCvDocuments.FileName,
                CvFilePath = dataFromCvDocuments.FilePath,
                IdFileName = dataFromCvDocuments.FileName,
                IdFilePath = dataFromCvDocuments.FilePath,
                QualificationsFileName = dataFromCvDocuments.FileName,
                QualificationsFilePath = dataFromCvDocuments.FilePath,
                VaccinationFileName = dataFromCvDocuments.FileName,
                VaccinationFilePath = dataFromCvDocuments.FilePath,
            
            };

         

            // Now 'additionalFileInfos' contains the extra FileName and FilePath pairs

            // Map the application to the desired type if needed
            var mappedApplication = _mapper.Map<Applications>(application);

            // Add the application to the context and save changes
            _databaseContext.Applications.Add(mappedApplication);
            await _databaseContext.SaveChangesAsync();
        }



        public async Task<Applications> GetApplicantsByIdNumberAsync(string idNumber)
        {
            {
                return await _databaseContext.Set<Applications>()
                    .Where(x => x.IdNumber == idNumber)
                    .FirstOrDefaultAsync();
            }
        }
        public async Task<Applications> GetByApplicantsByEmailAsync(string email)
        {
            return await _databaseContext.Set<Applications>()
                .Where(x => x.Email == email)
                .FirstOrDefaultAsync();
        }
        public async Task<IEnumerable<Applications>> ListAsync(int page = 1, int pageSize = 4, string courseOfInterest = null, string searchQuery = null, DateTime? startDate = null, DateTime? endDate = null)
        {
            var query = _databaseContext.Set<Applications>().AsQueryable();

          
            if (!string.IsNullOrEmpty(courseOfInterest))
            {
                query = query.Where(app => app.CourseOfInterest == courseOfInterest);
            }

            if (!string.IsNullOrEmpty(searchQuery))
            {
                query = query.Where(app => app.Name.Contains(searchQuery) || app.Surname.Contains(searchQuery));
            }

            if (startDate.HasValue)
            {
              
                startDate = startDate.Value.Date;
                endDate = endDate.Value.Date;
                query = query.Where(app => app.CreatedDate.Date >= startDate && app.CreatedDate.Date <= endDate);
            }

         
            query = query.OrderByDescending(app => app.CreatedDate);

     
            query = query.Skip((page - 1) * pageSize).Take(pageSize);

            return await query.ToListAsync();
        }



        public async Task<Applications> GetApplicationByUserIdAsync(Guid userId)
        
        {
            return await Task.Run(() =>
            {
                return _databaseContext.Set<Applications>()
                    .FirstOrDefault(x => x.UserId == userId);
            });
        }


 
        public async Task DeleApplicationByUserIdAsync(string email)
        {
            var application = await _databaseContext.Set<Applications>()
                                                    .FirstOrDefaultAsync(x => x.Email == email);

    
                _databaseContext.Set<Applications>().Remove(application);
                await _databaseContext.SaveChangesAsync();
            
        }

    }
}
