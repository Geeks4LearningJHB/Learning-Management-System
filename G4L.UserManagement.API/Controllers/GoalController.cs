using G4L.UserManagement.API.Authorization;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace G4L.UserManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GoalController : ControllerBase
    {
        private readonly IGoalService _goalService;

        public GoalController(IGoalService goalService)
        {
            _goalService = goalService;
        }

        [Authorize(Role.Super_Admin, Role.Admin, Role.Learner, Role.Trainer)]
        [HttpGet]
        [Route("{userId}")]
        public async Task<IActionResult> GetAllGoalsByUserIdAsync([FromRoute] Guid userId)
        {
            var goals = await _goalService.GetAllGoalsByUserIdAsync(userId);
            return Ok(goals);
        }

        [HttpGet]
        [Authorize(Role.Super_Admin, Role.Admin, Role.Trainer)]
        public async Task<IActionResult> GetAllGoals()
        {
            var goals = await _goalService.GetAllGoalsAsync();
            return Ok(goals);
        }

        [HttpPost]
        [Authorize(Role.Learner)]
        public async Task<IActionResult> CreateUserGoalAsync([FromBody] GoalRequest goalRequest)
        {
            var createdGoal = await _goalService.CreateUserGoalAsync(goalRequest);
            return Ok(createdGoal);
        }

        [HttpPut]
        [Authorize(Role.Learner)]
        public async Task<IActionResult> UpdateGoalAsync([FromBody] GoalRequest goalRequest)
        {
            var updatedGoal = await _goalService.UpdateGoalAsync(goalRequest);
            return Ok(updatedGoal);
        }

        [HttpDelete("task/{taskId}")]
        [Authorize(Role.Learner)]
        public async Task<IActionResult> DeleteTasksAsync(Guid taskId)
        {
            await _goalService.DeleteTasksAsync(taskId);
            return Ok();
        }

        [HttpPost("task")]
        [Authorize(Role.Learner)]
        public async Task<IActionResult> CreateTasksAsync([FromBody] GoalTaskRequest goalTaskRequest)
        {
            var createdTask = await _goalService.CreateTasksAsync(goalTaskRequest);
            return Ok(createdTask);
        }

        [HttpPut("task")]
        [Authorize(Role.Learner)]
        public async Task<IActionResult> UpdateTasksAsync([FromBody] GoalTaskRequest goalTaskRequest)
        {
            await _goalService.UpdateTaskAsync(goalTaskRequest);
            return Ok();
        }

        [HttpPost("comment")]
        [Authorize(Role.Learner,Role.Trainer,Role.Super_Admin,Role.Admin)]
        public async Task<IActionResult> CreateCommentAsync([FromBody] GoalCommentRequest goalCommentRequest)
        {
            var createdComment = await _goalService.CreateCommentsAsync(goalCommentRequest);
            return Ok(createdComment);
        }
    }
}
