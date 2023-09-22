using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.DA;
using G4L.UserManagement.DA.Services;
using G4L.UserManagement.Infrustructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nest;
using System;
using System.Net;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IEmailService _emailService;
        
        public EmailController(IEmailService emailService,IUserService userService ,DatabaseContext databaseContext)

        {
            _databaseContext = databaseContext;
            _emailService = emailService;
        }

        [HttpPost]
        public async Task <IActionResult> SendEmail(EmailDto request)
        {
            var email = await _databaseContext.Users
                .FirstOrDefaultAsync(u => u.Id == request.UserId);


            request.To = email.Email;
            var user = await _databaseContext.Users
            .FirstOrDefaultAsync(u => u.Email == request.To);


            var education = await _databaseContext.Educations
               .FirstOrDefaultAsync(e => e.UserId == user.Id);

            request.Subject = "Learnership Application Confirmation";
            request.Body = $"Dear {user.Name} {user.Surname},<br>" +
    $" We sincerely appreciate your interest in the  {education.CourseOfInterest} Learnership opportunity.<br><br>" +
    "Please be informed that your application is presently under review, and we will promptly<br> furnish you with an update regarding the status of your application.<br><br>" +

    "Warm Regards,<br>" +

    "<br>" +
    "The Recruiting Team at Geeks4Learning,<br><br>" +

    "Please refrain from replying to this email, as it is not actively monitored.<br><br>";



            await _emailService.SendEmail(request);

            return Ok();
        }
    }
}
