using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.DA.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QualificationsDocumentsController : ControllerBase
    {
        private readonly ILogger<QualificationsDocumentsController> _logger;
        private readonly IQualificationsDocumentsService _qualificationsDocumentsService;


        public QualificationsDocumentsController(ILogger<QualificationsDocumentsController> logger, IQualificationsDocumentsService qualificationsDocumentsService)
        {
            _logger = logger;
            _qualificationsDocumentsService = qualificationsDocumentsService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateApplicationAsync([FromBody] QualificationsDocumentsRequest model)
        {
            try
            {
                await _qualificationsDocumentsService.CreateApplicationAsync(model);
                return Ok(new { Message = "Application created successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while creating the application.", Error = ex.Message });
            }
        }
    }
}
