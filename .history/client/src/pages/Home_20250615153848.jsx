import { Link } from 'react-router-dom';

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <h1 className="text-4xl font-bold mb-4">Task Manager</h1>
    <p className="mb-6 text-lg">Organize your projects and tasks efficiently.</p>
    <div>
      <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Login</Link>
      <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded">Register</Link>
    </div>
  </div>
);

export default Home;