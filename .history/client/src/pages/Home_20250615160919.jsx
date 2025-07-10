import React from 'react';

const features = [
  {
    title: "Project Organization",
    desc: "Easily create, manage, and prioritize all your projects in one place with intelligent categorization.",
    icon: (
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
        <svg className="relative w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="6" rx="2" />
          <rect x="3" y="14" width="9" height="6" rx="2" />
          <rect x="15" y="14" width="6" height="6" rx="2" />
        </svg>
      </div>
    ),
  },
  {
    title: "Kanban Boards",
    desc: "Visualize your workflow with drag-and-drop simplicity. Track progress like never before.",
    icon: (
      <div className="relative">
        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
        <svg className="relative w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="5" width="4" height="14" rx="2" />
          <rect x="10" y="5" width="4" height="9" rx="2" />
          <rect x="17" y="5" width="4" height="4" rx="2" />
        </svg>
      </div>
    ),
  },
  {
    title: "Team Collaboration",
    desc: "Real-time updates, seamless communication, and synchronized teamwork across all devices.",
    icon: (
      <div className="relative">
        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl"></div>
        <svg className="relative w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="8" cy="8" r="3" />
          <circle cx="16" cy="8" r="3" />
          <path d="M2 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
          <path d="M17 20v-2a4 4 0 013-3.87" />
        </svg>
      </div>
    ),
  },
];

const Home = () => {
  // Mock user for demonstration
  const user = { name: "John Doe" };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Welcome Message */}
      {user && (
        <div className="relative z-10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 backdrop-blur-sm border-b border-white/20 py-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl animate-bounce">👋</span>
            <span className="text-slate-700 dark:text-slate-300 font-medium text-lg">
              Welcome back, <span className="text-blue-700 dark:text-blue-400 font-semibold">{user.name}</span>!
            </span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative z-10 pt-16 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {/* Main Heading with Gradient Text */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 dark:from-white dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent animate-pulse">
                  Boost Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Productivity
                </span>
              </h1>
            </div>

            {/* Subtitle with Better Typography */}
            <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Transform chaos into clarity. Manage tasks, projects, and teams with the most 
              <span className="font-semibold text-blue-700 dark:text-blue-400"> intuitive platform </span>
              designed for modern workflows.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
              <button 
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center space-x-2">
                  <span>Get Started Free</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
              </button>
              
              <button 
                className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-10 py-5 rounded-2xl font-bold text-xl hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Login</span>
                  <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Enhanced Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { number: "10K+", label: "Tasks Completed Daily", gradient: "from-blue-500 to-cyan-500", icon: "📋" },
              { number: "99.9%", label: "Uptime Guarantee", gradient: "from-green-500 to-emerald-500", icon: "⚡" },
              { number: "Real-time", label: "Team Collaboration", gradient: "from-purple-500 to-pink-500", icon: "👥" }
            ].map((stat, idx) => (
              <div key={idx} className="group relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/50 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl from-blue-500 to-purple-500"></div>
                <div className="relative text-center">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-3`}>
                    {stat.number}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 font-medium text-lg">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-800 to-blue-700 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to transform your workflow and achieve unprecedented productivity
            </p>
          </div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/50 hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 overflow-hidden"
              >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  {/* Enhanced Icon */}
                  <div className="mb-8 p-4 bg-gradient-to-br from-white/80 to-slate-100/80 dark:from-slate-700/80 dark:to-slate-600/80 rounded-2xl inline-block group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-24">
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-16 rounded-3xl shadow-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
              <div className="relative">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Transform Your Productivity?
                </h3>
                <p className="text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
                  Join thousands of teams who've revolutionized their workflow
                </p>
                <button 
                  className="group inline-block bg-white text-blue-600 px-12 py-6 rounded-2xl font-bold text-xl hover:bg-gray-100 transform hover:-translate-y-2 transition-all duration-300 shadow-2xl"
                >
                  <span className="flex items-center space-x-3">
                    <span>Start Your Free Trial</span>
                    <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl py-16 px-4 border-t border-white/20 dark:border-slate-700/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-600 dark:text-slate-400 text-xl mb-8">
            © {new Date().getFullYear()} Task Manager. Built for teams and individuals who value productivity.
          </p>
          <div className="flex justify-center space-x-12">
            {["Privacy Policy", "Terms of Service", "Contact Us"].map((link, idx) => (
              <a 
                key={idx}
                href="#" 
                className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-lg font-medium hover:underline"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;