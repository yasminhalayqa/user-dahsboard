import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, editTask, currentTask, setCurrentTask, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('low');

  useEffect(() => {
    if (currentTask) {
      setName(currentTask.name);
      setDescription(currentTask.description);
      setDeadline(currentTask.deadline);
      setPriority(currentTask.priority);
    } else {
      setName('');
      setDescription('');
      setDeadline('');
      setPriority('low');
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newTask = {
      id: currentTask ? currentTask.id : Date.now(),
      name,
      description,
      deadline,
      priority,
      completed: currentTask ? currentTask.completed : false,
    };

    if (currentTask) {
      editTask(newTask);
      setCurrentTask(null);
    } else {
      addTask(newTask);
    }

    if (onClose) {
      onClose();
    }
    setName('');
    setDescription('');
    setDeadline('');
    setPriority('low');
  };

  const handleCancel = () => {
    setCurrentTask(null);
    if (onClose) {
      onClose();
    }
  };

  return (
    <form className="task-form-modal" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Task Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter task name"
          autoFocus
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="deadline">Deadline:</label>
        <input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter brief task description (optional)"
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {currentTask ? 'Save Changes' : 'Add Task'}
        </button>
        <button type="button" onClick={handleCancel} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;