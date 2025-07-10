import { useEffect, useState, useCallback } from 'react';
import './Dashboard.css';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// Mock data and functions for demonstration
const mockUser = { name: 'John Doe' };
const mockProjects = [
  { _id: '1', title: 'Website Redesign', status: 'Active', tasks: [1, 2, 3] },
  { _id: '2', title: 'Mobile App', status: 'Completed', tasks: [1, 2] },
  { _id: '3', title: 'Database Migration', status: 'Active', tasks: [1] }
];

const Dashboard = () => {
  // const { user } = useAuth();
  const user = mockUser; // Mock user for demo
  const [projects, setProjects] = useState(mockProjects);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newProject, setNewProject] = useState('');
  const [createLoading, setCreateLoading] = useState(false);

  // Mock API calls
  const mockApiCall = (delay = 1000) => 
    new Promise(resolve => setTimeout(resolve, delay));

  const getAuthHeaders = useCallback(() => ({
    Authorization: `Bearer mock-token`,
  }), []);

  const fetchProjects = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError('');
      await mockApiCall(500); // Simulate API call
      // In real app: const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects`, { headers: getAuthHeaders() });
      // setProjects(response.data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user, getAuthHeaders]);

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

    try {
      setCreateLoading(true);
      setError('');
      
      await mockApiCall(800); // Simulate API call
      
      // Mock new project creation
      const newProjectObj = {
        _id: Date.now().toString(),
        title: trimmedProject,
        status: 'Active',
        tasks: []
      };
      
      setProjects(prev => [newProjectObj, ...prev]);
      setNewProject('');
      setShowCreate(false);
    } catch (err) {
      console.error('Failed to create project:', err);
      setError('Failed to create project. Please try again.');
    } finally {
      setCreateLoading(false);
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

  // Calculate stats
  const totalTasks = projects.reduce((acc, p) => acc + (p.tasks?.length || 0), 0);
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const activeProjects = projects.length - completedProjects;

  if (!user) {
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
    <div className="dashboard">
      <div className="dashboard-container">
        
        {/* Header */}
        <div className="header-card">
          <div className="header-content">
            <div className="header-text">
              <h1>Welcome back, {user?.name}!</h1>
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
            <div className="create-form">
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
              <button
                type="button"
                onClick={handleCreateProject}
                disabled={createLoading || !newProject.trim()}
                className="create-btn"
              >
                {createLoading ? 'Creating...' : 'Create'}
              </button>
            </div>
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
                {projects.map((project) => (
                  <div key={project._id} className="project-item">
                    <div className="project-main">
                      <div className={`project-status ${project.status === 'Completed' ? 'completed' : 'active'}`}></div>
                      <h3>{project.title}</h3>
                    </div>
                    <div className="project-meta">
                      <span className="task-count">{project.tasks?.length || 0} tasks</span>
                      <span className={`status-badge ${project.status === 'Completed' ? 'completed' : 'active'}`}>
                        {project.status || 'Active'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;