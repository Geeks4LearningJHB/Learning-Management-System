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
    public class IdDocumentsController : ControllerBase
    {
        private readonly ILogger<IdDocumentsController> _logger;
        private readonly IIdDocumentsService _idDocumentsService;

        public IdDocumentsController(ILogger<IdDocumentsController> logger, IIdDocumentsService idDocumentsService)
        {
            _logger = logger;
            _idDocumentsService = idDocumentsService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateEducationAsync([FromBody] IdDocumentsRequest model)
        {
            try
            {

                await _idDocumentsService.PostIdDocumentAsync(model); ;


                //await _educationService.CreateEducationAsync(educationRequest);

                return Ok(new { Message = "Education created successfully." });
            }
            catch (Exception ex)
            {

                // Log the exception
                return StatusCode(500, new { Message = "An error occurred while creating education." });

            }
        }
    }
}