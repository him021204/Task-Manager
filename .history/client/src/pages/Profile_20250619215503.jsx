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
    } catch (err) {
      // Ignore errors, just clear localStorage and redirect
    }
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="profile-bg">
      <div className="profile-card">
        <div className="profile-avatar">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 16-4 16 0" />
          </svg>
        </div>
        <h2 className="profile-title">User Profile</h2>
        {loading && <div className="profile-status">Loading...</div>}
        {error && <div className="profile-error">{error}</div>}
        {user && (
          <div className="profile-details">
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            {user.role && <div><strong>Role:</strong> {user.role}</div>}
            <div>
              <strong>Joined:</strong>{' '}
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
          style={{
            marginTop: '2rem',
            padding: '0.7rem 2.2rem',
            background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.13rem',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'background 0.2s, box-shadow 0.2s',
            boxShadow: '0 2px 12px rgba(37, 99, 235, 0.10)',
            letterSpacing: '0.1px',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;