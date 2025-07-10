import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newProject, setNewProject] = useState('');

  useEffect(() => {
    if (user) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/projects`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => setProjects(res.data))
        .catch(() => setError('Failed to load projects'))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProject.trim()) return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/projects`,
        { title: newProject },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setProjects([...projects, res.data]);
      setNewProject('');
      setShowCreate(false);
    } catch {
      setError('Failed to create project');
    }
  };

  if (!user) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard.</h1>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-xl shadow max-w-3xl mx-auto mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Welcome, {user?.name}!</h1>
          <p className="text-gray-500 dark:text-gray-400">Here’s an overview of your projects.</p>
        </div>
        <button
          onClick={() => setShowCreate((v) => !v)}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          + Create Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{projects.length}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
        </div>
        <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-700 dark:text-green-300">
            {projects.reduce((acc, p) => acc + (p.tasks?.length || 0), 0)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Total Tasks</div>
        </div>
        <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
            {projects.filter((p) => p.status === 'Completed').length}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Completed Projects</div>
        </div>
      </div>

      {/* Create Project Form */}
      {showCreate && (
        <form onSubmit={handleCreateProject} className="mb-6 flex gap-2">
          <input
            type="text"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="Project name"
            className="flex-1 border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
            autoFocus
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Create
          </button>
        </form>
      )}

      {/* Projects List */}
      <h2 className="text-lg font-semibold mb-2">Your Projects</h2>
      {loading && <div>Loading projects...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <ul>
        {projects.length === 0 && !loading && <li>No projects found.</li>}
        {projects.map((p) => (
          <li key={p._id} className="border p-3 mb-2 rounded bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
            <span className="font-medium">{p.title}</span>
            <span className="text-xs text-gray-500">{(p.tasks && p.tasks.length) || 0} tasks</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;