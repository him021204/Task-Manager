import { Link } from 'react-router-dom';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-green-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
    <div className="bg-white/80 dark:bg-gray-800/80 shadow-2xl backdrop-blur-md rounded-2xl p-12 flex flex-col items-center max-w-lg w-full border border-gray-200 dark:border-gray-700">
      <div className="mb-6 flex items-center justify-center">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 shadow">
          <svg className="w-10 h-10 text-blue-500 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        </span>
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-blue-600 dark:text-blue-300 text-center drop-shadow">Task Manager</h1>
      <p className="mb-8 text-lg text-gray-700 dark:text-gray-300 text-center">
        Organize your projects, manage your tasks, and boost your productivity.<br />
        <span className="text-blue-500 dark:text-blue-300 font-semibold">Start now and take control of your workflow!</span>
      </p>
      <div className="flex gap-4 mb-6">
        <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow transition">
          Login
        </Link>
        <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow transition">
          Register
        </Link>
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-500 mt-2">
        © {new Date().getFullYear()} Task Manager. All rights reserved.
      </span>
    </div>
  </div>
);

export default Home;