# chatviz agent

Python LangGraph backend. Receives chat messages, routes them through an AI agent, and streams responses back to the frontend as SSE.

The agent is being built toward a two-node design:

- **chat node** — answers questions about the data using pandas tools (column info, nulls, describe, value_counts, groupby…)
- **viz node** — emits a Plotly chart spec the frontend can render

Current state: intent classification + streaming text replies. Pandas tools and chart spec output are not yet wired.

## Setup

```bash
uv sync
cp .env.example .env
# add your ANTHROPIC_API_KEY
```

## Run

```bash
uv run agent
# or with auto-reload:
uv run uvicorn agent.__main__:app --reload --port 8000
```

Server starts on http://localhost:8000.

## Run (Docker)

```bash
uv sync   # generate lockfile first
docker build -t chatviz-agent .
docker run --rm -p 8000:8000 --env-file .env chatviz-agent
```

## Agent design

```
START → intent_classifier → chat_responder → END
                          ↘ chart_responder → END
```

`InMemorySaver` keeps message history per `chatId` for the process lifetime.

## SSE contract

`POST /stream` — body: `{ chatId: string, message: string }`  
Yields `data: <token>\n\n` chunks, ends with `data: [DONE]\n\n`.

## Stack

Python 3.12, uv, FastAPI, uvicorn, LangGraph, langchain-anthropic.
