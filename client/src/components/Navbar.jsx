import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import DarkModeToggle from './DarkModeToggle.jsx';

export default function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/70 dark:bg-gray-800/70 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">GameHub</Link>
        <div className="flex items-center gap-3">
          {token ? (
            <>
              <NavLink to="/dashboard" className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</NavLink>
              {user?.role === 'admin' && (
                <NavLink to="/admin" className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Admin</NavLink>
              )}
              <button onClick={handleLogout} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Login</NavLink>
              <NavLink to="/signup" className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700">Sign Up</NavLink>
            </>
          )}
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}


