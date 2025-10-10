import React, { useState, useMemo } from 'react';
import Task from './Task';

const TaskList = ({ tasks, toggleComplete, deleteTask, selectTaskToEdit }) => {
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return true;
      })
      .filter(task => {
        if (priorityFilter === 'all') return true;
        return task.priority === priorityFilter;
      })
      .filter(task => {
        if (!searchTerm) return true;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return (
          task.name.toLowerCase().includes(lowerCaseSearch) ||
          task.description.toLowerCase().includes(lowerCaseSearch)
        );
      })
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
  }, [tasks, filter, priorityFilter, searchTerm]);

  return (
    <div>
      <div className="controls-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="filter-select"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '30px' }}>
          No tasks match the search filter.
        </p>
      ) : (
        filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            selectTaskToEdit={selectTaskToEdit}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;