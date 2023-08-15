using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.BL.Models.Request;
using System.Threading.Tasks;

namespace G4L.UserManagement.BL.Interfaces
{
    public interface IGoalTaskRepository:IRepository<GoalTask>
    {
        Task<GoalTask> UpdateTaskAsync(GoalTaskRequest taskRequest);
    }

}
