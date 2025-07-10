import { Link } from 'react-router-dom';

const features = [
  {
    title: "Organize Projects",
    desc: "Group your tasks by project and keep everything in one place.",
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    ),
  },
  {
    title: "Track Progress",
    desc: "Visualize your workflow with Kanban boards and analytics.",
    icon: (
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Collaborate",
    desc: "Invite team members and comment on tasks in real time.",
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
    {/* Hero Section */}
    <header className="w-full px-4 py-8 flex flex-col items-center">
      <div className="max-w-3xl w-full text-center">
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 shadow-lg">
            <svg className="w-12 h-12 text-blue-500 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          </span>
        </div>
        <h1 className="text-5xl font-extrabold mb-4 text-blue-700 dark:text-blue-300 drop-shadow">Task Manager</h1>
        <p className="mb-8 text-xl text-gray-700 dark:text-gray-200">
          The modern way to organize your projects, manage your tasks, and collaborate with your team.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow transition">
            Get Started Free
          </Link>
          <Link to="/login" className="bg-white dark:bg-gray-700 border border-blue-600 dark:border-blue-400 text-blue-700 dark:text-blue-300 px-8 py-3 rounded-lg font-semibold shadow transition hover:bg-blue-50 dark:hover:bg-gray-800">
            Login
          </Link>
        </div>
      </div>
    </header>

    {/* Features Section */}
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Why Choose Task Manager?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Footer */}
    <footer className="w-full py-6 text-center text-xs text-gray-400 dark:text-gray-500">
      © {new Date().getFullYear()} Task Manager. All rights reserved.
    </footer>
  </div>
);

export default Home;