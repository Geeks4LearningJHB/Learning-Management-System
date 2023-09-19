using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.DA;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nest;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly DatabaseContext _databaseContext;

        public EmailController(IEmailService emailService, DatabaseContext databaseContext)
        {
            _emailService = emailService;
            _databaseContext = databaseContext;
        }

        [HttpPost]
        public async Task<IActionResult> SendEmail(EmailDto request)
        {
      

            var user = await _databaseContext.Users
    .FirstOrDefaultAsync(e => e.Email == request.To);


            request.Subject = "Learnership Application Confirmation";
            request.Body = $"Hello {user.Name},\n\n" + $"{ user.Surname}" +
            $"This is your email body with your name";




            await _emailService.SendEmail(request); 

            return Ok();
        }

    }
}
