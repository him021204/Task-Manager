import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
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
    axios
      .get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => {
        const formatted = res.data
          .filter((task) => task.dueDate)
          .map((task) => ({
            title: task.title,
            start: new Date(task.dueDate),
            end: new Date(task.dueDate),
          }));
        setEvents(formatted);
      })
      .catch(() => setError('Failed to load calendar events.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="calendar-bg">
      <div className="calendar-container">
        <h2 className="calendar-title">Due Dates Calendar</h2>
        {loading && <div className="calendar-status">Loading...</div>}
        {error && <div className="calendar-error">{error}</div>}
        {!loading && !error && (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, background: 'white', borderRadius: '1rem', padding: '1rem' }}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarView;