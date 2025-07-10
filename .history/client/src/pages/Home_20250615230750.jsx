import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const features = [
  {
    title: "Project Organization",
    desc: "Easily create, manage, and prioritize all your projects in one place with intelligent categorization.",
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="8" r="3" />
        <path d="M2 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <path d="M17 20v-2a4 4 0 013-3.87" />
      </svg>
    ),
  },
];
import { useEffect } from 'react';
// ...other imports...

const Login = () => {
  const navigate = useNavigate();
  // ...state...

  useEffect(() => {
    // If token exists, redirect to home
    if (localStorage.getItem('token')) {
      navigate('/home'); // or navigate('/') if your home route is "/"
    }
  }, [navigate]);

  // ...rest of your component...
};

const Home = () => {
  
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e0f2fe 50%, #e0e7ff 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Navigation Bar */}
      <nav
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.85)',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 0',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
          }}
        >
          <span style={{ fontWeight: 'bold', fontSize: '22px', color: '#2563eb' }}>
            Task Manager
          </span>
          <div style={{ display: 'flex', gap: '28px' }}>
            <Link to="/home" style={{ color: '#2563eb', fontWeight: 500, textDecoration: 'none' }}>
              Home
            </Link>
            <Link to="/dashboard" style={{ color: '#475569', fontWeight: 500, textDecoration: 'none' }}>
              Dashboard
            </Link>
            <Link to="/analytics" style={{ color: '#475569', fontWeight: 500, textDecoration: 'none' }}>
              Analytics
            </Link>
            <Link to="/calendar" style={{ color: '#475569', fontWeight: 500, textDecoration: 'none' }}>
              Calendar
            </Link>
            <Link to="/" style={{ color: '#475569', fontWeight: 500, textDecoration: 'none' }}>
              Login
            </Link>
          </div>
        </div>
      </nav>
      {/* Welcome Message */}
      { (
        <div style={{
          background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1), rgba(34, 197, 94, 0.1))',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '16px',
          textAlign: 'center'
        }}>
        </div>
      )}

      {/* Hero Section */}
      <header style={{ padding: '80px 20px', position: 'relative' }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-160px',
          right: '-160px',
          width: '320px',
          height: '320px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'pulse 4s infinite'
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '-160px',
          left: '-160px',
          width: '384px',
          height: '384px',
          background: 'linear-gradient(45deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2))',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'pulse 6s infinite'
        }}></div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            {/* Main Heading */}
            <div style={{ marginBottom: '32px' }}>
              <h1 style={{
                fontSize: 'clamp(48px, 8vw, 120px)',
                fontWeight: 'bold',
                lineHeight: '1.1',
                margin: '0',
                background: 'linear-gradient(135deg, #1e293b, #1d4ed8, #4338ca)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '16px'
              }}>
                Boost Your
              </h1>
              <h1 style={{
                fontSize: 'clamp(48px, 8vw, 120px)',
                fontWeight: 'bold',
                lineHeight: '1.1',
                margin: '0',
                background: 'linear-gradient(135deg, #2563eb, #7c3aed, #4f46e5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Productivity
              </h1>
            </div>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(18px, 3vw, 28px)',
              color: '#475569',
              marginBottom: '48px',
              maxWidth: '800px',
              margin: '0 auto 48px auto',
              lineHeight: '1.6',
              fontWeight: '300'
            }}>
              Transform chaos into clarity. Manage tasks, projects, and teams with the most 
              <span style={{ fontWeight: '600', color: '#1d4ed8' }}> intuitive platform </span>
              designed for modern workflows.
            </p>

            {/* CTA Buttons */}
            <div style={{
            display: 'flex',
            flexDirection: window.innerWidth < 640 ? 'column' : 'row',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '80px'
            }}>
            <Link
                to="/login"
                style={{
                background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                color: 'white',
                padding: '20px 40px',
                borderRadius: '16px',
                fontWeight: 'bold',
                fontSize: '20px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none'
                }}
                onMouseEnter={e => {
                e.target.style.transform = 'translateY(-8px)';
                e.target.style.boxShadow = '0 25px 50px rgba(37, 99, 235, 0.4)';
                }}
                onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.3)';
                }}
            >
                <span>Get Started Free</span>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </Link>
              
            </div>
          </div>

          {/* Stats Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              { number: "10K+", label: "Tasks Completed Daily", icon: "📋" },
              { number: "99.9%", label: "Uptime Guarantee", icon: "⚡" },
              { number: "Real-time", label: "Team Collaboration", icon: "👥" }
            ].map((stat, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(20px)',
                padding: '32px',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
                transition: 'all 0.5s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-12px)';
                e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>{stat.icon}</div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  background: idx === 0 ? 'linear-gradient(135deg, #2563eb, #06b6d4)' : 
                             idx === 1 ? 'linear-gradient(135deg, #10b981, #34d399)' : 
                             'linear-gradient(135deg, #8b5cf6, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '12px'
                }}>
                  {stat.number}
                </div>
                <div style={{ color: '#64748b', fontWeight: '500', fontSize: '18px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section style={{ padding: '96px 20px', background: 'rgba(248, 250, 252, 0.5)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 'bold',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #1e293b, #1d4ed8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Powerful Features
            </h2>
            <p style={{
              fontSize: '24px',
              color: '#475569',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Everything you need to transform your workflow and achieve unprecedented productivity
            </p>
          </div>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '48px',
            marginBottom: '96px'
          }}>
            {features.map((feature, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(20px)',
                padding: '40px',
                borderRadius: '24px',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.5s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-16px)';
                e.target.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.1)';
              }}>
                {/* Icon */}
                <div style={{
                  marginBottom: '32px',
                  padding: '16px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.8))',
                  borderRadius: '16px',
                  display: 'inline-block',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                }}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  marginBottom: '24px'
                }}>
                  {feature.title}
                </h3>
                
                <p style={{
                  color: '#475569',
                  lineHeight: '1.6',
                  fontSize: '18px'
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg, #2563eb, #7c3aed, #4f46e5)',
              padding: '64px',
              borderRadius: '24px',
              boxShadow: '0 40px 80px rgba(37, 99, 235, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                inset: '0',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))',
                animation: 'pulse 3s infinite'
              }}></div>
              <div style={{ position: 'relative' }}>
                <h3 style={{
                  fontSize: 'clamp(32px, 5vw, 56px)',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '24px'
                }}>
                  Ready to Transform Your Productivity?
                </h3>
                <p style={{
                  fontSize: '24px',
                  marginBottom: '40px',
                  color: 'rgba(219, 234, 254, 1)',
                  maxWidth: '600px',
                  margin: '0 auto 40px auto'
                }}>
                  Join thousands of teams who've revolutionized their workflow
                </p>
                <button style={{
                  background: 'white',
                  color: '#2563eb',
                  padding: '24px 48px',
                  borderRadius: '16px',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-8px)';
                  e.target.style.background = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.background = 'white';
                }}>
                  <span>Start Your Free Trial</span>
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(20px)',
        padding: '64px 20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            color: '#64748b',
            fontSize: '20px',
            marginBottom: '32px'
          }}>
            © {new Date().getFullYear()} Task Manager. Built for teams and individuals who value productivity.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            flexWrap: 'wrap'
          }}>
            {["Privacy Policy", "Terms of Service", "Contact Us"].map((link, idx) => (
              <a 
                key={idx}
                href="#" 
                style={{
                  color: '#64748b',
                  fontSize: '18px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                onMouseLeave={(e) => e.target.style.color = '#64748b'}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Add keyframes animation via style tag */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;