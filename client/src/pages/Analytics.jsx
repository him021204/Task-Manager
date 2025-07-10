import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Analytics.css';
import Navbar from './Navbar';

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
const PRIORITY_LABELS = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  1: 'High',
  2: 'Medium',
  3: 'Low'
};


const [projectTaskSummary, setProjectTaskSummary] = useState([]);

useEffect(() => {
  axios.get('http://localhost:5000/api/analytics/project-task-summary', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }).then(res => setProjectTaskSummary(res.data));
}, []);
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
      <Navbar />
      <div className="analytics-bg">
        <div className="analytics-container">
          <h1 className="analytics-title">Task Analytics</h1>
          <div className="analytics-stats">
            <div className="analytics-stat-card">
              <div className="analytics-stat-label">Total Projects</div>
              <div className="analytics-stat-value">{dashboardStats.totalProjects}</div>
            </div>
            <div className="analytics-stat-card">
              <div className="analytics-stat-label">Total Tasks</div>
              <div className="analytics-stat-value">{dashboardStats.totalTasks}</div>
            </div>
            <div className="analytics-stat-card">
              <div className="analytics-stat-label">Completed Tasks</div>
              <div className="analytics-stat-value">{data.completed}</div>
            </div>
            <div className="analytics-stat-card">
              <div className="analytics-stat-label">Completion Rate</div>
              <div className="analytics-stat-value">{completionRate}%</div>
            </div>
          </div>
          <div className="analytics-charts">
            <div className="analytics-chart-card">
              <h3 className="analytics-chart-title">Projects vs Tasks</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Projects', value: dashboardStats.totalProjects },
                      { name: 'Tasks', value: dashboardStats.totalTasks }
                    ]}
                    dataKey="value"
                    outerRadius={80}
                    label
                  >
                    <Cell fill="#2563eb" />
                    <Cell fill="#10b981" />
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="analytics-chart-card">
              <h3 className="analytics-chart-title">Tasks per Project</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={projectTaskSummary}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="project" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" stackId="a" fill="#2563eb" name="Total Tasks" />
                  <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
                  <Bar dataKey="remaining" stackId="a" fill="#f59e42" name="Remaining" />
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