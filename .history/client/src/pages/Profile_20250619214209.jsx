import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setUser(res.data))
      .catch(() => setError('Failed to load user details.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="profile-bg">
      <div className="profile-card">
        <div className="profile-avatar">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 16-4 16 0" />
          </svg>
        </div>
        <h2 className="profile-title">Profile</h2>
        {loading && <div className="profile-status">Loading...</div>}
        {error && <div className="profile-error">{error}</div>}
        {user && (
          <div className="profile-details">
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</div>
            {/* Add more fields if available */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;