import { useEffect, useState } from 'react';
import api from '../lib/api.js';
import toast from 'react-hot-toast';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [gameUrl, setGameUrl] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get('/games');
      setGames(data);
    } catch {
      toast.error('Failed to load games');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/games', { title, imageUrl, gameUrl });
      toast.success('Game uploaded');
      setTitle('');
      setImageUrl('');
      setGameUrl('');
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/games/${id}`);
      toast.success('Deleted');
      setGames((gs) => gs.filter((g) => g._id !== id));
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Panel</h1>
      <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-4 rounded-lg grid sm:grid-cols-3 gap-3">
        <input className="p-2 rounded border dark:bg-gray-900" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input className="p-2 rounded border dark:bg-gray-900" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        <input className="p-2 rounded border dark:bg-gray-900" placeholder="Game URL" value={gameUrl} onChange={(e) => setGameUrl(e.target.value)} required />
        <div className="sm:col-span-3">
          <button disabled={loading} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">{loading ? 'Uploading...' : 'Upload Game'}</button>
        </div>
      </form>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <h2 className="font-semibold mb-3">Manage Games</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="p-2">Title</th>
                <th className="p-2">Image</th>
                <th className="p-2">URL</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {games.map((g) => (
                <tr key={g._id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-2">{g.title}</td>
                  <td className="p-2">
                    <img src={g.imageUrl} alt={g.title} className="h-10 w-16 object-cover rounded" />
                  </td>
                  <td className="p-2">
                    <a href={g.gameUrl} target="_blank" rel="noreferrer" className="text-indigo-600">Open</a>
                  </td>
                  <td className="p-2">
                    <button onClick={() => remove(g._id)} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


