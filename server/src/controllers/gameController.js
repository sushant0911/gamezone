import Game from '../models/Game.js';

export const listGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch games' });
  }
};

export const createGame = async (req, res) => {
  try {
    const { title, imageUrl, gameUrl } = req.body;
    if (!title || !imageUrl || !gameUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const game = await Game.create({ title, imageUrl, gameUrl });
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create game' });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findByIdAndDelete(id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete game' });
  }
};


