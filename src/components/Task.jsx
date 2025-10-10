import React from 'react';

const Task = ({ task, toggleComplete, deleteTask, selectTaskToEdit }) => {
  const taskClasses = `task-item priority-${task.priority} ${
    task.completed ? 'task-completed' : ''
  }`;

  return (
    <div className={taskClasses}>
      <div className="task-details">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="task-checkbox"
        />
        
        <div className="task-content">
          <h3 className="task-title">{task.name}</h3>
          <div className="task-meta">
            <span className="task-priority">
              <span className="priority-label">Priority:</span> 
              <span className={`priority-badge priority-${task.priority}`}>
                {task.priority === 'high' ? 'High' : 
                 task.priority === 'medium' ? 'Medium' : 'Low'}
              </span>
            </span>
            <span className="task-deadline">
              <span className="deadline-label">Deadline:</span> 
              <span className="deadline-value">
                {task.deadline || 'Not set'}
              </span>
            </span>
          </div>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button 
          onClick={() => selectTaskToEdit(task)}
          className="btn-edit"
          title="Edit Task"
        >
          ✏️ Edit
        </button>
        <button 
          onClick={() => deleteTask(task.id)} 
          className="btn-delete"
          title="Delete Task"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default Task;