import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <div className="nav-content">
      <span className="logo">Task Manager</span>
      <div className="nav-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/analytics" className="nav-link">Analytics</Link>
        <Link to="/kanban" className="nav-link">Kanban</Link>
        <Link to="/calendar" className="nav-link">Calendar</Link>
        <div className="nav-profile">
          <Link to="/profile" style={{ display: 'flex', alignItems: 'center' }}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ background: "#f1f5f9", borderRadius: "50%", padding: 8, boxShadow: "0 2px 8px #e0e7ff" }}
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 16-4 16 0" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;