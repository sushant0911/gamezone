import dotenv from 'dotenv';
import app, { ensureDb } from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

ensureDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });


