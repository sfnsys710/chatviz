# chatviz agent

Python LangGraph backend for chatviz. Exposes `POST /stream` as SSE, proxied by the Next.js frontend.

## Setup

```bash
# install deps + generate lockfile
uv sync

# copy and fill env
cp .env.example .env
# edit .env and add your ANTHROPIC_API_KEY
```

## Run (local dev)

```bash
uv run agent
# or with auto-reload:
uv run uvicorn agent.__main__:app --reload --port 8000
```

Server starts on http://localhost:8000. Make sure the root `.env` has `BACKEND_URL=http://localhost:8000`.

## Run (Docker)

```bash
# build lockfile first if needed
uv sync

docker build -t chatviz-agent .
docker run --rm -p 8000:8000 --env-file .env chatviz-agent
```

## Agent design

```
START → intent_classifier → (chart | chat) → chart_responder | chat_responder → END
```

- **intent_classifier** — classifies user message as "chart" or "chat" via a single LLM call.
- **chart_responder** — streams a data-viz focused reply.
- **chat_responder** — streams a general assistant reply.

State is persisted per `chatId` in memory (via `InMemorySaver`) for the lifetime of the process.
