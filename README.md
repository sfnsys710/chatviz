# chatviz

Chat-driven data visualization prototype. Send a message, get a streaming reply, open interactive charts.

## Structure

```
chatviz/
  front/    Next.js 16 chat UI + viz panel          → front/README.md
  agent/    Python LangGraph backend (active)       → agent/README.md
  api/      Express + Redis playground (learning)   → api/README.md
```

## Quick start

Start the Python agent:

```bash
cd agent && uv sync && uv run agent    # http://localhost:8000
```

Start the frontend:

```bash
cd front && npm install && npm run dev:agent    # http://localhost:3000
```
