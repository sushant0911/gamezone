import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import gameRoutes from './routes/games.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);

// Ensure a single shared Mongo connection across invocations (Vercel cold starts)
let isDbConnected = false;
export async function ensureDb() {
  if (isDbConnected) return;
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gamehub';
  await mongoose.connect(MONGODB_URI);
  isDbConnected = true;
}

export default app;


