﻿using G4L.UserManagement.BL.Entities;
using Google;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using G4L.UserManagement.BL.Interfaces;
using Microsoft.Extensions.Logging;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.DA.Services;
using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.Infrustructure.Services;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EducationController : ControllerBase

    {
        private readonly ILogger<EducationController> _logger;
        private readonly IEducationService _educationService;

        public EducationController(ILogger<EducationController> logger, IEducationService educationService)
        {
            _logger = logger;
            _educationService = educationService;
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] EducationRequest education)
        {
            await _educationService.CreateEducationAsync(education);
            return Ok();
        }
    }
}

