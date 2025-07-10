import { useState } from 'react';
import { SocketProvider } from './context/SocketContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [dark, setDark] = useState(false);
  return (
    <div className={dark ? 'dark' : ''}>
      <button onClick={() => setDark(!dark)} className="fixed top-2 right-2 z-50">
        {dark ? '🌞' : '🌙'}
      </button>
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/calendar" element={<CalendarView />} />
          </Routes>
        </Router>
        <ToastContainer />
      </SocketProvider>
    </AuthProvider>
  </div>
);
};

const exportTasks = () => {
  axios.get('http://localhost:5000/api/tasks', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }).then(res => {
    const blob = new Blob([JSON.stringify(res.data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks_export.json';
    a.click();
  });
};

export default App;
