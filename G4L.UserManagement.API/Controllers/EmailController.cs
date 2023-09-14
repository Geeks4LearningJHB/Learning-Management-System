﻿using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using Microsoft.AspNetCore.Mvc;
using Nest;

namespace G4L.UserManagement.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost]
        public IActionResult SendEmail(EmailDto request)
        {
            
            request.Subject = "Learnership Application Confirmation";
            request.Body = $"Hello {request.To},\n\nThis is your email body with your name!";
            _emailService.SendEmail(request);

            return Ok();
        }
    }
}