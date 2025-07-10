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

export default App;
