import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from './Dashboard';

const features = [
  {
    title: "Project Organization",
    desc: "Easily create, manage, and prioritize all your projects in one place.",
    icon: (
      <svg className="w-8 h-8 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="6" rx="2" />
        <rect x="3" y="14" width="9" height="6" rx="2" />
        <rect x="15" y="14" width="6" height="6" rx="2" />
      </svg>
    ),
  },
  {
    title: "Kanban Boards",
    desc: "Visualize your workflow, drag and drop tasks, and track progress with ease.",
    icon: (
      <svg className="w-8 h-8 text-green-500 group-hover:text-green-600 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="5" width="4" height="14" rx="2" />
        <rect x="10" y="5" width="4" height="9" rx="2" />
        <rect x="17" y="5" width="4" height="4" rx="2" />
      </svg>
    ),
  },
  {
    title: "Team Collaboration",
    desc: "Assign tasks, comment in real time, and keep everyone in sync.",
    icon: (
      <svg className="w-8 h-8 text-purple-500 group-hover:text-purple-600 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="8" r="3" />
        <path d="M2 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <path d="M17 20v-2a4 4 0 013-3.87" />
      </svg>
    ),
  },
];

const Home = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-all duration-500">
      {/* Welcome Message */}
      {user && (
        <div className="fixed top-4 right-4 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 dark:border-gray-700/50 shadow-lg">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Welcome, {user.name}! 👋
          </span>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative w-full px-4 py-20 flex flex-col items-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-2xl animate-bounce delay-500"></div>
        </div>

        <div className="relative max-w-4xl w-full text-center z-10">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 bg-clip-text text-transparent animate-pulse">
            Boost Your
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent">
              Productivity
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-10 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Manage your tasks, projects, and teams effortlessly. Stay organized and get more done with our 
            <span className="font-semibold text-blue-600 dark:text-blue-400"> modern task management</span> platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link 
              to="/register" 
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
            </Link>
            
            <Link 
              to="/login" 
              className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-600 transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="group-hover:text-blue-800 dark:group-hover:text-blue-200 transition-colors duration-300">
                Login
              </span>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-2xl border border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                1000+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Tasks Managed Daily
              </div>
            </div>
            
            <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-2xl border border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-black text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Uptime Guarantee
              </div>
            </div>
            
            <div className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-2xl border border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-black text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                Real-time
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Team Collaboration
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="relative max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Powerful 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Features</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage your projects efficiently and collaboratively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-8 rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon Container */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-white/80 dark:bg-gray-700/80 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
            </div>
          ))}
        </div>

        {/* Additional CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-3xl text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Productivity?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of teams already using our platform
            </p>
            <Link 
              to="/register"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative w-full py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-white/20 dark:border-gray-700/50">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              © {new Date().getFullYear()} Task Manager. 
              <span className="font-semibold"> Built for teams and individuals</span> who value productivity.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <span className="text-sm text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-300">
                Privacy Policy
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-300">
                Terms of Service
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-300">
                Contact Us
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;