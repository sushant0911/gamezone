import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      setToken(data.token);
      setUser(data.user);
      toast.success('Account created');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
      <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 rounded border dark:bg-gray-900" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="w-full p-2 rounded border dark:bg-gray-900" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full p-2 rounded border dark:bg-gray-900" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button disabled={loading} className="w-full py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
          {loading ? 'Loading...' : 'Create account'}
        </button>
      </form>
      <p className="mt-3 text-sm">Have an account? <Link to="/login" className="text-indigo-600">Login</Link></p>
    </div>
  );
}


