# front/ — Next.js UI

Chat-driven data visualization frontend. Single-page app with sidebar, conversation view, and slide-over viz panel.

## Commands

```bash
npm install                    # first time only
npm run dev:agent              # → http://localhost:3000, backend = Python agent (:8000)
npm run dev:express            # → http://localhost:3000, backend = Express (:3001)
npm run dev                    # uses BACKEND_URL from .env
npm run build
npm run lint
```

## Architecture

```
app/page.tsx              ← single page; owns all chat state
app/api/sales/route.ts    ← GET, returns mock SalesRow[] (no auth)
app/api/stream/route.ts   ← POST proxy; forwards body to $BACKEND_URL/stream and pipes SSE back

components/               ← UI components (shadcn/Radix primitives)
hooks/                    ← custom React hooks
lib/types.ts              ← shared types: Message, Chat, SalesRow
```

## Frontend data flow

- `chats: Chat[]` + `activeChatId` live in `app/page.tsx` and flow down as props.
- `handleSend` appends the user message, creates a chat if needed, then calls `streamReply(chatId, message)`.
- `streamReply` fetches `/api/stream`, reads SSE chunks, appends them word-by-word to the active assistant message.
- `VizSheet` is a slide-over panel (shadcn Sheet) with Bar/Scatter charts from `/api/sales`; opened via `setOpenViz('bar' | 'scatter')`.

## Environment

`BACKEND_URL` in `.env` points the proxy at the active backend. The named npm scripts override it inline — no file editing needed to switch backends.

## Stack

Next.js 16, React 19, Tailwind v4, shadcn/ui (Radix), Plotly via `react-plotly.js`.

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
