import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import DarkModeToggle from './components/DarkModeToggle';
import ToastContainer from './components/ToastContainer';
import Modal from './components/Modal';
import Footer from './components/Footer';
import { useToast } from './contexts/ToastContext';

const getInitialTasks = () => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const App = () => {
  const [tasks, setTasks] = useState(getInitialTasks);
  const [loading, setLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { success, error, info } = useToast();

  useEffect(() => {
    if (tasks.length === 0) {
      setLoading(true);
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then(response => response.json())
        .then(apiTasks => {
          const newTasks = apiTasks.map(todo => ({
            id: todo.id,
            name: todo.title,
            description: "This task was fetched from external API.",
            deadline: "",
            priority: todo.id % 2 === 0 ? 'high' : 'medium',
            completed: todo.completed,
          }));
          setTasks(newTasks);
          success('Tasks loaded successfully from server');
        })
        .catch(error => {
          console.error("Error loading tasks:", error);
          error('Failed to load tasks from server');
        })
        .finally(() => setLoading(false));
    }
  }, [success, error]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (task) => {
    setTasks([...tasks, task]);
    success('Task added successfully');
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
    success('Task updated successfully');
  };

  const toggleComplete = (id) => {
    const task = tasks.find(t => t.id === id);
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    if (task) {
      const message = task.completed ? 'Task completion undone' : 'Task completed successfully';
      success(message);
    }
  };

  const deleteTask = (id) => {
    const task = tasks.find(t => t.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    if (task) {
      success(`Task deleted: ${task.name}`);
    }
  };
  
  const selectTaskToEdit = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
    info('Task selected for editing');
  };

  const openAddTaskModal = () => {
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const deleteCompletedTasks = () => {
    const completedTasks = tasks.filter(task => task.completed);
    if (completedTasks.length === 0) {
      info('No completed tasks to delete');
      return;
    }
    setTasks(tasks.filter(task => !task.completed));
    success(`${completedTasks.length} completed tasks deleted`);
  };

  return (
    <div className="container">
      <DarkModeToggle />
      <h1>Smart Task Organizer App</h1>

      <div className="action-buttons-container">
        <button 
          onClick={openAddTaskModal}
          className="btn-add-task"
        >
          ➕ Add New Task
        </button>
        
        <button 
          onClick={deleteCompletedTasks} 
          className="btn-delete-completed"
        >
          🗑️ Delete Completed
        </button>
      </div>
      
      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '1.2em' }}>
          Loading tasks from server... ⏳
        </p>
      ) : (
        <TaskList
          tasks={tasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          selectTaskToEdit={selectTaskToEdit}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentTask ? 'Edit Task' : 'Add New Task'}
        size="medium"
      >
        <TaskForm
          addTask={addTask}
          editTask={editTask}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          onClose={closeModal}
        />
      </Modal>
      
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default App;