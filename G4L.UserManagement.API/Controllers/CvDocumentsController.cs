using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.DA.Repositories;
using G4L.UserManagement.DA.Services;
using G4L.UserManagement.Infrustructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CvDocumentsController : ControllerBase
    {
        private readonly ILogger<CvDocumentsController> _logger;
        private readonly ICvDocumentsRepository _cvDocumentsservice;
        public CvDocumentsController(ILogger<CvDocumentsController> logger, ICvDocumentsRepository cvDocumentsService)
        {
            _logger = logger;
            _cvDocumentsservice = cvDocumentsService;
         
        }
        [HttpPost]
        public async Task<IActionResult> CreateApplicationAsync([FromBody] CvDocumentsRequest model)
        {
            try
            {
                await _cvDocumentsservice.PostCvDocumentAsync(model);
                return Ok(new { Message = "Application created successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while creating the application.", Error = ex.Message });
            }
        }
    }
}
