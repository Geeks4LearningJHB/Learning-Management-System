using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.DA;
using G4L.UserManagement.DA.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nest;
using System;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IEmailService _emailService;
       

        public EmailController(IEmailService emailService,DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
            _emailService = emailService;
          
        }

        [HttpPost]
        public async Task <IActionResult> SendEmail(EmailDto request)
        {
            var user = await _databaseContext.Users
            .FirstOrDefaultAsync(u => u.Email == request.To);


            var education = await _databaseContext.Educations
               .FirstOrDefaultAsync(e => e.UserId == user.Id);

            request.Subject = "Learnership Application Confirmation";
            request.Body = $"Hello {user.Name} {user.Surname} ,Thank you for applying for the {education.CourseOfInterest} learnership.\n\n" +
                $"Please note that we are currently reviewing your application and will provide \n\n" +
                $"you with an update of the status of your application. ";
            await _emailService.SendEmail(request);

            return Ok();
        }
    }
}
