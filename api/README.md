# chatviz — api

Express + Redis backend playground. Learning code — not the active backend (see `agent/`).

## Stack

Express 5, ioredis, jsonwebtoken, zod, TypeScript

## Run locally

Requires Redis:

```bash
docker run -p 6379:6379 redis:7
```

Then:

```bash
npm install
npm run seed    # load mock data into Redis
npm run dev     # http://localhost:3001
```
