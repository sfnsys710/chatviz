# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

<!-- BEGIN:nextjs-agent-rules -->
## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Project: chatviz

Chat-driven data visualization prototype. Send a message, get back charts and tables.

### Commands

**Frontend (root):**
```bash
npm run dev            # http://localhost:3000 — uses BACKEND_URL from .env
npm run dev:agent      # forces BACKEND_URL=http://localhost:8000 (Python agent)
npm run dev:express    # forces BACKEND_URL=http://localhost:3001 (Express)
npm run build
npm run lint
```

**Python agent (`agent/`):**
```bash
cd agent && uv sync           # install deps (first time)
cd agent && uv run agent      # http://localhost:8000
```

### Architecture

Two independent services — Next.js (root) and Python LangGraph agent (`agent/`):

```
Next.js (port 3000)
  app/page.tsx              ← single page; owns all chat state
  app/api/sales/route.ts    ← GET, returns mock SalesRow[] (no auth)
  app/api/stream/route.ts   ← POST proxy; forwards body to $BACKEND_URL/stream and pipes SSE back

Python agent (port 8000, agent/)
  src/agent/api.py          ← FastAPI app; CORS for localhost:3000; POST /stream SSE endpoint
  src/agent/agents.py       ← LangGraph StateGraph: intent_classifier → chart_responder | chat_responder
  src/agent/nodes.py        ← ChatState TypedDict + 3 async node functions
  src/agent/config.py       ← MODEL_NAME, TEMPERATURE loaded from .env
```

**Frontend data flow** (`app/page.tsx` is the state owner):
- `chats: Chat[]` + `activeChatId` live in the page component and flow down as props.
- `handleSend` appends the user message, creates a chat if needed, then calls `streamReply`.
- `streamReply` opens a fetch to `/api/stream`, reads SSE chunks, and appends them word-by-word to the active assistant message.
- `VizSheet` is a slide-over panel (shadcn Sheet) that renders Bar/Scatter charts from `/api/sales` data; it's opened via `setOpenViz('bar' | 'scatter')` passed through `Conversation` → `ConversationOut`.

**Shared types** (`lib/types.ts`): `Message`, `Chat`, `SalesRow` — used by both Next.js routes and components.

**Environment variable**: `BACKEND_URL` (set in `.env`) points the Next.js stream proxy at the Python agent (e.g. `http://localhost:8000`).

**Stack**: Next.js 16, React 19, Tailwind v4, shadcn/ui (Radix), Plotly via `react-plotly.js`, FastAPI, LangGraph, langchain-anthropic, uv.
