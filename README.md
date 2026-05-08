# chatviz

Chat-driven data visualization prototype. Type a message, get a streaming reply, and open interactive charts from the conversation.

The UI has three areas:
- **Sidebar** — chat history; create new conversations or switch between them
- **Conversation** — messages stream in word-by-word via SSE; assistant replies can surface viz buttons
- **Viz panel** — slide-over sheet with bar chart or scatter plot, filterable by product and region, backed by mock sales data (4 products × 3 regions × 6 months)

The Express backend (`api/`) is a standalone learning playground (SSE streaming, Redis, JWT auth) and is not yet integrated into the chat beyond the stream proxy.

## Structure
- **`/`** — Next.js 16 app: chat UI, viz panel, mock sales API route
- **`/api`** — standalone Express + Redis playground (Phase 1 learning code; stream endpoint is proxied by Next.js)

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
npm run dev                    # http://localhost:3001
npm run seed                   # seed Redis with test data
```

## Routes

Frontend (Next.js):

```
GET /api/sales?product=X&region=Y   # mock sales rows for the viz panel
```

Express playground (standalone, port 3001):

```
POST /stream   SSE — streams fake reply word-by-word
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
