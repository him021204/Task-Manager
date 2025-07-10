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
  const [expandedProjects, setExpandedProjects] = useState([]);
  const [newTasks, setNewTasks] = useState([{ title: '', dueDate: '' }]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  // For adding tasks during project creation
  const [newTaskInputs, setNewTaskInputs] = useState({});
  const [newProjectDueDate, setNewProjectDueDate] = useState('');
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
        {
          title: trimmedProject,
          description: newDescription,
          tasks: tasksToSend,
          dueDate: newProjectDueDate || undefined // <-- This will now work!
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setNewProject('');
      setNewDescription('');
      setShowCreate(false);
      setNewTasks([{ title: '', dueDate: '' }]);
      setNewProjectDueDate('');
      fetchProjects(); // Refresh list
    } catch {
      setError('Failed to create project. Please try again.');
    } finally {
      setCreateLoading(false);
    }
  };
  const toggleExpandProject = (projectId) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
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
            <div className="nav-profile">
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center' }}>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ background: "#f1f5f9", borderRadius: "50%", padding: 8, boxShadow: "0 2px 8px #e0e7ff" }}
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 16-4 16 0" />
                </svg>
              </Link>
            </div>
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
          {/* ...your stat cards code here (unchanged)... */}
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
        {/* Dashboard Stats */}
        <div className="dashboard-stats" style={{
          display: 'flex',
          gap: '2rem',
          margin: '24px 0 16px 0',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 600,
          fontSize: '1.1rem'
        }}>
          <span>
            <span style={{ color: '#2563eb' }}>Total Projects:</span> {projects.length}
          </span>
          <span>
            <span style={{ color: '#10b981' }}>Total Tasks:</span> {totalTasks}
          </span>
          <span>
            <span style={{ color: '#8b5cf6' }}>Completed Projects:</span> {completedProjects}
          </span>
        </div>
        <div className="dashboard-search-filter" style={{ display: 'flex', gap: 16, margin: '18px 0 10px 0', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search projects or tasks..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="project-input"
            style={{ minWidth: 220, maxWidth: 320 }}
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="project-input"
            style={{ minWidth: 120 }}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
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
                {/* ...empty state code... */}
              </div>
            ) : (
              <div className="projects-list">
                {projects
                .filter(project => {
                // Filter by status
                if (
                  statusFilter !== 'All' &&
                  ((project.status || 'Active').toLowerCase() !== statusFilter.toLowerCase())
                ) return false;
                // Filter by search term in project title, description, or any task title
                const term = searchTerm.toLowerCase();
                if (!term) return true;
                if (project.title.toLowerCase().includes(term)) return true;
                if (project.description && project.description.toLowerCase().includes(term)) return true;
                if (project.tasks && project.tasks.some(t => t.title.toLowerCase().includes(term))) return true;
                return false;
              })
                .map((project) => {
                  const completedTasks = (project.tasks || []).filter(t => t.status === 'Completed').length;
                  const totalTasks = (project.tasks || []).length;
                  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
                  return (
                    <div key={project._id} className="project-item">
                      <div
                        className="project-main"
                        onClick={() => toggleExpandProject(project._id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className={`project-status ${project.status === 'Completed' ? 'completed' : 'active'}`}></div>
                        <h3>{project.title}</h3>
                        <span style={{ marginLeft: 'auto', color: '#2563eb', fontWeight: 600 }}>
                          {expandedProjects.includes(project._id) ? '▲' : '▼'}
                        </span>
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
                      {/* Expanded task list */}
                      {expandedProjects.includes(project._id) && (
                        <div className="expanded-tasks">
                          {(project.tasks && project.tasks.length > 0) ? (
                            <ul className="modal-task-list">
                              {project.tasks.map(task => (
                                <li key={task._id}>
                                  <span className={task.status === 'Completed' ? 'task-completed' : ''}>{task.title}</span>
                                  {task.dueDate && (
                                    <span style={{ color: '#64748b', fontSize: '0.9em', marginLeft: 8 }}>
                                      {new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                  )}
                                  <span className="task-status">{task.status || 'Active'}</span>
                                  {task.status !== 'Completed' && (
                                    <button
                                      className="task-action-btn"
                                      style={{
                                        marginLeft: 8,
                                        background: '#10b981',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '2px 10px',
                                        cursor: 'pointer',
                                        fontSize: '0.95em'
                                      }}
                                      onClick={async () => {
                                        try {
                                          await axios.put(
                                            `http://localhost:5000/api/tasks/${task._id}/complete`,
                                            {},
                                            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                                          );
                                          fetchProjects();
                                        } catch {
                                          setError('Failed to mark task as completed.');
                                        }
                                      }}
                                      title="Mark Task as Completed"
                                    >
                                      Done
                                    </button>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p style={{ margin: '8px 0 0 0', color: '#64748b' }}>No tasks yet.</p>
                          )}
                          {/* Add Task Inline */}
                          <form
                            className="modal-add-task"
                            onSubmit={async e => {
                              e.preventDefault();
                              const taskValue = newTaskInputs[project._id] || '';
                              if (!taskValue.trim()) return;
                              try {
                                setTaskLoading(true);
                                await axios.post(
                                  `http://localhost:5000/api/projects/${project._id}/tasks`,
                                  { title: taskValue.trim() },
                                  { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                                );
                                setNewTaskInputs(inputs => ({ ...inputs, [project._id]: '' }));
                                fetchProjects();
                              } catch {
                                setError('Failed to add task.');
                              } finally {
                                setTaskLoading(false);
                              }
                            }}
                          >
                            <input
                              type="text"
                              value={newTaskInputs[project._id] || ''}
                              onChange={e =>
                                setNewTaskInputs(inputs => ({
                                  ...inputs,
                                  [project._id]: e.target.value
                                }))
                              }
                              placeholder="Add new task"
                              disabled={taskLoading}
                            />
                            <button type="submit" disabled={taskLoading || !(newTaskInputs[project._id] || '').trim()}>
                              {taskLoading ? 'Adding...' : 'Add Task'}
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
);
}
export default Dashboard;