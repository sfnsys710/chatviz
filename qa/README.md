# qa/ — testing

Two kinds of test, two different questions. They are **complementary, not interchangeable** — each is run at the concurrency it's built for.

| Folder | Tool | Question | Layer | Concurrency |
|---|---|---|---|---|
| `correctness/` | Playwright | Does it **work** end-to-end for a real user? | full stack (browser → front → agent → viz) | **low** (5–20) |
| `load/` | k6 | How **much** can the backend take? | HTTP only (straight to the agent) | **high** (50–500+) |

**Rule of thumb:** Playwright for correctness at realistic concurrency (runs in CI on every change); k6 for capacity + autoscaling behaviour (run when tuning HPA/resources). Do **not** run Playwright at hundreds of users — you'd be load-testing your laptop (a browser per user), not the cluster.

---

## correctness/ — Playwright (end-to-end)

Drives a real browser through the whole app: runs the front JS, renders streamed tokens, exercises the viz. Catches integration/render bugs that raw HTTP can't see. Also the right tool for **stateful** checks (e.g. multi-turn context coherence when the agent is scaled to 2+ replicas — the sticky-session bug).

```bash
cd qa/correctness
npm install                 # first time
npx playwright install      # first time — browser binaries

# point at the running front (default http://localhost:3000)
npx playwright test                                   # headless
npx playwright test --headed                          # watch it
npx playwright test --workers=5                        # 5 concurrent sessions
```

- Target: the **front** (`http://localhost:3000`) — configured in `playwright.config.ts` (`baseURL`).
- Against a cluster: `kubectl port-forward svc/front 3000:3000` first.
- `session.spec.ts` — one user session: sends a few messages, waits for each stream to finish.

## load/ — k6 (throughput)

Hammers the agent's `/stream` endpoint directly (no browser) with a ramping user profile. Measures rps, latency percentiles, error rate; makes the HPA scale.

```bash
brew install k6             # first time (macOS)

# point at the running agent (default http://localhost:8000)
k6 run qa/load/stream-load.js
k6 run -e VUS=50 -e BASE_URL=http://localhost:8000 qa/load/stream-load.js
```

- Target: the **agent** (`http://localhost:8000`) — the backend under test.
- Against a cluster: `kubectl port-forward svc/chatviz-agent 8000:8000` first, then in another terminal watch `kubectl get hpa -w` while the ramp climbs.
- Thresholds in the script (`p95 < 15s`, `error rate < 1%`) make the run **pass/fail** — usable as a CI gate.

### Caveat: k6 measures TTLB, not TTFT

`http.post` waits for the **entire** SSE stream, so `http_req_duration` is time-to-**last**-byte. It does **not** capture time-to-**first**-token (TTFT) — the metric that matters most for a streaming LLM UX. TTFT lives in the Phoenix traces (custom span attributes), not here. Use k6 for throughput/saturation, Phoenix for per-token latency.
