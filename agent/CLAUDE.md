# agent/ — Python LangGraph backend

FastAPI SSE endpoint backed by a 3-node LangGraph agent. Streams Claude responses to the Next.js frontend.

## Commands

```bash
uv sync                        # install deps (first time)
uv run agent                   # http://localhost:8000
uv run uvicorn agent.api:app --reload --port 8000   # with auto-reload
```

## Architecture

```
src/agent/
  api.py        ← FastAPI app; CORS for localhost:3000; POST /stream SSE endpoint
  agents.py     ← LangGraph StateGraph: intent_classifier → chart_responder | chat_responder
  nodes.py      ← ChatState TypedDict + 3 async node functions + inline prompts
  config.py     ← MODEL_NAME, TEMPERATURE from .env
  __main__.py   ← uvicorn entrypoint (uv run agent)
```

## Graph design

```
START → intent_classifier → chart_responder → END
                          ↘ chat_responder  → END
```

- **intent_classifier** — single LLM call; classifies as "chart" or "chat".
- **chart_responder** — streams a data-viz focused reply.
- **chat_responder** — streams a general assistant reply.

`InMemorySaver` checkpointer keeps message history per `chatId` for the process lifetime.

## SSE contract

`POST /stream` expects `{ chatId: string, message: string }`.  
Yields `data: <token>\n\n` chunks, ends with `data: [DONE]\n\n`.

## Environment

```
ANTHROPIC_API_KEY=...
MODEL_NAME=claude-haiku-4-5-20251001
TEMPERATURE=0.0
```

## Stack

Python 3.12, uv, FastAPI, uvicorn, LangGraph, langchain-anthropic.
