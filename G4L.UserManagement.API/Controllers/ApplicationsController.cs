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

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationsController : ControllerBase
    {

        private readonly ILogger<ApplicationsController> _logger;
        private readonly IApplicationsService _applicationsService;

        public ApplicationsController(ILogger<ApplicationsController> logger, IApplicationsService applicationsService)
        {
            _logger = logger;
            _applicationsService = applicationsService;
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

        [Authorize(Role.Super_Admin, Role.Admin)]
        [HttpGet]
        public async Task<IActionResult> GetApplicationsList()
        {
            return Ok(await _applicationsService.ListAsync());
        }
    }
}
