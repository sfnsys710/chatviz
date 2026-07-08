import http from 'k6/http'
import { check, sleep } from 'k6'

// Load test for the agent's /stream endpoint.
// Hits the BACKEND directly (no browser) to measure how much it can take.
//
//   BASE_URL  agent base url        (default http://localhost:8000 — port-forward the agent)
//   VUS       peak concurrent users (default 10)
//
// Run:  k6 run qa/load/stream-load.js
//       k6 run -e VUS=50 -e BASE_URL=http://localhost:8000 qa/load/stream-load.js

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8000'
const PEAK_VUS = Number(__ENV.VUS) || 10

// A short multi-turn session — reusing one chatId exercises the checkpointer,
// and the chart prompt exercises the chart_responder branch.
const MESSAGES = [
    'What is machine learning in one sentence?',
    'Give me an example of supervised learning.',
    'Plot a bar chart of fruit counts: apples 5, bananas 3, cherries 8.',
]

export const options = {
    scenarios: {
        ramping_users: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: PEAK_VUS }, // ramp up  — watch `kubectl get hpa -w`
                { duration: '1m', target: PEAK_VUS },  // hold     — steady state
                { duration: '20s', target: 0 },        // ramp down
            ],
            gracefulRampDown: '30s',
        },
    },
    thresholds: {
        http_req_failed: ['rate<0.01'],       // <1% of requests may error
        http_req_duration: ['p(95)<15000'],   // p95 under 15s (LLM calls are slow — tune per model)
    },
}

// One VU iteration = one user session (several turns, same chatId).
export default function () {
    const chatId = `k6-${__VU}-${__ITER}`

    for (const message of MESSAGES) {
        const res = http.post(
            `${BASE_URL}/stream`,
            JSON.stringify({ chatId, message }),
            { headers: { 'Content-Type': 'application/json' }, timeout: '120s' },
        )

        check(res, {
            'status is 200': (r) => r.status === 200,
            'stream completed': (r) => r.body && r.body.includes('[DONE]'),
        })

        sleep(1) // think time between turns
    }
}
