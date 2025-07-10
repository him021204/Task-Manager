import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Analytics.css';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF6384'];

const Analytics = () => {
  const [data, setData] = useState({ completed: 0, total: 0, byPriority: [] });

  useEffect(() => {
    axios.get('http://localhost:5000/api/analytics/tasks', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setData(res.data));
  }, []);

  const completionRate = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
const [dashboardStats, setDashboardStats] = useState({ totalProjects: 0, totalTasks: 0 });

useEffect(() => {
  axios.get('http://localhost:5000/api/analytics/tasks', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }).then(res => setData(res.data));

  // Fetch dashboard stats
  axios.get('http://localhost:5000/api/analytics/dashboard', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }).then(res => setDashboardStats(res.data));
}, []);
  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <span className="logo">Task Manager</span>
          <div className="nav-links">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/analytics" className="nav-link active">Analytics</Link>
            <Link to="/calendar" className="nav-link">Calendar</Link>
            <Link to="/" className="nav-link">Login</Link>
          </div>
        </div>
      </nav>
      <div className="analytics-bg">
        <div className="analytics-container">
          <h1 className="analytics-title">Task Analytics</h1>
          <div className="analytics-stats">
            <div className="analytics-stat-card">
              <div className="analytics-stat-label">Total Tasks</div>
              <div className="analytics-stat-value">{data.total}</div>
            </div>
            <div className="analytics-stat-card">
              <div className="analytics-stat-label">Completed</div>
              <div className="analytics-stat-value">{data.completed}</div>
            </div>
            <div className="analytics-stat-card">
              <div className="analytics-stat-label">Completion Rate</div>
              <div className="analytics-stat-value">{completionRate}%</div>
            </div>
          </div>
          <div className="analytics-charts">
            <div className="analytics-chart-card">
              <h3 className="analytics-chart-title">Completion Rate</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Done', value: data.completed },
                      { name: 'Remaining', value: Math.max(0, data.total - data.completed) }
                    ]}
                    dataKey="value"
                    outerRadius={80}
                    label
                  >
                    <Cell fill="#00C49F" />
                    <Cell fill="#FF8042" />
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="analytics-chart-card">
              <h3 className="analytics-chart-title">Priority Distribution</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.byPriority}>
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;