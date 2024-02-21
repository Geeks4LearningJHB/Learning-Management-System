using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Enum;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.Infrustructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Repositories
{
    public class GoalsRepository : Repository<Goal>, IGoalRepository
    {
        private readonly DatabaseContext _databaseContext;

        public GoalsRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public Task<List<Goal>> GetAllGoalsByUserIdAsync(Guid userID)
        {
            return _databaseContext.Goals
                .Where(goal => goal.UserId == userID)
                .Include(goal => goal.Tasks)
                .Include(goal => goal.Comments)
                .ToListAsync();
        }

        public Task<Goal> GetGoalByIdAsync(Guid goalID)
        {
            return _databaseContext.Goals
                .Where(goal => goal.Id == goalID)
                .Include(x => x.Tasks)
                .Include(x => x.Comments)
                .FirstOrDefaultAsync();
        }

        public async Task<Goal> UpdateGoalAsync(Goal goalRequest)
        {
            var getGoalById = await _databaseContext.Goals.FindAsync(goalRequest.Id);

            if (getGoalById != null)
            {
                getGoalById.Title = goalRequest.Title;
                getGoalById.Description = goalRequest.Description;
                getGoalById.GoalStatus = goalRequest.GoalStatus;
                getGoalById.Duration = goalRequest.Duration;
                getGoalById.ArchiveCount = goalRequest.ArchiveCount;
                getGoalById.TimeRemaining = goalRequest.TimeRemaining;
                getGoalById.PausedCount = goalRequest.PausedCount;

                await _databaseContext.SaveChangesAsync();
            }

            return getGoalById;
        }

    }
}
