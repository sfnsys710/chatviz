# chatviz — front

Next.js chat UI with streaming replies and interactive charts.

Three areas:
- **Sidebar** — chat history; create or switch conversations
- **Conversation** — messages stream word-by-word via SSE; assistant replies can surface viz buttons
- **Viz panel** — slide-over sheet with bar/scatter charts, filterable by product and region

## Stack

Next.js 16, React 19, Tailwind v4, shadcn/ui (Radix), Plotly via `react-plotly.js`

## Run locally

```bash
npm install
npm run dev:agent      # backend = Python agent (http://localhost:8000)
npm run dev:express    # backend = Express      (http://localhost:3001)
```

## Routes

```
GET  /api/sales?product=X&region=Y   mock sales rows for the viz panel
POST /api/stream                     SSE proxy → $BACKEND_URL/stream
```

## Build

```bash
npm run build
npm start
```
