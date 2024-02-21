using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Interfaces;
using G4L.UserManagement.BL.Models.Request;
using G4L.UserManagement.BL.Models.Response;
using G4L.UserManagement.Infrustructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace G4L.UserManagement.DA.Repositories
{
    public class GoalTaskRepository : Repository<GoalTask>, IGoalTaskRepository
    {
        private readonly DatabaseContext _databaseContext;

        public GoalTaskRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<GoalTask> UpdateTaskAsync(GoalTaskRequest taskRequest)
        {
            return await Task.Run(async () =>
            {

                var getTaskById = _databaseContext.GoalTasks.Where(task => task.Id == taskRequest.Id).FirstOrDefault();
                getTaskById.Title = taskRequest.Title;
                getTaskById.Complete = taskRequest.Complete;

                _databaseContext.Entry(getTaskById).State = EntityState.Modified;
                await _databaseContext.SaveChangesAsync();
                return getTaskById;
            });
        }
    }
}
