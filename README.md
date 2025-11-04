# GameHub (MERN)

## Setup

### Server
1. Create `server/.env` with:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
2. Install deps and run:
```
cd server
npm i
npm run dev
```

### Client
1. Install deps and run:
```
cd client
npm i
npm run dev
```
Vite dev server runs at http://localhost:5173 and proxies `/api` to `http://localhost:5000`.

## Accounts
- Register via the Signup page. Set an admin user manually by updating the `role` field of a user document to `admin` in MongoDB.

## Features
- JWT auth (login/signup), bcrypt password hashing
- Admin can upload/delete games (title, imageUrl, gameUrl)
- Users see a responsive grid of games and open them in new tabs
- Tailwind styling with dark mode toggle
- Toast notifications

## Deploy (bonus)
- Use MongoDB Atlas
- Deploy server on Render/Vercel and set the client proxy or direct `baseURL` accordingly

"# gamezone" 
