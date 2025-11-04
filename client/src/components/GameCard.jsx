export default function GameCard({ game }) {
  const openGame = () => {
    window.open(game.gameUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="cursor-pointer rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow"
      onClick={openGame}
    >
      <img src={game.imageUrl} alt={game.title} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="font-medium truncate">{game.title}</h3>
      </div>
    </div>
  );
}


