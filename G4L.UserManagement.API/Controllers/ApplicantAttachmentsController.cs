using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.DA.Services;
using G4L.UserManagement.Infrustructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicantAttachmentsController : ControllerBase
    {
        private readonly ILogger<ApplicantAttachmentsController> _logger;
        private readonly IApplicantDocumentsService _applicantDocumentsService;
        public ApplicantAttachmentsController(ILogger<ApplicantAttachmentsController> logger, IApplicantDocumentsService applicantDocumentsService)
        {
            _logger = logger;
            _applicantDocumentsService = applicantDocumentsService;
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] ApplicantAttachementRequest documents)
        {
            await _applicantDocumentsService.CreateDocumentsAsync(documents);
            return Ok();
        }

        
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetPersonal(Guid userId)
        {

            var user = await _applicantDocumentsService.GetDocumentsByUserIdAsync(userId);
            if (user == null)
                return BadRequest("User Not Found");
            return Ok(user);
        }
    }
}
