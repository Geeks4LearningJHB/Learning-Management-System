using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IGoalService
    {
        Task<GoalResponse> CreateUserGoalAsync(GoalRequest goalRequest);
        Task<List<GoalResponse>> GetAllGoalsByUserIdAsync(Guid userId);
        Task<GoalResponse> UpdateGoalAsync(GoalRequest goalRequest);
        Task<List<GoalResponse>> GetAllGoalsAsync();
        Task DeleteTasksAsync(Guid taskId);
        Task<GoalTaskResponse> CreateTasksAsync(GoalTaskRequest goalTaskRequest);
        Task UpdateTaskAsync(GoalTaskRequest goalTaskRequest);
        Task<GoalCommentResponse> CreateCommentsAsync(GoalCommentRequest goalCommentRequest);
    }
}
