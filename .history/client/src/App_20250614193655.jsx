import { SocketProvider } from './context/SocketContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <AuthProvider>
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/analytics" element={<Analytics />} />

        </Routes>
      </Router>
      <ToastContainer />
    </SocketProvider>
  </AuthProvider>
);
