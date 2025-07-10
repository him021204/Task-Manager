import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarView = () => (
  <div style={{ padding: 40 }}>
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
      style={{ height: 600 }}
    />
  </div>
);

export default CalendarView;