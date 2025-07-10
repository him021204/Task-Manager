import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Home.css';

const features = [
  {
    title: "Project Organization",
    desc: "Easily create, manage, and prioritize all your projects in one place with intelligent categorization.",
    icon: (
      <svg className="feature-icon blue-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="6" rx="2" />
        <rect x="3" y="14" width="9" height="6" rx="2" />
        <rect x="15" y="14" width="6" height="6" rx="2" />
      </svg>
    ),
  },
  {
    title: "Kanban Boards",
    desc: "Visualize your workflow with drag-and-drop simplicity. Track progress like never before.",
    icon: (
      <svg className="feature-icon green-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="5" width="4" height="14" rx="2" />
        <rect x="10" y="5" width="4" height="9" rx="2" />
        <rect x="17" y="5" width="4" height="4" rx="2" />
      </svg>
    ),
  },
  {
    title: "Team Collaboration",
    desc: "Real-time updates, seamless communication, and synchronized teamwork across all devices.",
    icon: (
      <svg className="feature-icon purple-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="8" r="3" />
        <path d="M2 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <path d="M17 20v-2a4 4 0 013-3.87" />
      </svg>
    ),
  },
];

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If token exists, redirect to home
    if (localStorage.getItem('token')) {
      navigate('/home'); // or navigate('/') if your home route is "/"
    }
  }, [navigate]);

  // ...rest of your component...
};

const Home = () => {
  const handleGetStartedHover = (e) => {
    e.target.style.transform = 'translateY(-8px)';
    e.target.style.boxShadow = '0 25px 50px rgba(37, 99, 235, 0.4)';
  };

  const handleGetStartedLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.3)';
  };

  const handleStatHover = (e) => {
    e.target.style.transform = 'translateY(-12px)';
    e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.15)';
  };

  const handleStatLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
  };

  const handleFeatureHover = (e) => {
    e.target.style.transform = 'translateY(-16px)';
    e.target.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.15)';
  };

  const handleFeatureLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.1)';
  };

  const handleTrialButtonHover = (e) => {
    e.target.style.transform = 'translateY(-8px)';
    e.target.style.background = '#f8fafc';
  };

  const handleTrialButtonLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.background = 'white';
  };

  const handleFooterLinkHover = (e) => {
    e.target.style.color = '#2563eb';
  };

  const handleFooterLinkLeave = (e) => {
    e.target.style.color = '#64748b';
  };

  return (
    <>
    {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <span className="logo">Task Manager</span>
          <div className="nav-links">
            <Link to="/home" className="nav-link active">Home</Link>
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
      <div className="home-container">

      {/* Welcome Message */}
      <div className="welcome-banner">
      </div>

      {/* Hero Section */}
      <header className="hero-section">
        {/* Background Elements */}
        <div className="bg-element bg-element-1"></div>
        <div className="bg-element bg-element-2"></div>

        <div className="hero-content">
          <div className="hero-text">
            {/* Main Heading */}
            <div className="main-heading">
              <h1 className="heading-line-1">Boost Your Productivity</h1>
            </div>

            {/* Subtitle */}
            <p className="subtitle">
              Transform chaos into clarity. Manage tasks, projects, and teams with the most 
              <span className="highlight"> intuitive platform </span>
              designed for modern workflows.
            </p>

            {/* CTA Buttons */}
            <div className="cta-container">
              <Link
                to="/dashboard"
                className="cta-button"
                onMouseEnter={handleGetStartedHover}
                onMouseLeave={handleGetStartedLeave}
              >
                <span>Get Started Free</span>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-grid">
            {[
              { number: "10K+", label: "Tasks Completed Daily", icon: "📋", gradient: "gradient-blue" },
              { number: "99.9%", label: "Uptime Guarantee", icon: "⚡", gradient: "gradient-green" },
              { number: "Real-time", label: "Team Collaboration", icon: "👥", gradient: "gradient-purple" }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="stat-card"
                onMouseEnter={handleStatHover}
                onMouseLeave={handleStatLeave}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className={`stat-number ${stat.gradient}`}>
                  {stat.number}
                </div>
                <div className="stat-label">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          {/* Section Header */}
          <div className="section-header">
            <h2 className="features-title">Powerful Features</h2>
            <p className="features-subtitle">
              Everything you need to transform your workflow and achieve unprecedented productivity
            </p>
          </div>

          {/* Features Grid */}
          <div className="features-grid">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="feature-card"
                onMouseEnter={handleFeatureHover}
                onMouseLeave={handleFeatureLeave}
              >
                {/* Icon */}
                <div className="feature-icon-container">
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="bottom-cta">
            <div className="cta-card">
              <div className="cta-overlay"></div>
              <div className="cta-content">
                <h3 className="cta-title">
                  Ready to Transform Your Productivity?
                </h3>
                <p className="cta-subtitle">
                  Join thousands of teams who've revolutionized their workflow
                </p>
                <Link
                  to="/dashboard"
                  className="trial-button"
                  onMouseEnter={handleTrialButtonHover}
                  onMouseLeave={handleTrialButtonLeave}
                >
                  <span>Start Your Free Trial</span>
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            © {new Date().getFullYear()} Task Manager. Built for teams and individuals who value productivity.
          </p>
          <div className="footer-links">
            {["Privacy Policy", "Terms of Service", "Contact Us"].map((link, idx) => (
              <a 
                key={idx}
                href="#" 
                className="footer-link"
                onMouseEnter={handleFooterLinkHover}
                onMouseLeave={handleFooterLinkLeave}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Home;