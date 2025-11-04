import { Router } from 'express';
import { listGames, createGame, deleteGame } from '../controllers/gameController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, listGames);
router.post('/', requireAuth, requireAdmin, createGame);
router.delete('/:id', requireAuth, requireAdmin, deleteGame);

export default router;


