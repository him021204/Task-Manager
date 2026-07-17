import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        setError(
          err.response?.data?.error || 'Failed to load user details.'
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true,
      });
    } catch {
      // Ignore errors, just clear localStorage and redirect
    }
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="profile-bg">
      <div className="profile-card">
        <button
          className="profile-close-btn"
          onClick={() => navigate('/dashboard')}
          aria-label="Back to Dashboard"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <div className="profile-header">
          <div className="profile-avatar-ring">
            <div className="profile-avatar">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 16-4 16 0" />
              </svg>
            </div>
          </div>
          <div className="profile-title">{user ? user.name : 'User Profile'}</div>
          {user && <div className="profile-email">{user.email}</div>}
        </div>
        {loading && <div className="profile-status">Loading...</div>}
        {error && <div className="profile-error">{error}</div>}
        {user && (
          <div className="profile-details">
            <div className="profile-details-row">
              <strong>Role:</strong> {user.role || 'User'}
            </div>
            <div className="profile-details-row">
              <strong>Joined:</strong>
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'N/A'}
            </div>
          </div>
        )}
        <button
          className="profile-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;