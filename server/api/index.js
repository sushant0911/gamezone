import app, { ensureDb } from '../src/app.js';

export default async function handler(req, res) {
  await ensureDb();
  return app(req, res);
}


