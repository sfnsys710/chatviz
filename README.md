# tsback

TypeScript + Node.js backend learning project.

## Stack
- **Express** — HTTP server
- **Redis** — key-value store
- **JWT** — authentication
- **Zod** — request validation

## Run locally

```bash
docker compose up -d     # start Redis
npm run api              # start dev server
npm run seed             # seed Redis with test data
```

## Endpoints

```
POST /auth/login         body: { username, password } → { token }
GET  /query?key=foo      header: Authorization: Bearer <token> → { key, value }
```

## Build for production

```bash
npm run build            # compile TS → dist/
npm run serve            # run compiled JS
```
