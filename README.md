# chatviz

Chat-driven data visualization prototype. Send a message, get back charts and tables.

## Structure
- **`/`** — Next.js 16 app: chat UI, viz panel, mock sales API route
- **`/api`** — standalone Express + Redis playground (Phase 1 learning code; not yet wired into the chat)

## Frontend stack
- Next.js 16, React 19, Tailwind v4
- shadcn/ui (Radix primitives)
- Plotly via `react-plotly.js`

## Run locally

Frontend (root):

```bash
npm install
npm run dev                    # http://localhost:3000
```

Express playground (`api/`):

```bash
docker compose up -d           # start Redis
cd api && npm install
npm run api                    # http://localhost:3001
npm run seed                   # seed Redis with test data
```

## Routes

Frontend (Next.js):

```
GET /api/sales?product=X&region=Y   # mock sales rows for the viz panel
```

Express playground (standalone, port 3001):

```
POST /auth/login        body: { username, password } → { token }
GET  /query?key=foo     header: Authorization: Bearer <token>
GET  /stream            header: Authorization: Bearer <token>   (SSE)
```

## Build for production

Frontend:

```bash
npm run build
npm start
```

Express playground:

```bash
cd api
npm run build                  # compile TS → dist/
npm run serve                  # run compiled JS
```
