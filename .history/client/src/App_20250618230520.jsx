import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Analytics from './pages/Analytics';
import CalendarView from './pages/CalendarView';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const App = () => {
  // You can also remove the dark state if not needed
  // const [dark, setDark] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <AuthProvider>
        <SocketProvider>
          <Router>
            <main className="pt-12 px-2 max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/calendar" element={<CalendarView />} />
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