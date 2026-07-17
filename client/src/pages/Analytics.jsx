import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Analytics.css';
import Navbar from './Navbar';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF6384'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const isProjectChart = payload.some(p => p.dataKey === 'completed' || p.dataKey === 'remaining');
    const total = isProjectChart ? payload.reduce((sum, entry) => sum + Number(entry.value), 0) : null;

    return (
      <div className="custom-tooltip">
        <p className="tooltip-label" style={{ fontWeight: 'bold', marginBottom: '8px' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="tooltip-value" style={{ color: entry.color, margin: '4px 0' }}>
            {entry.name}: {entry.value}
          </p>
        ))}
        {total !== null && (
          <p className="tooltip-value" style={{ color: '#3b82f6', margin: '4px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '4px', marginTop: '6px' }}>
            Total Tasks: {total}
          </p>
        )}
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const [data, setData] = useState({ completed: 0, total: 0, byPriority: [] });
  const [dashboardStats, setDashboardStats] = useState({ totalProjects: 0, totalTasks: 0 });
  const [projectTaskSummary, setProjectTaskSummary] = useState([]);

  useEffect(() => {
    // Fetch task stats
    axios.get('http://localhost:5000/api/analytics/tasks', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setData(res.data));

    // Fetch dashboard stats
    axios.get('http://localhost:5000/api/analytics/dashboard', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setDashboardStats(res.data));

    // Fetch project-task summary
    axios.get('http://localhost:5000/api/analytics/project-task-summary', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setProjectTaskSummary(res.data));
  }, []);

  const completionRate = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;

  const PRIORITY_LABELS = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    1: 'High',
    2: 'Medium',
    3: 'Low'
  };
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
              <h3 className="analytics-chart-title">Task Completion Breakdown</h3>
              <div className="analytics-chart-container" style={{ width: '100%' }}>
                {data.total > 0 ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Completed Tasks', value: data.completed },
                          { name: 'Remaining Tasks', value: data.total - data.completed }
                        ]}
                        dataKey="value"
                        outerRadius={80}
                        label
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#f59e42" />
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="no-data">
                    <div className="no-data-icon" style={{ fontSize: '48px', marginBottom: '8px', opacity: 0.7 }}>📊</div>
                    <div className="no-data-text" style={{ fontWeight: '600', color: '#cbd5e1' }}>No Tasks Available</div>
                    <div className="no-data-subtext" style={{ fontSize: '13px', color: '#94a3b8' }}>Create tasks to see status analytics.</div>
                  </div>
                )}
              </div>
            </div>
            <div className="analytics-chart-card">
              <h3 className="analytics-chart-title">Tasks per Project</h3>
              <div className="analytics-chart-container" style={{ width: '100%', height: '300px' }}>
                {projectTaskSummary && projectTaskSummary.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={projectTaskSummary}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <XAxis dataKey="project" stroke="#cbd5e1" />
                      <YAxis allowDecimals={false} stroke="#cbd5e1" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
                      <Bar dataKey="remaining" stackId="a" fill="#f59e42" name="Remaining" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="no-data">
                    <div className="no-data-icon" style={{ fontSize: '48px', marginBottom: '8px', opacity: 0.7 }}>📁</div>
                    <div className="no-data-text" style={{ fontWeight: '600', color: '#cbd5e1' }}>No Projects Available</div>
                    <div className="no-data-subtext" style={{ fontSize: '13px', color: '#94a3b8' }}>Add tasks inside projects to see the breakdown.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;