import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:5000/api/projects', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(res => setProjects(res.data));
    }
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome {user?.name}</h1>
      <h2 className="text-lg font-semibold">Projects</h2>
      <ul>
        {projects.map(p => (
          <li key={p._id} className="border p-2 mb-2">{p.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
