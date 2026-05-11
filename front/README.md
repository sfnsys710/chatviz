# chatviz — front

Next.js chat UI. Users send messages, get streaming replies, and open interactive charts in a slide-over panel.

The UI is being built toward a full chat-to-viz flow: upload a dataset, ask questions about it in natural language, and see Plotly charts appear inline with the agent's answers.

**Current state:** streaming chat works. Viz panel exists but shows mock sales data. Dynamic chart rendering from agent output is next.

## Areas

- **Sidebar** — chat history; create or switch conversations
- **Conversation** — messages stream word-by-word via SSE
- **Viz panel** — slide-over sheet with bar/scatter charts (currently mocked)

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
GET  /api/sales?product=X&region=Y   mock sales data for the viz panel
POST /api/stream                     SSE proxy → $BACKEND_URL/stream
```

## Build

```bash
npm run build
npm start
```
