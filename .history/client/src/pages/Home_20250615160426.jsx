import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from './Dashboard';

const features = [
  {
    title: "Project Organization",
    desc: "Easily create, manage, and prioritize all your projects in one place.",
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
    desc: "Visualize your workflow, drag and drop tasks, and track progress with ease.",
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
    desc: "Assign tasks, comment in real time, and keep everyone in sync.",
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Welcome Message */}
      {user && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/50 py-3 text-center">
          <span className="text-blue-700 dark:text-blue-300 font-medium">
            Welcome back, {user.name}! 👋
          </span>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Boost Your
            <span className="block text-blue-600 dark:text-blue-400">Productivity</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Manage your tasks, projects, and teams effortlessly. Stay organized and get more done with our modern task management platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link 
              to="/register" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Get Started Free
            </Link>
            
            <Link 
              to="/login" 
              className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              Login
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">1000+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Tasks Managed Daily</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Uptime Guarantee</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">Real-time</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Team Collaboration</div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to manage your projects efficiently and collaboratively
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg inline-block group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <div className="bg-blue-600 text-white p-12 rounded-2xl shadow-2xl">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Transform Your Productivity?
              </h3>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of teams already using our platform
              </p>
              <Link 
                to="/register"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-200 shadow-lg"
              >
                Start Your Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12 px-4 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            © {new Date().getFullYear()} Task Manager. Built for teams and individuals who value productivity.
          </p>
          <div className="flex justify-center space-x-8">
            <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;