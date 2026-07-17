import { useEffect, useState, useCallback } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

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
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskValue, setEditingTaskValue] = useState('');
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  // For adding tasks during project creation
  const [newTaskInputs, setNewTaskInputs] = useState({});
  const [newProjectDueDate, setNewProjectDueDate] = useState('');
  // Modal & Task states
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [taskLoading, setTaskLoading] = useState(false);

  // Templates & Recurrence states
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [taskRecurrence, setTaskRecurrence] = useState({});
  const [taskDueDate, setTaskDueDate] = useState({});

  // Fetch templates from backend
  const fetchTemplates = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/templates', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTemplates(res.data);
    } catch {
      // Silently ignore
    }
  }, []);

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
    fetchTemplates();
  }, [fetchProjects, fetchTemplates]);

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
          dueDate: newProjectDueDate || undefined,
          templateId: selectedTemplateId || undefined
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setNewProject('');
      setNewDescription('');
      setShowCreate(false);
      setNewTasks([{ title: '', dueDate: '' }]);
      setNewProjectDueDate('');
      setSelectedTemplateId('');
      fetchProjects(); // Refresh list
    } catch {
      setError('Failed to create project. Please try again.');
    } finally {
      setCreateLoading(false);
    }
  };
  const handleSaveAsTemplate = async (project) => {
    try {
      const templateTitle = prompt('Enter a name for this project template:', `${project.title} Template`);
      if (!templateTitle || !templateTitle.trim()) return;

      const tasksToSave = (project.tasks || []).map(t => ({
        title: t.title,
        priority: t.priority || 'Medium'
      }));

      await axios.post(
        'http://localhost:5000/api/templates',
        {
          title: templateTitle.trim(),
          description: `Template saved from project: ${project.title}`,
          tasks: tasksToSave
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Project saved as template successfully!');
      fetchTemplates(); // Refresh template list
    } catch {
      setError('Failed to save project as template.');
    }
  };
  const handleDeleteTemplate = async (templateId) => {
    if (!window.confirm('Are you sure you want to delete this custom template?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/templates/${templateId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchTemplates();
      if (selectedTemplateId === templateId) {
        setSelectedTemplateId('');
      }
    } catch {
      setError('Failed to delete template.');
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
  const fetchComments = async (taskId) => {
    const res = await axios.get(`http://localhost:5000/api/comments/${taskId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setComments(prev => ({ ...prev, [taskId]: res.data }));
  };
  const handleAddComment = async (taskId) => {
    const text = commentInputs[taskId];
    if (!text?.trim()) return;
    await axios.post(
      `http://localhost:5000/api/comments/${taskId}`,
      { text },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    setCommentInputs(inputs => ({ ...inputs, [taskId]: '' }));
    fetchComments(taskId);
  };
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setCurrentUserId(res.data._id))
      .catch(() => setCurrentUserId(null));
  }, []);
  const handleAddTaskField = () => {
    setNewTasks(tasks => [...tasks, { title: '', dueDate: '' }]);
  };
  const handleDeleteComment = async (commentId, taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchComments(taskId);
    } catch {
      alert('Failed to delete comment.');
    }
  };

  const handleRemoveTaskField = (idx) => {
    setNewTasks(tasks => tasks.length === 1 ? tasks : tasks.filter((_, i) => i !== idx));
  };

  const handleSaveEditTask = async (task) => {
  if (!editingTaskValue.trim()) return;
  try {
    await axios.put(
      `http://localhost:5000/api/tasks/${task._id}`,
      { title: editingTaskValue.trim() },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    setEditingTaskId(null);
    setEditingTaskValue('');
    fetchProjects();
  } catch {
    setError('Failed to update task.');
  }
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
  const handleMarkActive = async (projectId) => {
  try {
    await axios.put(
      `http://localhost:5000/api/projects/${projectId}/active`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    fetchProjects();
    if (selectedProject && selectedProject._id === projectId) {
      setSelectedProject({ ...selectedProject, status: 'Active' });
    }
  } catch {
    setError('Failed to mark as active.');
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
    <Navbar />
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
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: '0.85em', fontWeight: 500, color: '#475569' }}>Project Template:</label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => {
                    setSelectedTemplateId(e.target.value);
                    const selected = templates.find(t => t._id === e.target.value);
                    if (selected && !newProject.trim()) {
                      setNewProject(selected.title);
                    }
                  }}
                  className="project-input"
                  style={{ width: '100%', padding: '6px 10px', borderRadius: 6, border: '1.5px solid #cbd5e1', color: '#000000', backgroundColor: '#ffffff' }}
                  disabled={createLoading}
                >
                  <option value="" style={{ color: '#000000', backgroundColor: '#ffffff' }}>Blank Project (No Template)</option>
                  {templates.map(tpl => (
                    <option key={tpl._id} value={tpl._id} style={{ color: '#000000', backgroundColor: '#ffffff' }}>
                      {tpl.title} {tpl.isDefault ? '(System)' : '(Custom)'}
                    </option>
                  ))}
                </select>
                {templates.filter(t => !t.isDefault).length > 0 && (
                  <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: '0.8em', fontWeight: 500, color: '#475569' }}>Your Custom Templates (Click 🗑 to delete):</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                      {templates.filter(t => !t.isDefault).map(t => (
                        <div key={t._id} style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 6, padding: '4px 10px', fontSize: '0.8em', gap: 8, color: '#0f172a' }}>
                          <span style={{ fontWeight: 500 }}>{t.title}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteTemplate(t._id)}
                            style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1em', padding: 0 }}
                            title="Delete Template"
                          >
                            🗑
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {selectedTemplateId && (
                  <span style={{ fontSize: '0.78em', color: '#64748b', marginTop: 4 }}>
                    * Selecting a template will automatically pre-populate standard tasks.
                  </span>
                )}
              </div>
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
                        {project.status === 'Completed' && (
                          <button
                            className="project-action-btn"
                            onClick={() => handleMarkActive(project._id)}
                            title="Mark as Active"
                          >
                            ⬅
                          </button>
                        )}
                        <button
                          className="project-action-btn"
                          onClick={() => handleDeleteProject(project._id)}
                          title="Delete Project"
                        >
                          🗑
                        </button>
                        <button
                          className="project-action-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveAsTemplate(project);
                          }}
                          title="Save Project as Template"
                        >
                          💾
                        </button>
                      </div>
                      {/* Expanded task list */}
                      {expandedProjects.includes(project._id) && (
                        <div style={{ marginTop: 18 }}>
                          {(project.tasks && project.tasks.length > 0) ? (
                            project.tasks.map(task => (
                              <div key={task._id} className="task-card">
                                <div className="task-card-header">
                                  {editingTaskId === task._id ? (
                                    <>
                                      <input
                                        type="text"
                                        value={editingTaskValue}
                                        onChange={e => setEditingTaskValue(e.target.value)}
                                        style={{ fontSize: '1em', padding: '2px 6px', borderRadius: 4, border: '1.5px solid #2563eb', marginRight: 8 }}
                                        autoFocus
                                        onKeyDown={e => {
                                          if (e.key === 'Enter') handleSaveEditTask(task);
                                          if (e.key === 'Escape') setEditingTaskId(null);
                                        }}
                                      />
                                      <button
                                        style={{ marginRight: 6, background: '#10b981', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 10px', cursor: 'pointer' }}
                                        onClick={() => handleSaveEditTask(task)}
                                        disabled={!editingTaskValue.trim()}
                                      >Save</button>
                                      <button
                                        style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 10px', cursor: 'pointer' }}
                                        onClick={() => setEditingTaskId(null)}
                                      >Cancel</button>
                                    </>
                                  ) : (
                                    <>
                                      <span
                                        className={`task-title ${task.status === 'Completed' ? 'task-completed' : ''}`}
                                        title="Double-click or click ✏️ to edit"
                                        onDoubleClick={() => {
                                          setEditingTaskId(task._id);
                                          setEditingTaskValue(task.title);
                                        }}
                                      >
                                        {task.title}
                                      </span>
                                      <button
                                        style={{
                                          background: 'none',
                                          border: 'none',
                                          color: '#2563eb',
                                          cursor: 'pointer',
                                          fontSize: 16
                                        }}
                                        onClick={() => {
                                          setEditingTaskId(task._id);
                                          setEditingTaskValue(task.title);
                                        }}
                                        title="Edit Task"
                                        aria-label="Edit Task"
                                      >✏️</button>
                                    </>
                                  )}
                                  {task.dueDate && (
                                    <span className="task-due">
                                      {new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                  )}
                                  {task.recurrence && task.recurrence !== 'None' && (
                                    <span style={{
                                      fontSize: '0.8em',
                                      color: '#7c3aed',
                                      background: '#f3e8ff',
                                      padding: '2px 8px',
                                      borderRadius: '12px',
                                      marginLeft: 8,
                                      fontWeight: 500,
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: 4
                                    }}>
                                      🔁 {task.recurrence}
                                    </span>
                                  )}
                                  <span className="task-status">{task.status || 'Active'}</span>
                                  {task.status !== 'Completed' && (
                                    <button
                                      className="task-action-btn"
                                      style={{
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
                                  <button
                                    className="task-comments-toggle"
                                    onClick={() => {
                                      if (comments[task._id]) {
                                        // Hide comments
                                        setComments(prev => ({ ...prev, [task._id]: null }));
                                      } else {
                                        // Show and fetch comments
                                        fetchComments(task._id);
                                      }
                                    }}
                                  >
                                    {comments[task._id] ? 'Hide Comments' : 'Show Comments'}
                                  </button>
                                </div>
                                {/* Comments Section */}
                                {comments[task._id] && (
                                  <div className="task-comments">
                                    <ul>
                                      {Array.isArray(comments[task._id]) && comments[task._id].map(c => (
                                        <li key={c._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                          <span>
                                            <strong>{c.user?.name || 'User'}:</strong> {c.text}
                                            <span style={{ fontSize: '0.8em', color: '#888', marginLeft: 8 }}>
                                              {new Date(c.createdAt).toLocaleString()}
                                            </span>
                                          </span>
                                          {c.user && c.user._id === currentUserId && (
                                            <button
                                              className="comment-delete-btn"
                                              onClick={() => handleDeleteComment(c._id, task._id)}
                                              title="Delete Comment"
                                            >🗑</button>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                    <input
                                      type="text"
                                      value={commentInputs[task._id] || ''}
                                      onChange={e => setCommentInputs(inputs => ({ ...inputs, [task._id]: e.target.value }))}
                                      placeholder="Add a comment..."
                                    />
                                    <button onClick={() => handleAddComment(task._id)}>Add</button>
                                  </div>
                                )}
                              </div>
                            ))
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
                                  {
                                    title: taskValue.trim(),
                                    recurrence: taskRecurrence[project._id] || 'None',
                                    dueDate: taskDueDate[project._id] || undefined
                                  },
                                  { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                                );
                                setNewTaskInputs(inputs => ({ ...inputs, [project._id]: '' }));
                                setTaskRecurrence(rec => ({ ...rec, [project._id]: 'None' }));
                                setTaskDueDate(dates => ({ ...dates, [project._id]: '' }));
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
                              placeholder="Add new task..."
                              className="project-input"
                              style={{ marginRight: 8, minWidth: 180 }}
                              disabled={taskLoading}
                            />
                            <select
                              value={taskRecurrence[project._id] || 'None'}
                              onChange={e =>
                                setTaskRecurrence(rec => ({
                                  ...rec,
                                  [project._id]: e.target.value
                                }))
                              }
                              className="project-input"
                              style={{ marginRight: 8, padding: '4px 6px', borderRadius: 6, border: '1.5px solid #cbd5e1' }}
                              disabled={taskLoading}
                            >
                              <option value="None">No Repeat</option>
                              <option value="Daily">Daily</option>
                              <option value="Weekly">Weekly</option>
                              <option value="Monthly">Monthly</option>
                            </select>
                            <input
                              type="date"
                              value={taskDueDate[project._id] || ''}
                              onChange={e =>
                                setTaskDueDate(dates => ({
                                  ...dates,
                                  [project._id]: e.target.value
                                }))
                              }
                              className="project-input"
                              style={{ marginRight: 8, padding: '4px 6px', borderRadius: 6, border: '1.5px solid #cbd5e1' }}
                              disabled={taskLoading}
                            />
                            <button
                              type="submit"
                              disabled={taskLoading || !(newTaskInputs[project._id] || '').trim()}
                              style={{
                                background: '#2563eb',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 4,
                                padding: '4px 14px',
                                cursor: 'pointer'
                              }}
                            >
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