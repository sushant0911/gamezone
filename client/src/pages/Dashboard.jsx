import { useEffect, useState } from 'react';
import api from '../lib/api.js';
import GameCard from '../components/GameCard.jsx';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/games');
        setGames(data);
      } catch (err) {
        toast.error('Failed to load games');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Games</h1>
      {games.length === 0 ? (
        <p>No games yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {games.map((g) => (
            <GameCard key={g._id} game={g} />
          ))}
        </div>
      )}
    </div>
  );
}


