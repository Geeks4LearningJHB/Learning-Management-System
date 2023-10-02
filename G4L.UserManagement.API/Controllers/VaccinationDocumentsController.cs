using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.DA.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VaccinationDocumentsController : ControllerBase
    {
        private readonly ILogger<VaccinationDocumentsController> _logger;
        private readonly IVaccinationDocumentsService _vaccinationDocumentsService;


        public VaccinationDocumentsController(ILogger<VaccinationDocumentsController> logger, IVaccinationDocumentsService vaccinationDocumentsService)
        {
            _logger = logger;
            _vaccinationDocumentsService = vaccinationDocumentsService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateApplicationAsync([FromBody] VaccinationDocumentsRequest model)
        {
            try
            {
                await _vaccinationDocumentsService.PostVaccinationDocumentsAsync(model);
                return Ok(new { Message = "Application created successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while creating the application.", Error = ex.Message });
            }
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetVaccinationDocumentByUserIdAsyn(Guid userId)
        {
            return Ok(await _vaccinationDocumentsService.GetVaccinationDocumentByUserIdAsync(userId));
        }
    }
}
