import { useEffect, useState, useCallback } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newProject, setNewProject] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [createLoading, setCreateLoading] = useState(false);

  // For adding tasks during project creation
  const [newTasks, setNewTasks] = useState([{ title: '', dueDate: '' }]);

  // Modal & Task states
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [taskLoading, setTaskLoading] = useState(false);

  // Fetch projects from backend
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('http://localhost:5000/api/projects', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProjects(res.data);
    } catch {
      setError('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const trimmedProject = newProject.trim();
    if (!trimmedProject) {
      setError('Project name cannot be empty');
      return;
    }
    // Filter out empty tasks
    const tasksToSend = newTasks
      .filter(t => t.title.trim())
      .map(t => ({ title: t.title.trim(), dueDate: t.dueDate || undefined }));

    try {
      setCreateLoading(true);
      setError('');
      await axios.post(
        'http://localhost:5000/api/projects',
        { title: trimmedProject, description: newDescription, tasks: tasksToSend },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setNewProject('');
      setNewDescription('');
      setShowCreate(false);
      setNewTasks([{ title: '', dueDate: '' }]);
      fetchProjects(); // Refresh list
    } catch {
      setError('Failed to create project. Please try again.');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleTaskInputChange = (idx, field, value) => {
    setNewTasks(tasks =>
      tasks.map((t, i) => (i === idx ? { ...t, [field]: value } : t))
    );
  };

  const handleAddTaskField = () => {
    setNewTasks(tasks => [...tasks, { title: '', dueDate: '' }]);
  };

  const handleRemoveTaskField = (idx) => {
    setNewTasks(tasks => tasks.length === 1 ? tasks : tasks.filter((_, i) => i !== idx));
  };


  const handleRetry = () => {
    fetchProjects();
  };

  const dismissError = () => {
    setError('');
  };

  const toggleCreateForm = () => {
    setShowCreate(prev => !prev);
    setNewProject('');
    setError('');
  };

  // Project actions
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
    setNewTask('');
  };

  const closeProjectModal = () => {
    setShowProjectModal(false);
    setSelectedProject(null);
    setNewTask('');
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      setTaskLoading(true);
      await axios.post(
        `http://localhost:5000/api/projects/${selectedProject._id}/tasks`,
        { title: newTask.trim() },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setNewTask('');
      fetchProjects();
      // Refresh selected project
      const updated = await axios.get(`http://localhost:5000/api/projects/${selectedProject._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSelectedProject(updated.data);
    } catch {
      setError('Failed to add task.');
    } finally {
      setTaskLoading(false);
    }
  };

  const handleMarkCompleted = async (projectId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/projects/${projectId}/complete`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchProjects();
      if (selectedProject && selectedProject._id === projectId) {
        setSelectedProject({ ...selectedProject, status: 'Completed' });
      }
    } catch {
      setError('Failed to mark as completed.');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchProjects();
      closeProjectModal();
    } catch {
      setError('Failed to delete project.');
    }
  };

  // Calculate stats
  const totalTasks = projects.reduce((acc, p) => acc + (p.tasks?.length || 0), 0);
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const activeProjects = projects.length - completedProjects;

  // If not authenticated
  if (!localStorage.getItem('token')) {
    return (
      <div className="auth-required">
        <div className="auth-card">
          <h1>Authentication Required</h1>
          <p>Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <span className="logo">Task Manager</span>
          <div className="nav-links">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/dashboard" className="nav-link active">Dashboard</Link>
            <Link to="/analytics" className="nav-link">Analytics</Link>
            <Link to="/calendar" className="nav-link">Calendar</Link>
            <Link to="/" className="nav-link">Login</Link>
          </div>
        </div>
      </nav>
      <div className="dashboard">
        <div className="dashboard-container">
          {/* Header */}
          <div className="header-card">
            <div className="header-content">
              <div className="header-text">
                <p>Manage your projects and track your progress</p>
              </div>
              <button
                onClick={toggleCreateForm}
                disabled={createLoading}
                className="new-project-btn"
                aria-label="Create new project"
              >
                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {showCreate ? 'Cancel' : 'New Project'}
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="error-alert">
              <div className="error-content">
                <div className="error-message">
                  <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>{error}</p>
                </div>
                <div className="error-actions">
                  <button onClick={handleRetry} className="retry-btn">Retry</button>
                  <button onClick={dismissError} className="dismiss-btn" aria-label="Dismiss error">
                    <svg className="dismiss-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-icon blue">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="stat-info">
                  <h3>{projects.length}</h3>
                  <p>Total Projects</p>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-icon green">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="stat-info">
                  <h3>{totalTasks}</h3>
                  <p>Total Tasks</p>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-icon purple">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="stat-info">
                  <h3>{completedProjects}</h3>
                  <p>Completed</p>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-icon orange">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="stat-info">
                  <h3>{activeProjects}</h3>
                  <p>Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Create Project Form */}
          {showCreate && (
    <div className="create-form-card">
      <h3>Create New Project</h3>
      <form className="create-form" onSubmit={handleCreateProject}>
        <input
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          placeholder="Enter project name"
          className="project-input"
          autoFocus
          disabled={createLoading}
          maxLength={100}
        />
        <textarea
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
          placeholder="Project description (optional)"
          className="project-input"
          style={{ marginTop: 8, minHeight: 40 }}
          disabled={createLoading}
          maxLength={500}
        />
        <div className="create-tasks-section" style={{ marginTop: 10 }}>
          <label style={{ fontWeight: 500, marginBottom: 4 }}>Add Tasks:</label>
          {newTasks.map((task, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <input
                type="text"
                value={task.title}
                onChange={e => handleTaskInputChange(idx, 'title', e.target.value)}
                placeholder={`Task ${idx + 1} title`}
                className="project-input"
                style={{ flex: 2 }}
                disabled={createLoading}
                maxLength={100}
              />
              <input
                type="date"
                value={task.dueDate}
                onChange={e => handleTaskInputChange(idx, 'dueDate', e.target.value)}
                className="project-input"
                style={{ flex: 1 }}
                disabled={createLoading}
              />
              <button
                type="button"
                onClick={() => handleRemoveTaskField(idx)}
                disabled={newTasks.length === 1}
                style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 'bold', fontSize: 18, cursor: 'pointer' }}
                title="Remove Task"
              >×</button>
            </div>
            ))}
          <button
            type="button"
            onClick={handleAddTaskField}
            style={{ marginTop: 4, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}
            disabled={createLoading}
          >+ Add Task</button>
        </div>
        <button
          type="submit"
          disabled={createLoading || !newProject.trim()}
          className="create-btn"
          style={{ marginTop: 12 }}
        >
          {createLoading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  )}
          {/* Projects List */}
          <div className="projects-card">
            <div className="projects-header">
              <h2>Your Projects</h2>
            </div>
            <div className="projects-content">
              {loading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <span>Loading projects...</span>
                </div>
              ) : projects.length === 0 ? (
                <div className="empty-state">
                  <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3>No projects yet</h3>
                  <p>Get started by creating your first project</p>
                  <button onClick={toggleCreateForm} className="empty-create-btn">
                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Project
                  </button>
                </div>
              ) : (
                <div className="projects-list">
                  {projects.map((project) => {
                    const completedTasks = (project.tasks || []).filter(t => t.status === 'Completed').length;
                    const totalTasks = (project.tasks || []).length;
                    const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
                    return (
                      <div key={project._id} className="project-item">
                        <div className="project-main" onClick={() => openProjectModal(project)} style={{ cursor: 'pointer' }}>
                          <div className={`project-status ${project.status === 'Completed' ? 'completed' : 'active'}`}></div>
                          <h3>{project.title}</h3>
                        </div>
                        <div className="project-meta">
                          <span className="task-count">{totalTasks} tasks</span>
                          <span className={`status-badge ${project.status === 'Completed' ? 'completed' : 'active'}`}>
                            {project.status || 'Active'}
                          </span>
                          {totalTasks > 0 && (
                            <span className="progress-bar" title={`${progress}% completed`}>
                              <span className="progress-inner" style={{
                                width: `${progress}%`,
                                background: project.status === 'Completed' ? '#10b981' : '#2563eb'
                              }}></span>
                            </span>
                          )}
                          <button
                            className="create-btn"
                            style={{ padding: '2px 10px', fontSize: 14, marginTop: 8 }}
                            onClick={() => {
                              setSelectedProject(project);
                              setShowProjectModal(true);
                            }}
                          >
                            + Add Task
                          </button>
                          <button
                            className="project-action-btn"
                            onClick={() => handleMarkCompleted(project._id)}
                            disabled={project.status === 'Completed'}
                            title="Mark as Completed"
                          >
                            ✔
                          </button>
                          <button
                            className="project-action-btn"
                            onClick={() => handleDeleteProject(project._id)}
                            title="Delete Project"
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {showProjectModal && selectedProject && (
        <div className="modal-overlay" onClick={closeProjectModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProjectModal}>&times;</button>
            <h2>{selectedProject.title}</h2>
            <p>Status: <b>{selectedProject.status || 'Active'}</b></p>
            <h4>Tasks:</h4>
            {selectedProject.tasks && selectedProject.tasks.length > 0 ? (
              <ul className="modal-task-list">
                {selectedProject.tasks.map(task => (
                  <li key={task._id}>
                    <span className={task.status === 'Completed' ? 'task-completed' : ''}>{task.title}</span>
                    <span className="task-status">{task.status || 'Active'}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tasks yet.</p>
            )}
            <form className="modal-add-task" onSubmit={handleAddTask}>
              <input
                type="text"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                placeholder="Add new task"
                disabled={taskLoading}
              />
              <button type="submit" disabled={taskLoading || !newTask.trim()}>
                {taskLoading ? 'Adding...' : 'Add Task'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;