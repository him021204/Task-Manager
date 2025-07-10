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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError('');
    Promise.all([
      axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }),
    ])
      .then(([tasksRes]) => {
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

  // Custom toolbar is removed, so we need navigation
  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  const handleDateClick = (slotInfo) => {
    const clickedDate = moment(slotInfo.start).startOf('day');
    // Find tasks created or due on this date
    const tasksOnDate = events.filter(ev => {
      const eventDate = moment(ev.start).startOf('day');
      return eventDate.isSame(clickedDate, 'day');
    });
    setSelectedDate(clickedDate);
    setTasksForSelectedDate(tasksOnDate);
  };

  // Today's date, current month, and year
  const today = moment().format('DD MMMM YYYY');
  const currentMonth = moment(currentDate).format('MMMM');
  const currentYear = moment(currentDate).format('YYYY');

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
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
            flexWrap: 'wrap'
          }}>
            <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#2563eb' }}>
              Today: {today}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={handlePrevMonth}
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '6px 16px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                aria-label="Previous Month"
              >
                &lt;
              </button>
              <span style={{ fontWeight: 700, fontSize: '1.15rem', color: '#1e293b' }}>
                {currentMonth} {currentYear}
              </span>
              <button
                onClick={handleNextMonth}
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '6px 16px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                aria-label="Next Month"
              >
                &gt;
              </button>
            </div>
          </div>
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
              onSelectSlot={handleDateClick}
              selectable
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              date={currentDate}
              onNavigate={date => setCurrentDate(date)}
              toolbar={false} // Hide default toolbar
              views={['month']} // Only month view
            />
          )}
          {selectedDate && (
            <div
              style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(30,41,59,0.35)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => setSelectedDate(null)}
            >
              <div
                style={{
                  background: '#fff',
                  borderRadius: '1rem',
                  boxShadow: '0 8px 40px rgba(37, 99, 235, 0.18)',
                  padding: '2rem 2.5rem 1.5rem 2.5rem',
                  minWidth: 320,
                  maxWidth: '95vw',
                  position: 'relative'
                }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 20,
                    background: 'none',
                    border: 'none',
                    fontSize: 24,
                    color: '#64748b',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedDate(null)}
                  aria-label="Close"
                >×</button>
                <h2 style={{ marginTop: 0, marginBottom: 12, color: '#2563eb' }}>
                  {selectedDate.format('DD MMMM YYYY')}
                </h2>
                {tasksForSelectedDate.length === 0 ? (
                  <div style={{ minHeight: 80, background: '#fff' }}></div>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {tasksForSelectedDate.map((ev, idx) => (
                      <li key={idx} style={{ marginBottom: 10, fontSize: '1.08rem', color: '#1e293b' }}>
                        {ev.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CalendarView;