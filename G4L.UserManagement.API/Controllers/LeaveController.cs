﻿using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.Infrustructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]

    [Route("api/[controller]")]
    public class LeaveController : ControllerBase
    {
        private readonly ILogger<LeaveController> _logger;
        private readonly ILeaveService _leaveService;

        public LeaveController(ILogger<LeaveController> logger, ILeaveService leaveService)
        {
            _logger = logger;
            _leaveService = leaveService;
        }

       
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] LeaveRequest leaveRequest)
        {
            _logger.Log(LogLevel.Information, $"applying for leave {leaveRequest.LeaveType}");
            await _leaveService.RequestLeaveAsync(leaveRequest);
            return Ok(leaveRequest);
        }

        [HttpGet("balances/{userId}")]
        public async Task<IActionResult> GetLeaveBalanceAsync(Guid userId)
        {
            var balances = await _leaveService.GetLeaveBalancesAsync(userId);
            return Ok(balances);
        }

        [Authorize(Role.Learner)]
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAsync(Guid userId)
        {
            var leaveRequests = await _leaveService.GetLeaveRequestsAsync(userId);
            return Ok(leaveRequests);
        }
        
        [Authorize(Role.Admin, Role.Trainer)]
        [HttpGet("approve/{userId}")]
        public async Task<IActionResult> GetLeavesToApproveAsync(Guid userId)
        {
            var leaveRequests = await _leaveService.GetLeavesToApproveAsync(userId);
            return Ok(leaveRequests);
        }

        // Poor naming convention TODO!!
        [Authorize(Role.Super_Admin, Role.Admin, Role.Trainer)]
        [HttpGet("approverBalance/{userId}")]
        public async Task<IActionResult> GetLeavesBalanceAsync(Guid userId)
        {
            var leaveRequests = await _leaveService.GetLeavesToApproveBalanceAsync(userId);
            return Ok(leaveRequests);
        }


        [Authorize(Role.Super_Admin, Role.Admin, Role.Trainer, Role.Learner)]
        [HttpPut()]
        public async Task<IActionResult> UpdateLeaveRequestAsync([FromBody] LeaveRequest leaveRequest)
        {
            await _leaveService.UpdateLeaveRequestAsync(leaveRequest);
            return Ok();
        }

        [Authorize(Role.Super_Admin, Role.Admin, Role.Trainer, Role.Learner)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync([FromBody] LeaveRequest leaveRequest, Guid id)
        {
            await _leaveService.UpdateLeaveStatusAsync(id, leaveRequest);
            return Ok();
        }

        [Authorize(Role.Super_Admin, Role.Admin, Role.Trainer)]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _leaveService.GetAllLeaveRequestsAsync());
        }

        /// <summary>
        /// Update the approver of the leave request
        /// after the creation of the leave
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="approversRequest"></param>
        /// <returns></returns>
        [Authorize(Role.Super_Admin, Role.Admin, Role.Trainer)]
        [HttpPut("{id}/approvers")]
        public async Task<IActionResult> PutAsync(Guid Id,[FromBody] List<ApproverRequest> approversRequest)
        {
            //_logger.Log(LogLevel.Information, $"applying for leave {leaveRequest.LeaveType}");
            await _leaveService.UpdateApproversAsync(Id, approversRequest);
            return Ok();
        }
    }
}
