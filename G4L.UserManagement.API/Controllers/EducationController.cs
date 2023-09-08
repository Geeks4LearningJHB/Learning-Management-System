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
using System.Security.Claims;
using G4L.UserManagement.DA.Migrations;
using Nest;

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
   
        public async Task<IActionResult> CreateEducationAsync([FromBody] EducationRequest educationRequest)
        {
            try
            {

                await _educationService.RegisterUserAsync(educationRequest);


                //await _educationService.CreateEducationAsync(educationRequest);

                return Ok(new { Message = "Education created successfully." });
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, new { Message = "An error occurred while creating education." });
            }
        }
        //[HttpGet("{userId}")]

        //public async Task<IActionResult> Get(Guid userId)
        //{
        //    return Ok(await _educationService.GetEducationByUserIdAsync(userId));
        //}
        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(Guid userId)
        {
            var education = await _educationService.GetEducationByUserIdAsync(userId);
            if (education == null)
                return BadRequest("User Not Found");
            return Ok(education);
        }
    }




}


