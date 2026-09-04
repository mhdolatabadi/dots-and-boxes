# Noghte Bazi
This an implementation of Noghte Bazi(which means dots and boxes in persian).

## Self-hosted deployment

The project has three pieces:

- `backend` — a Node/Express + Socket.IO server that hosts game rooms.
- `frontend/game` — the React app players actually play the game in.
- `frontend/cover` — a static landing/cover page.

Each match happens in a room identified by a `room` query parameter on the
game app's URL (e.g. `https://game.example.com/?room=abc123`). Opening the
game with no `room` in the URL generates one and puts it in the address bar
so the host can copy the link and send it to an opponent. Player identity
(id + display name) is generated once per browser and stored in
`localStorage` — no account system is required.

### Docker Compose (recommended)

1. Copy `.env.example` to `.env` and fill in your own values:
   - `CORS_ORIGIN` — the public URL(s) the frontends are served from
     (comma-separated if you serve `game` and `cover` on different origins).
   - `REACT_APP_BACKEND_URL` — the public URL players' browsers will use to
     reach the backend's Socket.IO server. This is baked into the `game`
     frontend at build time, so changing it requires rebuilding that image.
   - `BACKEND_PORT`, `GAME_PORT`, `COVER_PORT` — host ports to publish.
2. Build and start everything:

   ```sh
   docker compose up -d --build
   ```

3. Put a reverse proxy (nginx, Caddy, Traefik, etc.) with TLS in front of
   the published ports if you're exposing this on the public internet, and
   point `CORS_ORIGIN`/`REACT_APP_BACKEND_URL` at the proxy's public
   hostnames rather than the raw container ports.

### Manual deployment

- **Backend**: `cd backend && yarn install && NODE_ENV=production PORT=13797 CORS_ORIGIN=https://your-game-domain yarn start` (or `node index.js`).
- **Game frontend**: `cd frontend/game && yarn install && REACT_APP_BACKEND_URL=https://your-backend-domain yarn build`, then serve the `build/` folder with any static file server.
- **Cover page**: `cd frontend/cover && yarn install && yarn build`, then serve `build/` the same way.

### Configuration reference (backend)

| Env var       | Default                 | Purpose                                              |
|---------------|--------------------------|-------------------------------------------------------|
| `PORT`        | `13797`                 | Port the server listens on                            |
| `HOST`        | `0.0.0.0`               | Interface the server binds to                         |
| `CORS_ORIGIN` | `*` (prod) / `http://localhost:3000` (dev) | Allowed origin(s) for Socket.IO connections, comma-separated |
