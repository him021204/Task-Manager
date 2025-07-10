import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Link } from 'react-router-dom';
import './CalendarView.css';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ...existing imports...

  useEffect(() => {
    setLoading(true);
    setError('');
    Promise.all([
      axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }),
    ])
      .then(([tasksRes]) => {
        // Only include tasks that are NOT completed
        const incompleteTasks = tasksRes.data.filter(
          (task) => task.status !== 'Completed'
        );
        const events = [];
        incompleteTasks.forEach((task) => {
          // Task Created event
          if (task.createdAt) {
            const createdDate = new Date(task.createdAt);
            if (!isNaN(createdDate)) {
              events.push({
                title: `Created: ${task.title}`,
                start: createdDate,
                end: createdDate,
                allDay: true,
                type: 'task-created',
              });
            }
          }
          // Task Due event
          if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            if (!isNaN(dueDate)) {
              events.push({
                title: `Due: ${task.title}`,
                start: dueDate,
                end: dueDate,
                allDay: true,
                type: 'task-due',
              });
            }
          }
        });
        setEvents(events);
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
              events={events.length ? events : [{
                title: 'Test Event',
                start: new Date(),
                end: new Date(),
                allDay: true,
              }]}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CalendarView;