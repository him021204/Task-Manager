import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (!user) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard.</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome {user?.name}</h1>
      <h2 className="text-lg font-semibold mb-2">Projects</h2>
      {loading && <div>Loading projects...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <ul>
        {projects.length === 0 && !loading && <li>No projects found.</li>}
        {projects.map((p) => (
          <li key={p._id} className="border p-2 mb-2 rounded bg-white dark:bg-gray-800">
            {p.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;