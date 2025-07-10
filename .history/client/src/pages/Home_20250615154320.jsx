import { Link } from 'react-router-dom';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10 flex flex-col items-center max-w-md w-full">
      <h1 className="text-5xl font-extrabold mb-4 text-blue-600 dark:text-blue-300">Task Manager</h1>
      <p className="mb-6 text-lg text-gray-700 dark:text-gray-300 text-center">
        Organize your projects, manage your tasks, and boost your productivity.<br />
        Start now and take control of your workflow!
      </p>
      <div className="flex gap-4 mb-4">
        <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition">
          Login
        </Link>
        <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition">
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