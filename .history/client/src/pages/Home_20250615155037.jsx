import { Link } from 'react-router-dom';
import './Home.css';

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

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
    {/* Hero Section */}
    <header className="w-full px-4 py-16 flex flex-col items-center">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-700 dark:text-blue-300 drop-shadow">Boost Your Productivity</h1>
        <p className="mb-8 text-lg text-gray-700 dark:text-gray-200">
          Manage your tasks, projects, and teams effortlessly. Stay organized and get more done with Task Manager.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow transition">
            Get Started Free
          </Link>
          <Link to="/login" className="bg-white dark:bg-gray-700 border border-blue-600 dark:border-blue-400 text-blue-700 dark:text-blue-300 px-8 py-3 rounded-lg font-semibold shadow transition hover:bg-blue-50 dark:hover:bg-gray-800">
            Login
          </Link>
        </div>
        <div className="flex justify-center gap-8 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">1000+</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Tasks Managed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-300">99.9%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">Real-time</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Collaboration</div>
          </div>
        </div>
      </div>
    </header>

    {/* Features Section */}
    <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
            <div key={idx} className="home-card p-6 flex flex-col items-center text-center">
                <div className="mb-4 feature-icon">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
      </div>
    ))}
  </div>
</section>

    {/* Footer */}
    <footer className="w-full py-6 text-center text-xs text-gray-400 dark:text-gray-500">
      © {new Date().getFullYear()} Task Manager. Built for teams and individuals.
    </footer>
  </div>
);

export default Home;