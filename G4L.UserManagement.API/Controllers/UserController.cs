using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;
using G4L.UserManagement.DA;
using G4L.UserManagement.Infrustructure.Repositories;
using G4L.UserManagement.Infrustructure.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nest;
using System;
using System.Threading.Tasks;
using AuthenticateRequest = G4L.UserManagement.BL.Models.Request.AuthenticateRequest;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly IUserRepository _userRepository;
        private ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService, SignInManager<User> signInManager, IUserRepository userRepository)
        {
            _logger = logger;
            _userService = userService;
            _signInManager = signInManager;
            _userRepository = userRepository;
        }

        [AllowAnonymous]
        [Authorize(Role.Super_Admin, Role.Admin, Role.Trainer, Role.Applicant)]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _userService.GetAllUsersAsync());
        }

        [Authorize(Role.Super_Admin, Role.Admin, Role.Trainer)]
        [HttpGet("paged")]
        public async Task<IActionResult> Get(int skip = 0, int take = 5)
        {
            return Ok(await _userService.GetPagedUsersAsync(skip, take));
        }

        [Authorize(Role.Super_Admin, Role.Admin, Role.Trainer)]
        [HttpGet("role/{role}")]
        public async Task<IActionResult> Get(Role role)
        {
            return Ok(await _userService.GetUsersByRoleAsync(role));
        }

        [Authorize(Role.Super_Admin, Role.Admin)]
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] UserRequest user)
        {
            await _userService.RegisterUserAsync(user);
            return Ok();
        }


        [Authorize(Role.Super_Admin, Role.Admin, Role.Applicant)]

        [HttpPut]
        public async Task<IActionResult> PutAsync([FromBody] UpdateRequest user)
        {
            await _userService.UpdateUserAsync(user);
            return Ok();
        }
        [AllowAnonymous]
        [HttpGet("GoogleLogin")]
        public IActionResult GoogleLogin()
        {
            var authenticationProperties = new AuthenticationProperties
            {
                RedirectUri = Url.Action("GoogleLoginCallback")
            };

            return Challenge(authenticationProperties, GoogleDefaults.AuthenticationScheme);
        }


        [AllowAnonymous]
        [HttpGet("GoogleLoginCallback")]
        public async Task<IActionResult> GoogleLoginCallback()
        {
            var externalLoginInfo = await _signInManager.GetExternalLoginInfoAsync();
            if (externalLoginInfo == null)
            {
                // Handle error
                return BadRequest("User Not Found");

            }

            var user = await _userRepository.GetUserByGoogleProviderKeyAsync(externalLoginInfo.ProviderKey);

            if (user == null)
            {
                // No user found, handle as needed
                return BadRequest("User Not Found");
            }

            // User exists, perform login or additional logic
            // For example, you can sign in the user with Identity Framework
            var result = await _signInManager.ExternalLoginSignInAsync(externalLoginInfo.LoginProvider, externalLoginInfo.ProviderKey, isPersistent: false, bypassTwoFactor: true);

            if (result.Succeeded)
            {
                return Ok(user);
            }
            else
            {
                // Handle login failure
                return BadRequest("User Not Found");
            }
        }

        [Authorize(Role.Super_Admin, Role.Admin)]
        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            await _userService.DeleteUserAsync(id);
            return Ok();
        }
   
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return BadRequest("User Not Found");
            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(AuthenticateRequest model)
        {
            var user = await _userService.AuthenticateUserAsync(model);
            if (user == null)
                return BadRequest("User Not Found");
            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("signup")]
        public async Task<IActionResult> PostAsync([FromBody] AddUserRequest user)
        {

            await _userService.SignupUserAsync(user);

            return Ok(new { Message = "User registered successfully." });
        }
        [Authorize(Role.Super_Admin, Role.Admin, Role.Applicant)]
        [HttpPut("personal")]
        public async Task<IActionResult> PostAsync([FromBody] PersonalInformationRequest model)
        {
            await _userService.UpdatePersonalInformationAsync(model);
            return Ok(new { Message = "Personal put successfully." });
        }

     
        [AllowAnonymous]
        [HttpGet("personal{id}")]
        public async Task<IActionResult> GetPersonal(Guid id)
        {

            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return BadRequest("User Not Found");
            return Ok(user);
         
        }
     
    }
}
