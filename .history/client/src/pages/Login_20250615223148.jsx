import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Handle input changes
  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Frontend validation
  let newErrors = {};
  if (!form.email) newErrors.email = 'Email is required';
  if (!form.password) newErrors.password = 'Password is required';
  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  try {
    setIsLoading(true);
    setServerError('');
    const res = await axios.post('http://localhost:5000/api/auth/login', form);
    localStorage.setItem('token', res.data.token);
    navigate('/'); // Redirect to home page after login
  } catch {
    setServerError('Invalid email or password');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="login-bg">
      <div className="login-container">
        <h2 className="login-title">Sign in to your account</h2>

        {serverError && (
          <div className="login-alert">{serverError}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="login-label">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`login-input${errors.email ? ' error' : ''}`}
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={isLoading}
            />
            {errors.email && (
              <div className="login-error">{errors.email}</div>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={`login-input${errors.password ? ' error' : ''}`}
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              disabled={isLoading}
            />
            {errors.password && (
              <div className="login-error">{errors.password}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="login-btn"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        {/* Additional Links */}
        <div className="login-links">
          <button className="login-link-btn" type="button">
            Forgot your password?
          </button>
          <button
            className="login-link-btn"
            type="button"
            onClick={() => navigate('/register')}
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;