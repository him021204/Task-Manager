import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Analytics from './pages/Analytics';
import CalendarView from './pages/CalendarView';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Dark mode toggle as a separate component
const DarkModeToggle = ({ dark, setDark }) => (
  <button
    onClick={() => setDark(!dark)}
    className="fixed top-2 right-2 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    aria-label="Toggle dark mode"
    title="Toggle dark mode"
  >
    {dark ? '🌞' : '🌙'}
  </button>
);

const App = () => {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? 'dark min-h-screen bg-gray-900 text-white' : 'min-h-screen bg-gray-100 text-black'}>
      <AuthProvider>
        <SocketProvider>
          <Router>
            <DarkModeToggle dark={dark} setDark={setDark} />
            <main className="pt-12 px-2 max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/calendar" element={<CalendarView />} />
                {/* Add more routes here as needed */}
              </Routes>
            </main>
          </Router>
          <ToastContainer position="top-right" autoClose={3000} />
        </SocketProvider>
      </AuthProvider>
    </div>
  );
};

export default App;