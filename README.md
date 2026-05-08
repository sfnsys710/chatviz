# chatviz

Chat-driven data visualization prototype. Type a message, get a streaming reply, and open interactive charts from the conversation.

The UI has three areas:
- **Sidebar** — chat history; create new conversations or switch between them
- **Conversation** — messages stream in word-by-word via SSE; assistant replies can surface viz buttons
- **Viz panel** — slide-over sheet with bar chart or scatter plot, filterable by product and region, backed by mock sales data (4 products × 3 regions × 6 months)

## Structure
- **`/`** — Next.js 16 app: chat UI, viz panel, mock sales API route
- **`/agent`** — Python LangGraph agent: FastAPI SSE endpoint, 3-node graph (intent classifier → chart/chat responder)
- **`/api`** — Express + Redis playground (learning code, not active)

## Frontend stack
- Next.js 16, React 19, Tailwind v4
- shadcn/ui (Radix primitives)
- Plotly via `react-plotly.js`

## Backend stack
- Python 3.12, uv
- FastAPI + uvicorn (SSE endpoint)
- LangGraph + langchain-anthropic (Claude)

## Run locally

Frontend (root):

```bash
npm install
npm run dev                    # http://localhost:3000
```

Python agent (`agent/`):

```bash
cd agent
uv sync                        # first time only
cp .env.example .env           # add ANTHROPIC_API_KEY
uv run agent                   # http://localhost:8000
```

## Routes

Frontend (Next.js):

```
GET  /api/sales?product=X&region=Y   # mock sales rows for the viz panel
POST /api/stream                     # SSE proxy → $BACKEND_URL/stream
```

Python agent (port 8000):

```
POST /stream   SSE — intent classifier routes to chart or chat responder
```

## Build for production

Frontend:

```bash
npm run build
npm start
```

Python agent:

```bash
cd agent
docker build -t chatviz-agent .
docker run --rm -p 8000:8000 --env-file .env chatviz-agent
```
