using AutoMapper;
using G4L.UserManagement.BL.Custom_Exceptions;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Services
{
    public class GoalsService : IGoalService
    {
        private readonly IGoalRepository _goalRepository;
        private readonly IMapper _mapper;
        private readonly IGoalTaskRepository _goalTaskRepository;

        public GoalsService(IGoalRepository goalRepository, IMapper mapper, IGoalTaskRepository goalTaskRepository)
        {
            _goalRepository = goalRepository;
            _mapper = mapper;
            _goalTaskRepository = goalTaskRepository;
        }

        public async Task<GoalResponse> CreateUserGoalAsync(GoalRequest goalRequest)
        {
            var existingGoal = await _goalRepository.QueryAsync(goal =>
                goal.Title.ToLower().Trim() == goalRequest.Title.ToLower().Trim() &&
                goal.GoalStatus != GoalStatus.completed);

            if (existingGoal != null)
            {
                var errorObject = new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.DuplicateGoal.ToString(),
                    Message = $"Goal already exists with status: {existingGoal.GoalStatus}"
                };
                throw new AppException(JsonConvert.SerializeObject(errorObject));
            }

            var goal = _mapper.Map<Goal>(goalRequest);
            await _goalRepository.AddAsync(goal);
            var goalResponse = _mapper.Map<GoalResponse>(goal);
            return goalResponse;
        }

        public async Task<List<GoalResponse>> GetAllGoalsByUserIdAsync(Guid userId)
        {
            var goals = await _goalRepository.GetAllGoalsByUserIdAsync(userId);
            return _mapper.Map<List<GoalResponse>>(goals);
        }

        public async Task<List<GoalResponse>> GetAllGoalsAsync()
        {
            var goals = await _goalRepository.ListAsync();
            return _mapper.Map<List<GoalResponse>>(goals);
        }

        public async Task<GoalResponse> UpdateGoalAsync(GoalRequest goalRequest)
        {
            var goalToUpdate = await GetGoalByIdAsync(goalRequest.Id);

            if (goalToUpdate == null)
            {
                var errorObject = new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.GoalNotFound.ToString(),
                    Message = "Goal not found"
                };

                throw new AppException(JsonConvert.SerializeObject(errorObject));
            }

            goalRequest = await ResetGoalTasksAsync(goalRequest);
            var updatedGoal = _mapper.Map<Goal>(goalRequest);
            var result = await _goalRepository.UpdateGoalAsync(updatedGoal);
            var goalResponse = _mapper.Map<GoalResponse>(result);

            return goalResponse;
        }

        private async Task<GoalResponse> GetGoalByIdAsync(Guid goalId)
        {
            var goal = await _goalRepository.GetGoalByIdAsync(goalId);
            return _mapper.Map<GoalResponse>(goal);
        }

        private async Task<GoalRequest> ResetGoalTasksAsync(GoalRequest goalRequest)
        {
            if (goalRequest.GoalStatus == GoalStatus.archived)
            {
                await ChangeTaskStatusesToIncompleteAsync(goalRequest.Tasks);
            }

            return goalRequest;
        }

        private async Task ChangeTaskStatusesToIncompleteAsync(List<GoalTaskRequest> goalTaskRequests)
        {
            foreach (var goalTaskRequest in goalTaskRequests)
            {
                await UpdateTaskAsync(goalTaskRequest);
            }
        }


        public async Task DeleteTasksAsync(Guid taskId)
        {
            var taskToDelete = await _goalTaskRepository.GetByIdAsync(taskId) ?? throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
            {
                ErrorCode = ServerErrorCodes.NotFound.ToString(),
                Message = "Task not found"
            }));
            await _goalTaskRepository.DeleteAsync(taskToDelete.Id);
        }


        public Task<GoalTaskResponse> CreateTasksAsync(GoalTaskRequest goalTaskRequest)
        {

            return CreateTaskOrCommentAsync<GoalTaskRequest, GoalTask, GoalTaskResponse>(
                goalTaskRequest,
                TaskExistsAsync,
                (goal, task) => goal.Tasks.Add(task),
                "Task already exists",
                goalTaskRequest.GoalId
            );
        }


        public Task<GoalCommentResponse> CreateCommentsAsync(GoalCommentRequest goalCommentRequest)
        {
            return CreateTaskOrCommentAsync<GoalCommentRequest, GoalComment, GoalCommentResponse>(
                goalCommentRequest,
                CommentExistsAsync,
                (goal, comment) => goal.Comments.Add(comment),
                "Comment already exists",
                goalCommentRequest.GoalId
            );
        }

        public async Task UpdateTaskAsync(GoalTaskRequest goalTaskRequest)
        {
            _ = await _goalTaskRepository.GetByIdAsync(goalTaskRequest.Id) ?? throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
            {
                ErrorCode = ServerErrorCodes.NotFound.ToString(),
                Message = "Task does not exist"
            }));
            await _goalTaskRepository.UpdateTaskAsync(goalTaskRequest);
        }

        private async Task<bool> TaskExistsAsync(GoalTaskRequest goalTaskRequest)
        {
            bool taskExists = await EntityExistsAsync(
                goal => goal.Tasks, task => task.Title.Equals(goalTaskRequest.Title),
                "Goal not found for that task",goalTaskRequest.GoalId);
            return taskExists;
        }

        private async Task<bool> CommentExistsAsync(GoalCommentRequest goalCommentRequest)
        {
            bool commentExists = await EntityExistsAsync(
                goal => goal.Comments, comment => comment.Comment.Equals(goalCommentRequest.Comment),
                "Goal not found for that comment",goalCommentRequest.GoalId);
            return commentExists;
        }

        private async Task<bool> EntityExistsAsync<T>(Func<Goal, IEnumerable<T>> entitySelector,
            Func<T, bool> comparer, string errorMessage,Guid goalId) where T : class
        {
            Goal goal = await _goalRepository.GetGoalByIdAsync(goalId) ?? throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
            {
                ErrorCode = ServerErrorCodes.NotFound.ToString(),
                Message = errorMessage
            }));

            bool entityExists = entitySelector(goal).Any(comparer);
            return entityExists;
        }

        private async Task<TResponse> CreateTaskOrCommentAsync<TRequest, TEntity, TResponse>(
           TRequest request,
           Func<TRequest, Task<bool>> existsAsync,
           Action<Goal, TEntity> addToGoal,
           string duplicateErrorMessage,
           Guid goalId)
        {
            var goal = await _goalRepository.GetGoalByIdAsync(goalId);

            if (await existsAsync(request))
            {
                throw new AppException(JsonConvert.SerializeObject(new ExceptionObject
                {
                    ErrorCode = ServerErrorCodes.Duplicate.ToString(),
                    Message = duplicateErrorMessage
                }));
            }

            var entity = _mapper.Map<TEntity>(request);

            addToGoal(goal, entity);

            await _goalRepository.UpdateAsync(goal);

            var createdResponse = _mapper.Map<TResponse>(entity);

            if (createdResponse is GoalTaskResponse taskResponse)
            {
                taskResponse.GoalID = goalId;
            }
            else if (createdResponse is GoalCommentResponse commentResponse)
            {
                commentResponse.GoalId = goalId;
            }

            return createdResponse;
        }

    }
}