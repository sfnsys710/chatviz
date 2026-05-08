# api/ — Express + Redis playground

Learning code, not the active backend. Express server with Redis-backed routes, JWT auth, and SSE stub.

## Commands

```bash
npm install
npm run dev      # tsx src/server.ts
npm run build    # tsc → dist/
npm run serve    # node dist/server.js
npm run seed     # seed Redis with mock data
```

## Stack

Express 5, ioredis, jsonwebtoken, zod, TypeScript, tsx.

Requires Redis (e.g. `docker run -p 6379:6379 redis:7`).
