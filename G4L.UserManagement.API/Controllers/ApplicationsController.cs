using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System;
using G4L.UserManagement.DA.Services;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.Infrustructure.Services;
using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.Infrustructure.Repositories;
using System.Collections.Generic;
using Nest;
using G4L.UserManagement.DA.Migrations;
using System.Net;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationsController : ControllerBase
    {

        private readonly ILogger<ApplicationsController> _logger;
        private readonly IApplicationsService _applicationsService;
        private readonly IUserService _userService;
        private readonly IEducationService  _educationService;

        public ApplicationsController(ILogger<ApplicationsController> logger, IApplicationsService applicationsService, IUserService userService, IEducationService educationService)
        {
            _logger = logger;
            _applicationsService = applicationsService;
            _userService = userService;
            _educationService = educationService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateApplicationAsync([FromBody] ApplicationsRequest model)
        {
            try
            {
                await _applicationsService.CreateApplicationAsync(model);
                return Ok(new { Message = "Application created successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while creating the application.", Error = ex.Message });
            }
        }

        //[Authorize(Role.Super_Admin, Role.Admin)]
        //[HttpGet]
        //public async Task<IActionResult> GetApplicationsList()
        //{
        //    return Ok(await _applicationsService.ListAsync());
        //}

        // Controller Action
        //[HttpGet("userdetails/{userId}")]
        //public ApplicantDTO GetApplicantDetails(int userId)
        //{
        //    var user = __applicationsService.ListAsync();
        //    //var address = _addressRepository.GetAddressByUserId(userId);
        //    //var order = _orderRepository.GetOrderByUserId(userId);

        //    return new ApplicantDTO
        //    {
        //        UserName = user.UserName,
        //        Email = user.Email,
        //        //StreetAddress = address.StreetAddress,
        //        //City = address.City,
        //        //OrderDescription = order.Description
        //    };
        //}
        //[Authorize(Role.Super_Admin, Role.Admin)]
        [HttpGet]
        public async Task<IActionResult> GetApplicationsList()
        {
            return Ok(await _applicationsService.ListAsync());
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(Guid userId)
        {
            var application = await _applicationsService.GetApplicationByUserIdAsync(userId);
            if (application == null)
                return BadRequest("User Not Found");
            return Ok(application);
        }
    
   
        //[Authorize(Role.Super_Admin, Role.Admin)]
        [HttpGet("applications")]
        public async Task<IActionResult> GetAllApplicationDetails()
        {
          
            var allApplications = await _applicationsService.ListAsync();

            var applicationDetailsList = new List<ApplicationsDTO>();

            foreach (var application in allApplications)
            {
                var education = await _educationService.GetEducationByUserIdAsync(application.UserId);

                var applicationsDTO = new ApplicationsDTO
                {
                    Name = application.Name,
                    Surname = application.Name,
                    Email = application.Email,
                    IdNumber = application.IdNumber,
                    Phone = application.Phone,
                    Gender = application.Gender,
                    Race = application.Race,
                    Disability = application.Gender,
                    EnglishMark = education.EnglishMark,
                    MathSubject = education.MathSubject,
                    MathMark = education.MathMark,
                    Qualifications = education.Qualifications,
                    FieldOfStudy = education.FieldOfStudy,
                    CourseOfInterest = education.CourseOfInterest,

                };

                applicationDetailsList.Add(applicationsDTO);
            }

            return Ok(applicationDetailsList);
        }



    }
}
