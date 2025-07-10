import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Link } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarView.css';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  setLoading(true);
  setError('');
  // Fetch tasks and projects in parallel
  Promise.all([
    axios.get('http://localhost:5000/api/tasks', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }),
    axios.get('http://localhost:5000/api/projects', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }),
  ])
    .then(([tasksRes, projectsRes]) => {
      // Task due dates
      const taskEvents = tasksRes.data
        .filter((task) => task.dueDate)
        .map((task) => ({
          title: `Task: ${task.title}`,
          start: new Date(task.dueDate),
          end: new Date(task.dueDate),
          allDay: true,
          type: 'task',
        }));

      // Project creation dates
      const projectEvents = projectsRes.data
        .filter((project) => project.createdAt)
        .map((project) => ({
          title: `Project Created: ${project.title}`,
          start: new Date(project.createdAt),
          end: new Date(project.createdAt),
          allDay: true,
          type: 'project',
        }));

      setEvents([...taskEvents, ...projectEvents]);
    })
    .catch(() => setError('Failed to load calendar events.'))
    .finally(() => setLoading(false));
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
            <Link to="/analytics" className="nav-link">Analytics</Link>
            <Link to="/calendar" className="nav-link active">Calendar</Link>
            <Link to="/" className="nav-link">Login</Link>
          </div>
        </div>
      </nav>
      <div className="calendar-bg">
        <div className="calendar-container">
          <h2 className="calendar-title">Due Dates Calendar</h2>
          {loading && <div className="calendar-status">Loading...</div>}
          {error && <div className="calendar-error">{error}</div>}
          {!loading && !error && (
            <Calendar
              localizer={localizer}
              events={[
                {
                  title: 'Test Event',
                  start: new Date(),
                  end: new Date(),
                  allDay: true,
                },
              ]}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600, background: 'white', borderRadius: '1rem', padding: '1rem' }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CalendarView;