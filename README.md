# chatviz

Chat visualization project. Next.js frontend at the root, Express backend in `api/`.

## Stack
- **Next.js** — frontend (app router, shadcn/ui)
- **Express** — HTTP API (`api/`)
- **Redis** — key-value store
- **JWT** — authentication
- **Zod** — request validation

## Run locally

```bash
docker compose up -d           # start Redis
npm run dev                    # start Next.js dev server (root)
cd api && npm run api          # start Express dev server
cd api && npm run seed         # seed Redis with test data
```

## API endpoints

```
POST /auth/login         body: { username, password } → { token }
GET  /query?key=foo      header: Authorization: Bearer <token> → { key, value }
```

## Build for production

Frontend (root):

```bash
npm run build
npm start
```

Backend (`api/`):

```bash
npm run build                  # compile TS → dist/
npm run serve                  # run compiled JS
```
